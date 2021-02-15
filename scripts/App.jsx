import Board from "./Board.jsx";

const GlobalStyle = styled.createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap");
  body {
    font-family: "Work Sans", sans-serif;
    margin: 0;
  }
`;
const StyledApp = styled.div`
  .winner {
    text-align: center;
    margin-top: 20px;
  }
`;

export default () => {
  const [data, setData] = React.useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = React.useState(1);
  const [winner, setWinner] = React.useState(0);

  const getFreeIndex = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) if (arr[i] == 0) return i;
    return -1;
  };
  const invert = (arr) => arr[0].map((x, i) => arr.map((x) => x[i]));
  const getPos = (arr, x, y) =>
    x < arr.length && y < arr[0].length && x >= 0 && y >= 0 ? arr[x][y] : 0;
  const checkSquare = (board, x, y) =>
    [-2, -1, 1, 2]
      .reduce(
        (a, v) => {
          a[0] += getPos(board, x, y + v);
          a[1] += getPos(board, x + v, y);
          a[2] += getPos(board, x + v, y - v);
          a[3] += getPos(board, x + v, y + v);
          return a;
        },
        [0, 0, 0, 0]
      )
      .filter((a) => a > 2).length;

  const checkWinner = (board) => {
    for (let i = 0; i < board.length; i++)
      for (let j = 0; j < board[i].length; j++)
        if (
          board[i][j] &&
          checkSquare(
            board.map((r) => r.map((c) => (c == board[i][j] ? 1 : 0))),
            i,
            j
          )
        )
          return setWinner(board[i][j]);
  };
  const handleClick = (col) => () => {
    let inv = invert(data);
    const freeIndex = getFreeIndex(inv[col]);
    if (freeIndex != -1) {
      inv[col][freeIndex] = currentPlayer;
      checkWinner(inv);
      setCurrentPlayer(currentPlayer - 1 ? 1 : 2);
    }
    inv = invert(inv);
    setData(inv);
  };
  return (
    <StyledApp>
      <GlobalStyle />
      {winner ? (
        <div className="winner">Player {winner} is the winner !!!</div>
      ) : (
        <div></div>
      )}
      <Board data={data} handleClick={handleClick} />
    </StyledApp>
  );
};
