import { 
PLAYFIELD_COLUMNS,
PLAYFIELD_ROWS,
TETROMINDER_NAMES,
TETROMINOES,
getRandomeElement,
rotateMatrix
} from "./utils.js";


export class Tetris {
    constructor() {
        this.playfield;
        this.tetromino;
        this.isGameOver = false
        this.init();
    }
    init() {
        this.geneartePlayfield();
        this.genetayionTetromino();
    }

    geneartePlayfield() {
        this.playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
       // console.table(this.playfield);
    }

    genetayionTetromino() {
        const name = getRandomeElement(TETROMINDER_NAMES);
        const matrix = TETROMINOES[name];
        console.log(matrix)

        const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
        // const row = -2
        const row = -2;

        this.tetromino = {
            name,
            matrix,
            row,
            column,
            ghostColumn: column,
            ghostRow: row,
        };

        this.calculateGhostPosition();
    }


    moveTetrominoDown() {
        this.tetromino.row += 1;
        if (!this.isValid()) {
            this.tetromino.row -= 1;
            this.placeTerminor();
        }
    }
    moveTetrominoRight() {
        this.tetromino.column += 1;
        if (!this.isValid()) {
            this.tetromino.column -= 1;
        }else{
            this.calculateGhostPosition();
        }
    }

    dropTerminoDown() {
        this.tetromino.row =  this.tetromino.ghostRow;
        this.placeTerminor();
    }
    
    moveTetrominoLeft() {
        this.tetromino.column -= 1;
        if (!this.isValid()) {
            this.tetromino.column += 1;
        }else{
            this.calculateGhostPosition();
        }
    }

    rotateTermino() {
        const oldMartix = this.tetromino.matrix;
        const rotetedmatrix = rotateMatrix(this.tetromino.matrix);
        this.tetromino.matrix = rotetedmatrix
        if (!this.isValid()) {
            this.tetromino.matrix = oldMartix;
        }else{
            this.calculateGhostPosition();
        }
    }

    isValid() {
        const matrixSize = this.tetromino.matrix.length;
        for (let row = 0; row < matrixSize; row++) {
            for (let column = 0; column < matrixSize; column++) {
                if(!this.tetromino.matrix[row][column]) continue;
                if(this.isOudideofGameBoard(row, column)) return false;
                if (this.isCollide(row, column)) return false;
            }
        }
        return true;
    }

    isCollide(row, column) {
        return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + column];
    }

    isOudideofGameBoard(row, column) {
        return this.tetromino.column + column < 0 || this.tetromino.column + column >= PLAYFIELD_COLUMNS || this.tetromino.row + row >= this.playfield.length;
    }
    

    placeTerminor() {
        const matrixSize = this.tetromino.matrix.length;
        for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (!this.tetromino.matrix[row][column]) continue;
            if (this.isOutsideOfToBoard(row)) {
                this.isGameOver = true;
                return;
            }
        this.playfield[this.tetromino.row + row][this.tetromino.column + column] = this.tetromino.name;
      }
    }
        this.processFillRows();
        this.genetayionTetromino();
    }

    isOutsideOfToBoard(row) {
        return this.tetromino.row + row < 0 
    }

    processFillRows() {
        const fillLiners = this.findFillerRows();
        this.removeFilledRoad(fillLiners)
    }

    findFillerRows() {
        const filledrows = [];
        for (let row = 0; row < PLAYFIELD_ROWS; row++){
            if(this.playfield[row].every(cell => Boolean(cell))) {
                filledrows.push(row)
            }
        }
        return filledrows
    }

    removeFilledRoad(filledrows) {
        filledrows.forEach(row => {
            this.DropRows(row);
        });
    }

    DropRows(rowToDelete) {
        for (let row = rowToDelete; row > 0; row--) {
            this.playfield[row] = this.playfield[row - 1];
        }
        this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
    }
    
    calculateGhostPosition(){
        const tetrominoRow = this.tetromino.row;
        this.tetromino.row++;
        while (this.isValid()){
            this.tetromino.row++;
        }
        this.tetromino.ghostRow = this.tetromino.row - 1;
        this.tetromino.ghostColumn = this.tetromino.column;
        this.tetromino.row = tetrominoRow;
    }
}
