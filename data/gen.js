const fs = require("fs");
const path = require("path");
const helper = require("../utils/helper");
const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const status = helper.getState(board);

let player = 1;

for (i = 0; i < 7; i++) {
  let dir = `./data/data/${i}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (helper.getState(board) == 4) {
    fs.writeFileSync(
      `${dir}/0.json`,
      JSON.stringify(helper.makeMoove(board, i, player))
    );
  }
}

player = 2;


console.log('done')