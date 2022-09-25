'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            if (mat[i][j] === PACMAN) gFoodCount--
            const cell = getImgName(mat[i][j]);

            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getRandomEmptyCellLocation(board) {
    const emptyCells = []
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            const currCell = board[i][j]
            if (currCell === EMPTY) emptyCells.push({ i: i, j: j })
        }
    }
    if (!emptyCells,length) return null
    var randomIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[randomIdx]
}

function getImgName(cell) {
    switch (cell) {
        // case FLOOR: return cell = FLOOR_ICON
        case WALL: return cell = WALL_ICON
        case FOOD: return FOOD_ICON
        case PACMAN: return pacmanIcon
        case GHOST: return GHOST_ICON
        case SUPER_FOOD: return SUPER_FOOD_ICON
        case CHERRY: return CHERRY_ICON
        default: return cell
    }
}

function calculateLocation(location) {
    const newLocation = {}
    newLocation.i = (location.i + SIZE) % SIZE
    newLocation.j = (location.j + SIZE) % SIZE
    return newLocation
}

function playerLost() {
    EL_MODAL.innerHTML = `<h2 class="modal">Game over!<button onclick="init()">Replay</button></h2>`
    gameOver()
}

function playerWon() {
    EL_MODAL.innerHTML = `<h2 class="modal">You Won!<button onclick="init()">Replay</button></h2>`
    gameOver()
}