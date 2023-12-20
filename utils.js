export const PLAYFIELD_COLUMNS = 10;
export const PLAYFIELD_ROWS = 20;
export const TETROMINDER_NAMES = ['I', 'J', 'L', 'O', 'S', 'Z', 'T'];
export const TETROMINOES = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
      ],
    'O': [
        [1, 1],
        [1, 1],
      ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
      ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]
    };

export function getRandomeElement(array) {
    const randomIDEX = Math.floor(Math.random() * array.length);
    return array[randomIDEX];
}

export function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

export function rotateMatrix(matrix) {
  const N = matrix.length;
  const rotateMatrix = [];
  for (let i = 0; i < N; i++) {
    rotateMatrix[i] = []
      for (let ii = 0; ii<N; ii++) {
        rotateMatrix[i][ii] = matrix[N - ii - 1][i];
      }
  }
  return rotateMatrix;
}


export const SAD = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
];