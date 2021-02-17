const fs = require("fs");
const { allowedNodeEnvironmentFlags } = require("process");
const helper = require("../utils/helper");

let doIt = (currntPath) => {
  const player = currntPath.split("/").length % 2 ? 1 : 2;
  const board = JSON.parse(fs.readFileSync(`${currntPath}/0.json`));
  let done = 0;
  if (helper.getState(board) == 4) {
    for (i = 0; i < 7; i++) {
      let dir = `${currntPath}/${i}`;
      if (!fs.existsSync(`${dir}/0.json`)) {
        done++;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        if (helper.isLegalMoove(board, i))
          fs.writeFileSync(
            `${dir}/0.json`,
            JSON.stringify(helper.makeMoove(board, i, player))
          );
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
for (let i = 0; i < 7; i++) {
  total += doIt(`./data/data/${i}`);
  for (let j = 0; j < 7; j++) {
    total += doIt(`./data/data/${i}/${j}`);
  }
}
// works !!!
let toDo = 100000000;
let arr = [0];
let index = 0;
let lastIndex = 0;
for (let i = 0; i < toDo; i++) {
  arr[index]++;
  console.log(arr.join("/"));
  if (arr[index] == 6) {
    if (index != 0) {
      arr[index] = 0;
      index--;
    } else {
      arr = arr.map(() => 0);
      arr.push(0);
      lastIndex++;
      index = lastIndex;
    }
  } else {
    index = lastIndex;
  }
}

console.log("done", total);
