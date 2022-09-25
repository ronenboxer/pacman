'use strict'

const SIZE = 20
const WALL = '#'
const FOOD = '.'
const SUPER_FOOD = '@'
const CHERRY = '%'
const EMPTY = ' '
const EL_MODAL = document.querySelector('.modal')

const CHERRY_ICON = `<iconify-icon icon="lucide:cherry" style="color: rgb(188, 53, 53)" width="20" height="20"></iconify-icon>`
const GHOST_ICON = `<iconify-icon icon="bxs:ghost" width="20" height="20"></iconify-icon>`
const FOOD_ICON = `<iconify-icon icon="ci:dot-01-xs" style="color: white" width="20" height="20"></iconify-icon>`
const WALL_ICON = `<iconify-icon icon="fluent-emoji-high-contrast:brick" style="color: white" width="20" height="20"></iconify-icon>`
const SUPER_FOOD_ICON = `<iconify-icon icon="ant-design:apple-filled" style="color: green" width="20" height="20"></iconify-icon>`

var pacmanIcon = `<iconify-icon icon="icomoon-free:pacman" style="color: rgb(250, 229, 40)" width="20" height="20"></iconify-icon>`

var gGame = {
    score: 0,
    isOn: false
}
var gBoard
var gFoodCount
var gcherryInterval

function init() {
    gFoodCount = 0
    console.log('hello')
    EL_MODAL.innerHTML = `<h2 class="modal">Score: <span>0</span></h2>`
    gBoard = buildBoard()
    createPacman(gBoard)
    gPacman.isSuper = false
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gcherryInterval = setInterval(spawnCherry, 10000)
}

function buildBoard() {
    var board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            if (i === 0 || i === SIZE - 1 ||
                ((j === 0 || j === SIZE - 1) && (i < 9 || i > 10))) board[i][j] = WALL
            else if ((j === 3 || j == 16) &&
                ((i >= 2 && i <= 5) ||
                    (i >= 14 && i <= 17) ||
                    (i >= 8 && i <= 11))) board[i][j] = WALL
            else if ((i === 17 || i === 2) &&
                ((j >= 4 && j <= 8) ||
                    (j >= 11 && j <= 15))) board[i][j] = WALL
            else if ((j === 5 || j === 14) &&
                ((i >= 4 && i <= 8) ||
                    (i >= 11 && i <= 15))) board[i][j] = WALL
            else if ((i === 4 || i === 15 || i === 10) && (j >= 8 && j <= 11)) board[i][j] = WALL
            else if (((i >= 4 && i <= 8) || (i >= 12 && i <= 15)) &&
                (j === 8 || j === 11)) board[i][j] = WALL
            else {
                board[i][j] = FOOD
                gFoodCount++
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][18] = SUPER_FOOD
    board[18][1] = SUPER_FOOD
    board[18][18] = SUPER_FOOD
    return board
}

function updateScore(diff) {
    // console.log(gFoodCount)
    gGame.score += diff
    if (!gFoodCount) {
        playerWon()
    } else EL_MODAL.querySelector('span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    EL_MODAL.querySelector('button').classList.remove('hide')
    clearInterval(gIntervalGhosts)
    clearInterval(gcherryInterval)
}

function superMode() {
    gPacman.isSuper = true
    setTimeout(superModeOff, 7000)
}

function superModeOff() {
    gPacman.isSuper = false

    for (var i = gDeadGhosts.length; i > 0; i--) {
        const currGhost = gDeadGhosts.splice(0, 1)[0]
        const emptyLocation = getRandomEmptyCellLocation(gBoard)
        currGhost.location = emptyLocation
        gGhosts.push(currGhost)
    }
}

function spawnCherry() {
    const emptyLocation = getRandomEmptyCellLocation(gBoard)
    if (!emptyLocation) return
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation, CHERRY_ICON)
}