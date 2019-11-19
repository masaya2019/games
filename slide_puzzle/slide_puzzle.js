onload = function() {
  const new_button = document.getElementById("new_button");
  new_button.onclick = function() {
    const start = createNew();
    start();
  };
};

//-----------------------------
//ボタンをクリックしたときの動作
//-----------------------------
const createNew = function() {
  let label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ""];
  const label_length = label.length;
  shuffle(label, label_length);
  return function createNewTable() {
    const wrap = document.getElementById("wrap");
    //既存テーブルの消去
    const existTable = document.querySelector("table");
    if (existTable) {
      wrap.removeChild(existTable);
    }
    //テーブルの作成
    const table = document.createElement("table");
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
};

//-----------------------
//ラベルの要素をシャッフル
//-----------------------
const shuffle = (label, label_length) => {
  let random, temp;
  for (i = 0; i < label_length; i++) {
    random = Math.floor(Math.random() * label_length);
    temp = label[random];
    label[random] = label[i];
    label[i] = temp;
  }
};
