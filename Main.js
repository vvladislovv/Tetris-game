import { Tetris } from "./Tetris.js"
import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, SAD, convertPositionToIndex } from "./utils.js";
const tetris = new Tetris();
const cells = document.querySelectorAll('.grid>div');

let hammer;
let requserId;
let timeoutID;

initkeydown();
initTouch();
moveDown();

function initkeydown() {
    document.addEventListener('keydown', onKeydown);
}

function onKeydown(event) {
    switch (event.key) {
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowRight':
            moveLeft();
            break;
        case 'ArrowLeft':
            moveRight();
            break;
        case ' ':
            DropDwon();
            break;
        default:
            break;
    }
}


function moveDown() {
    tetris.moveTetrominoDown();
    drew();
    StopLoop();
    StartLoop();
    if (tetris.isGameOver) {
        GameOver();
    }
}

function initTouch() {
    document.addEventListener('dblclick', (event) => {
        event.preventDefault();
    });
    // надо установить библеотеки hammer
    hammer = new Hammer(document.querySelector('body'));
    hammer.get('pan').set({direction : Hammer.DIRECTION_ALL})
    hammer.get('swipe').set({direction : Hammer.DIRECTION_ALL})

    const threshold = 30;
    let deltaX = 0;
    let deltaY = 0;

    hammer.on('panstart', () => {
        deltaX = 0;
        deltaY = 0;
    });

    hammer.on('panleft', (event) => {
        if (Math.abs(event.deltaX - deltaX) > threshold) {
            moveLeft();
            deltaX = event.deltaX
            deltaY = event.deltaY
        }
    });
    hammer.on('panright', (event) => {
        if (Math.abs(event.deltaX - deltaX) > threshold) {
            moveRight();
            deltaX = event.deltaX
            deltaY = event.deltaY
        }
    });

    hammer.on('pandown', (event) => {
        if (Math.abs(event.deltaY - deltaY) > threshold) {
            moveDown();
            deltaX = event.deltaX
            deltaY = event.deltaY
        }
    });

    hammer.on('swipedown', (event) => {
        DropDwon();
    });

    
    hammer.on('tap', () => {
        rotate();
    });
}

function StartLoop() {
    timeoutID = setTimeout(() => requserId = requestAnimationFrame(moveDown), 700);
}

function StopLoop() {
    cancelAnimationFrame(requserId);
    clearTimeout(timeoutID)
}

function DropDwon() {
    tetris.dropTerminoDown();
    drew();
    StopLoop();
    StartLoop();

    if (tetris.isGameOver) {
        GameOver();
    }
}

function moveRight() {
    tetris.moveTetrominoRight();
    drew()
}

function moveLeft() {
    tetris.moveTetrominoLeft();
    drew()
}

function rotate() {
    tetris.rotateTermino();
    drew()
}


function drew() {
    cells.forEach(cell => cell.removeAttribute('class'));
    drawTermino();
    drawPlayField();
    drawGhostTetromino();
}

function drawGhostTetromino() {
    const termMatrixSize = tetris.tetromino.matrix.length;
        for (let row = 0; row < termMatrixSize; row++) {
            for(let column = 0; column < termMatrixSize; column++) {
                if (!tetris.tetromino.matrix[row][column]) continue;
                if (tetris.tetromino.ghostRow + row < 0) continue;
                const cellIndex = convertPositionToIndex(tetris.tetromino.ghostRow + row, tetris.tetromino.ghostColumn + column);
                cells[cellIndex].classList.add('ghost');
            }
        }
}

function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            if (!tetris.playfield[row][column]) continue;
            const name = tetris.playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTermino() {
    const name = tetris.tetromino.name;
    const  tetrominoMatrixSize = tetris.tetromino.matrix.length;
    for (let row = 0; row < tetrominoMatrixSize; row++) {
         for (let column = 0; column < tetrominoMatrixSize; column++) { 
            if (!tetris.tetromino.matrix[row][column]) continue;
                if (tetris.tetromino.row + row < 0) continue;
                const cellIndex = convertPositionToIndex(tetris.tetromino.row + row, tetris.tetromino.column + column);
                cells[cellIndex].classList.add(name);
         }
    }
}


function GameOver() {
    StopLoop();
    document.removeEventListener('keydown', onKeydown);
    hammer.off('panstart panleft panright pandown swipedown tap')
    gameOverAnimation();
}

function gameOverAnimation() {
    const filledCells = [...cells].filter(cell => cell.classList.length > 0);
    filledCells.forEach((cell, i) => {
        setTimeout(() => cell.classList.add('hide', i * 10));
        setTimeout(() => cell.removeAttribute('class'), i * 10 + 500);
    });
        setTimeout(drawSad, filledCells.length * 10 + 1000);
}

function drawSad() {
    const TOP_OFFSET = 5;
    for (let row = 0; row < SAD.length; row++) {
        for (let column = 0; column < SAD[0].length; column++) {
           if (!SAD[row][column]) continue;
           const cellIndex = convertPositionToIndex(TOP_OFFSET + row, column);
           cells[cellIndex].classList.add('sad');
        }
        
    }
}