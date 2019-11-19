let label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
const label_length = label.length;
let spTD;
//--------------
//テーブルの作成
//--------------
const createNewTable = () => {
  const wrap = document.getElementById("wrap");
  const existTable = document.querySelector("table");
  if (existTable) {
    wrap.removeChild(existTable);
  }
  const table = document.createElement("table");
  shuffle();
  //テーブルの作成
  for (i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    for (j = 0; j < 4; j++) {
      const td = document.createElement("td");
      td.textContent = label[i * 4 + j];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  wrap.appendChild(table);
};

const shuffle = () => {
  let random, temp;
  for (i = 0; i < label_length; i++) {
    random = Math.floor(Math.random() * label_length);
    temp = label[random];
    label[random] = label[i];
    label[i] = temp;
  }
};
