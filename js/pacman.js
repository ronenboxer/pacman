'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 9
        },
        direction: 'down',
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev)
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    nextLocation = calculateLocation(nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === FOOD || nextCell === SUPER_FOOD) {
        gFoodCount--
        updateScore(1)
    }
    else if (nextCell === CHERRY) updateScore(10)
    if (nextCell === SUPER_FOOD && !gPacman.isSuper) superMode()
    else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            renderCell(gPacman.location, EMPTY)
            playerLost()
            return
        } else eatGhost(nextLocation)
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, pacmanIcon)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            gPacman.direction = 'up'
            nextLocation.i--
            break
        case 'ArrowDown':
            gPacman.direction = 'down'
            nextLocation.i++
            break
        case 'ArrowLeft':
            gPacman.direction = 'left'
            nextLocation.j--
            break
        case 'ArrowRight':
            gPacman.direction = 'right'
            nextLocation.j++
            break
        default:
            return null
    }
    directPacman()
    return nextLocation
}

function directPacman() {
    var iconStr = `<iconify-icon icon="icomoon-free:pacman" width="20" height="20" style="color:`
     iconStr +=  (gPacman.isSuper) ? ` white"` : ` rgb(250, 229, 40)"`

    switch (gPacman.direction) {
        case 'left':
            iconStr += ` flip="horizontal"`
            break
        case 'up':
            iconStr += ` rotate="90deg" flip="horizontal"`
            break
        case 'down':
            iconStr += ` rotate="90deg"`
            break
    }
    iconStr += `></iconify-icon>`
    pacmanIcon = iconStr
}