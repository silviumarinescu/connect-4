const StyledList = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-content: center;

  .board {
    background: gray;
    max-width: 700px;
    width: 100vw;
    max-height: 600px;
    height: 100vh;
    display: grid;
    grid-auto-flow: column;
    border-radius: 50px;
    overflow: hidden;

    .column {
      display: grid;
      grid-auto-flow: row;
      align-items: center;
      justify-items: center;
      cursor: pointer;
      &:hover {
        background: darkgray;
      }

      .cell {
        position: relative;
        width: 100%;
        height: 100%;
        &:after {
          position: absolute;
          top: 20%;
          right: 20%;
          content: "";
          width: 60%;
          height: 60%;
          border-radius: 50%;
        }
        &.empty {
          &:after {
            background: lightGray;
          }
        }
        &.p1 {
          &:after {
            background: red;
          }
        }
        &.p2 {
          &:after {
            background: blue;
          }
        }
      }
    }
  }
`;

export default ({ data, handleClick }) => {
  return (
    <StyledList>
      <div className="board">
        {data[0]
          .map((x, i) => data.map((x) => x[i]))
          .map((r, i) => (
            <div key={i} className="column" onClick={handleClick(i)}>
              {r.map((c, j) => (
                <div
                  key={`${i}-${j}`}
                  className={
                    "cell " + `${c == 0 ? "empty" : c == 1 ? "p1" : "p2"}`
                  }
                ></div>
              ))}
            </div>
          ))}
      </div>
    </StyledList>
  );
};
