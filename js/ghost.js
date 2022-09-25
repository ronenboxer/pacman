'use strict'

const GHOST = '&#9781'

var gGhosts = []
var gIntervalGhosts
var gDeadGhosts = []

function createGhost(board, i = 14, j = 9) {
    const ghost = {
        location: {
            i: i,
            j: j
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        direction: 'up',
        standingOn: FOOD
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 4; i++) {
        createGhost(board, 14 - i, 9)

    }
    gIntervalGhosts = setInterval(moveGhosts, 600)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff(ghost)
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    nextLocation = calculateLocation(nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL || nextCell === GHOST) {
        moveDiff = getRandomDiff(ghost)
        return
    }
    
    if (nextCell === PACMAN) {
        if (!gPacman.isSuper) {
            const cellContent = getImgName(ghost.currCellContent)
            renderCell(ghost.location, cellContent)
            renderCell(nextLocation, getGhostHTML(ghost))
            playerLost()
            return
        } else {
            eatGhost(ghost.location)
        }
    }
    ghost.currCellContent = nextCell
    // DOM
    const cellContent = getImgName(ghost.currCellContent)
    renderCell(ghost.location, cellContent)

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent


    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    // if (ghost === gGhosts[0]) console.log(ghost.standingOn)
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff(ghost) {

    switch (ghost.direction) {
        case 'right': return { i: 0, j: 1 }
        case 'down': return { i: 1, j: 0 }
        case 'left': return { i: 0, j: -1 }
        case 'up': return { i: -1, j: 0 }
    }
}

function getRandomDiff(ghost) {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: {
            ghost.direction = 'right'
            return { i: 0, j: 1 }
        }
        case 2: {
            ghost.direction = 'down'
            return { i: 1, j: 0 }
        }
        case 3: {
            ghost.direction = 'left'
            return { i: 0, j: -1 }
        }
        case 4: {
            ghost.direction = 'up'
            return { i: -1, j: 0 }
        }
    }
}

function getGhostHTML(ghost) {
    const color = (gPacman.isSuper) ? 'rgb(55, 92, 203)' : ghost.color
    return `<span style="color: ${color}">${GHOST_ICON}</span>`
}

function getGhostIndexByLocation(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) return i
    }
    return null
}


function eatGhost(ghostLocation) {
    const ghostIdx = getGhostIndexByLocation(ghostLocation)
    const currGhost = gGhosts.splice(ghostIdx, 1)[0]
    if (currGhost.currCellContent === FOOD || currGhost.currCellContent === SUPER_FOOD) {
        gFoodCount--
        updateScore(1)
    } else if (currGhost.currCellContent === CHERRY) updateScore(10)
    
    gDeadGhosts.push(currGhost)
}