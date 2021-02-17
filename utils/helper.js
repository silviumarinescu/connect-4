const getPos = (arr, x, y) =>
  x < arr.length && y < arr[0].length && x >= 0 && y >= 0 ? arr[x][y] : 0;
const checkSquare = (board, x, y) => {
  const p = getPos(board, x, y);
  return (
    [-2, -1, 1, 2]
      .reduce(
        (a, v) => {
          a[0] += getPos(board, x, y + v) == p ? 1 : 0;
          a[1] += getPos(board, x + v, y) == p ? 1 : 0;
          a[2] += getPos(board, x + v, y - v) == p ? 1 : 0;
          a[3] += getPos(board, x + v, y + v) == p ? 1 : 0;
          return a;
        },
        [0, 0, 0, 0]
      )
      .filter((a) => a > 2).length > 0
  );
};

const getStatus = (board) => {
  let isDraw = true;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] == 0) isDraw = false;
      if (board[i][j] && checkSquare(board, i, j)) {
        return board[i][j];
      }
    }
  }
  return isDraw ? 3 : 4;
};
const invert = (arr) => arr[0].map((x, i) => arr.map((x) => x[i]));
const getFreeIndex = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) if (arr[i] == 0) return i;
  return -1;
};

module.exports = {
  states: {
    1: "p1 won",
    2: "p2 won",
    3: "draw",
    4: "notOver",
  },
  makeMoove: (board, index, player) => {
    const free = getFreeIndex(invert(board)[index]);
    return board.map((r, i) =>
      r.map((c, j) => (j == index && i == free ? player : board[i][j]))
    );
  },
  isLegalMoove: (board, index) => {
    return getFreeIndex(invert(board)[index]) != -1;
  },
  getState: (board) => {
    return getStatus(board);
  },
};
