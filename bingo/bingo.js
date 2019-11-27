onload = () => {
  let push_counter = 0;
  //ビンゴの作成
  const random_number_array = create_number_array();
  //console.log(random_number_array);
  create_bingo_table(random_number_array);
  //リザルトテーブルの作成
  create_result_table();
  let elected_number_array = new Array();
  //startクリックされたとき
  const start_button = document.getElementById("start_button");
  start_button.onclick = () => {
    push_counter++;
    if (push_counter <= 75) {
      //当選番号
      const elected_number = create_elected_number(elected_number_array);
      //番号を表示
      display_number(elected_number);
      //ビンゴの番号チェック
      check_bingo_number(elected_number, random_number_array);
      //リザルトテーブルの消去
      delete_result_number(elected_number);
      //ビンゴの判定
      const target = document.querySelectorAll(".default");
      if (target.length >= 5) {
        bingo_check();
      }
    } else {
      start_button.removeAttribute("onclick");
    }
  };
};

//-----------------------------
//ビンゴの作成
//-----------------------------
const create_bingo_table = random_number_array => {
  const table_container = document.getElementById("table_container");
  //既存テーブルの消去
  const existTable = document.querySelector("#bingo_table");
  if (existTable) {
    table_container.removeChild(existTable);
  }
  //テーブルの作成
  const table = document.createElement("table");
  table.id = "bingo_table";
  for (i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (j = 0; j < 5; j++) {
      const td = document.createElement("td");
      if (i == 2 && j == 2) {
        td.className = "default";
      } else {
        td.innerHTML = random_number_array[i * 5 + j];
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  table_container.appendChild(table);
};

//-----------------------------
//ビンゴ用の乱数の作成
//-----------------------------
const create_number_array = () => {
  const bingo_table_array = new Array();
  for (k = 0; k < 5; k++) {
    //ビンゴの列の数字の範囲
    const bingo_range_array = create_bingo_range_array(k);
    for (l = 0; l < 5; l++) {
      const num = l * 5 + k;
      if (num == 12) {
        bingo_table_array[12] = "";
      } else {
        bingo_table_array[l * 5 + k] = bingo_range_array[l];
      }
    }
  }
  return bingo_table_array;
};

//-----------------------------
//ビンゴの列の数字の範囲
//-----------------------------
const create_bingo_range_array = k => {
  //ビンゴ列の数字の範囲を作成
  let bingo_range_array = new Array();
  for (m = 1; m <= 15; m++) {
    bingo_range_array.push(k * 15 + m);
  }
  //配列をシャッフル
  shuffle(bingo_range_array);
  return bingo_range_array;
};

//-----------------------------
//配列のシャッフル
//-----------------------------
const shuffle = bingo_range_array => {
  let random, temp;
  for (i = 0; i < bingo_range_array.length; i++) {
    random = Math.floor(Math.random() * bingo_range_array.length);
    temp = bingo_range_array[random];
    bingo_range_array[random] = bingo_range_array[i];
    bingo_range_array[i] = temp;
  }
};

//-----------------------------
//リザルトテーブルの作成
//-----------------------------
const create_result_table = () => {
  const table_container = document.getElementById("result_table_container");
  //既存テーブルの消去
  const existTable = document.querySelector("#result_table");
  if (existTable) {
    table_container.removeChild(existTable);
  }
  //テーブルの作成
  const table = document.createElement("table");
  table.id = "result_table";
  for (i = 0; i < 8; i++) {
    const tr = document.createElement("tr");
    for (j = 0; j < 10; j++) {
      if (!(i == 7 && j == 5)) {
        const td = document.createElement("td");
        td.innerHTML = i * 10 + j + 1;
        tr.appendChild(td);
      } else {
        break;
      }
    }
    table.appendChild(tr);
  }
  table_container.appendChild(table);
};

//-----------------------------
//当選番号の作成
//-----------------------------
const create_elected_number = elected_number_array => {
  let check_result = false;
  while (check_result == false) {
    //仮の数字を作成
    const temp_number = Math.floor(Math.random() * 75 + 1);
    //数字の重複をチェック
    check_result = check_temp_number(temp_number, elected_number_array);
    //重複していないならOK！
    if (check_result == true) {
      elected_number_array.push(temp_number);
      return temp_number;
    }
  }
};

//-----------------------------
//数字の重複をチェック
//-----------------------------
const check_temp_number = (temp_number, elected_number_array) => {
  let result = true;
  for (i = -1; i < elected_number_array.length && result == true; i++) {
    if (elected_number_array[i] == temp_number) {
      result = false;
    }
  }
  return result;
};

//-----------------------------
//当選番号を表示
//-----------------------------
const display_number = elected_number => {
  if (elected_number <= 9) {
    elected_number = "0" + elected_number;
  } else {
    elected_number = String(elected_number);
  }
  const panel_array = elected_number.split("");
  const place_ten = document.getElementById("place_ten");
  place_ten.innerHTML = panel_array[0];
  const place_one = document.getElementById("place_one");
  place_one.innerHTML = panel_array[1];
};

//-----------------------------
//ビンゴの番号チェック
//-----------------------------
const check_bingo_number = (elected_number, random_number_array) => {
  for (j = 0; j < random_number_array.length; j++) {
    if (random_number_array[j] == elected_number) {
      const target = document.querySelectorAll("#bingo_table tr td");
      target[j].innerHTML = "";
      target[j].setAttribute("class", "default");
      random_number_array[j] = "";
    }
  }
};

//-----------------------------
//リザルトテーブルの消去
//-----------------------------
const delete_result_number = elected_number => {
  const target = document.querySelectorAll("#result_table tr td");
  target[elected_number - 1].setAttribute("class", "result");
};

//-----------------------------
//ビンゴの判定
//-----------------------------
const bingo_check = () => {
  const target = document.querySelectorAll("#bingo_table tr td");
  //横
  for (i = 0; i < 25; i += 5) {
    if (target[i].innerHTML == "") {
      for (j = 1; j < 5; j++) {
        if (target[i + j].innerHTML == "") {
        } else {
          break;
        }
      }
      if (j == 5) {
        console.log("bingo　→");
      }
    }
  }
  //縦
  for (i = 0; i < 5; i++) {
    if (target[i].innerHTML == "") {
      for (j = 5; j < 25; j += 5) {
        if (target[i + j].innerHTML == "") {
        } else {
          break;
        }
      }
      if (j >= 25) {
        console.log("bingo　↓");
      }
    }
  }
  //斜め→↓
  for (i = 0; i < 25; i += 6) {
    if (target[i].innerHTML == "") {
    } else {
      break;
    }
  }
  if (i >= 25) {
    console.log("bingo　→↓");
  }
  //斜め→↑
  for (i = 4; i <= 20; i += 4) {
    if (target[i].innerHTML == "") {
    } else {
      break;
    }
  }
  if (i >= 24) {
    console.log("bingo　→↑");
  }
};
