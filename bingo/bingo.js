onload = () => {
  //ビンゴの作成
  const random_number_array = create_number_array();
  create_bingo_table(random_number_array);
  //リザルトテーブルの作成
  create_result_table();
  //startクリックされたとき
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
        td.id = "default";
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
