'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// ボタン押された後の処理（回答者用）
const ratingAllArray = []; // 全員の回答をまとめる配列宣言
const fixed = document.getElementById("fixed"); // htmlからid"fixed"のHtml Element（送信ボタンのあるところ）を変数fixedに代入
fixed.addEventListener("click",function() {
  if (document.getElementById("name").value === "") { // 入力チェック（評価者）
    window.alert("エラー：評価者が未入力です");
  } else if (document.getElementById("ratingBdyCntrl1").value === ""
      || document.getElementById("ratingBuru1").value === ""
      || document.getElementById("ratingBiri1").value === "") {  // 入力チェック（case1の採点）
    window.alert("エラー：採点漏れがあります");
  } else if (window.confirm("評価確定してもよいですか？")) {   //入力最終チェック
    const ratingIndividualObject = {
      name:document.getElementById("name").value,
      bdyCtrl:Number(document.getElementById("ratingBdyCntrl1").value),
      buru:Number(document.getElementById("ratingBuru1").value),
      biri:Number(document.getElementById("ratingBiri1").value)
    }; // 回答をオブジェクト化
    ratingAllArray.push(ratingIndividualObject); // オブジェクト化した回答を配列の最後に追加
    // ファイル出力 //
    let raitingIndividualStrings
      = document.getElementById("name").value + ","
      + document.getElementById("ratingBdyCntrl1").value + ","
      + document.getElementById("ratingBuru1").value + ","
      + document.getElementById("ratingBiri1").value; // 0-a.回答（オブジェクト）を1つの文字列に変換
    let outputFileName = `answer_${document.getElementById("name").value}.txt`; // 0-b.出力ファイル名に回答者名を差込 
    const blob = new Blob([raitingIndividualStrings],{type:"text/plain"}); // 1. Blobオブジェクトを作成する
    const link = document.createElement('a'); // 2. HTMLのa要素を生成
    link.href = URL.createObjectURL(blob); // 3. BlobオブジェクトをURLに変換
    link.download = outputFileName; // 4. ファイル名を指定する
    link.click(); // 5. a要素をクリックする処理を行う
    // ファイル出力ここまで //
    // 画面テキストボックスの初期化
    document.getElementById("name").value = "";
    document.getElementById("ratingBdyCntrl1").value = "";
    document.getElementById("ratingBuru1").value = "";
    document.getElementById("ratingBiri1").value = "";
  }
  console.log(ratingAllArray);
});

// ボタン押された後の処理（管理者用）
const viewResult = document.getElementById("viewResult"); // Button部分のHTML要素の抽出
viewResult.addEventListener("click",function() {
  let signStr = prompt("Input password")
  if (signStr === "password") {     // 管理者用かどうかパスワード認証
    let outputStrings = "name,Ans-A,Ans-B,Ans-C,<br>"; // 表示1行目のタイトル行の挿入
    for (const indivdualAnserObj of ratingAllArray) {
      // console.log(indivdualAnserObj);
      for (const key in indivdualAnserObj) {
        outputStrings = outputStrings + `${indivdualAnserObj[key]},`
        // console.log(outputStrings);
      }
      outputStrings = outputStrings + "<br>" // 配列に格納された全回答を文字列として行挿入。最後に改行も挿入。
    }
    document.getElementById("result").innerHTML = outputStrings;
  }
});

//// 次にやりたいこと ////
// Case2、3の入力欄を増やす
