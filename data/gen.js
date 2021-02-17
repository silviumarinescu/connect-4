const fs = require("fs");
const helper = require("../utils/helper");

let doIt = (currntPath) => {
  const player = currntPath.split("/").length % 2 ? 1 : 2;
  const board = JSON.parse(fs.readFileSync(`${currntPath}/0.json`));
  let done = 0;
  if (helper.getState(board) == 4) {
    for (i = 0; i < 7; i++) {
      let dir = `${currntPath}/${i}`;
      if (!fs.existsSync(`${dir}/0.json`)) {        
        if (helper.isLegalMoove(board, i))
        {
          done++;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);
          fs.writeFileSync(
            `${dir}/0.json`,
            JSON.stringify(helper.makeMoove(board, i, player))
          );
        }
      }
    }
  }
  return done;
};

let total = 0;
if (!fs.existsSync("./data/data")) fs.mkdirSync("./data/data");
if (!fs.existsSync("./data/data/0.json")) {
  total++;
  fs.writeFileSync(
    "./data/data/0.json",
    JSON.stringify([
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ])
  );
}

total += doIt(`./data/data`);

const getComb = (start, count) => {
  const result = [];
  // let arr = [0];
  let index = 0;

  let arr = start.split("/").map((c) => parseInt(c));
  let lastIndex = arr.length - 1;
  let found = false;
  for (let i = lastIndex; i >= 0; i--) {
    if (arr[i] != 6) {
      index = i;
      found = true;
      break;
    }
  }
  if (!found) {
    arr = arr.map(() => 0);
    arr.push(0);
    lastIndex++;
  }
  result.push(arr.join("/"));
  for (let i = 0; i < count-1; i++) {
    if (arr[index] == 6) {
      if (index != 0) {
        i--;
        arr[index] = 0;
        index--;
      } else {
        arr = arr.map(() => 0);
        arr.push(0);
        lastIndex++;
        index = lastIndex;
        result.push(arr.join("/"));
      }
    } else {
      arr[index]++;
      result.push(arr.join("/"));
      if (index < lastIndex && arr[index + 1] != 6) index++;
    }
  }
  return result;
};

const comb = getComb("1/2/2/2/1/1", 10000);

for (let i = 0; i < comb.length; i++) {
  total += doIt(`./data/data/${comb[i]}`);
  console.clear()
  console.log(comb[i]);
}
console.log("done", total);
