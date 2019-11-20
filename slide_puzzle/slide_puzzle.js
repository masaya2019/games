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
  let td_space;
  //shuffle(label, label_length);
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
    //セルに数字を追加し、空白の位置を取得
    td_space = addNumber(label, label_length);
    can_move_position(td_space, label_length);
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

//----------------
//セルに数字を追加
//----------------
const addNumber = (label, label_length) => {
  const td_object = document.getElementsByTagName("td");
  for (i = 0; i < label_length; i++) {
    const target_td_object = td_object[i];
    target_td_object.innerHTML = label[i];
    target_td_object.setAttribute("class", "hover");
    target_td_object.removeAttribute("onclick");
    //空白の位置を取得
    if (label[i] == "") {
      td_space = i;
    }
  }
  return td_space;
};

//-----------------
//移動可能位置を取得
//-----------------
const can_move_position = (td_space, label_length) => {
  const target_td_array = document.getElementsByTagName("td");
  if (td_space > 3) {
    const new_td = td_space - 4;
    can_move_display(target_td_array, new_td, label_length);
  }
  if (td_space < 12) {
    const new_td = td_space + 4;
    can_move_display(target_td_array, new_td, label_length);
  }
  if (td_space % 4 > 0) {
    const new_td = td_space - 1;
    can_move_display(target_td_array, new_td, label_length);
  }
  if (td_space % 4 < 3) {
    const new_td = td_space + 1;
    can_move_display(target_td_array, new_td, label_length);
  }
};

//-----------------
//移動可能位置を着色
//-----------------
const can_move_display = (target_td_array, new_td, label_length) => {
  target_td_array[new_td].classList.add("can_move_display");
  target_td_array[new_td].setAttribute(
    "onclick",
    `move(${new_td},${label_length})`
  );
};

//---------------------
//move(i)が押されたとき
//---------------------
const move = (array_number, label_length) => {
  const td = document.getElementsByTagName("td");
  //onclickとcan_move_displayを取り除く
  for (j = 0; j < label_length; j++) {
    td[j].removeAttribute("onclick");
    td[j].classList.remove("can_move_display");
  }
  //要素の交換
  td[td_space].innerHTML = td[array_number].innerHTML;
  td[array_number].innerHTML = "";
  //空白の位置を更新
  td_space = array_number;
  //新たな移動可能位置を取得
  can_move_position(td_space, label_length);
  end_check(td, label_length);
};

//--------
//終了判定
//--------
const end_check = (td, label_length) => {
  let result = "OK";
  for (k = 0; k < label_length - 1; k++) {
    if (td[k].innerHTML != k + 1) {
      result = "NG";
      break;
    }
  }
  if (result == "OK") {
    document.getElementById("complete").innerHTML = "やったね！";
    for (l = 0; l < label_length; l++) {
      td[l].removeAttribute("onclick");
      td[l].removeAttribute("class");
    }
    document.getElementById("new_button").innerHTML = "Play Again!!";
  }
};
