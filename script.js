'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// ボタン押された後の処理（回答者用）
// retrun用配列の宣言
const ratingAllArray = [];
// htmlからid"fixed"のHtml Element（送信ボタンのあるところ）を変数fixedに代入
const fixed = document.getElementById("fixed");
fixed.addEventListener("click",function() {
  if (document.getElementById("name").value === "") {
    window.alert("エラー：評価者を入力してください");
  } else if (document.getElementById("ratingBdyCntrl1").value === "") {
    window.alert("エラー：評価項目Ａを入力してください");
  } else if (document.getElementById("ratingBuru1").value === "") {
    window.alert("エラー：評価項目Ｂを入力してください");
  } else if (document.getElementById("ratingBiri1").value === "") {
    window.alert("エラー：評価項目Ｃを入力してください");
  } else if (window.confirm("評価確定してもよいですか？")) {   //入力最終チェック
    const ratingIndividualObject = {
      name:document.getElementById("name").value,
      bdyCtrl:Number(document.getElementById("ratingBdyCntrl1").value),
      buru:Number(document.getElementById("ratingBuru1").value),
      biri:Number(document.getElementById("ratingBiri1").value)
    };
    ratingAllArray.push(ratingIndividualObject);
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
const viewResult = document.getElementById("viewResult");
viewResult.addEventListener("click",function() {
  let signStr = prompt("Input password")
  if (signStr === "password") {     // 管理者用かどうかパスワード認証
    let outputStrings = "name,Ans-A,Ans-B,Ans-C,<br>";
    for (const indivdualAnserObj of ratingAllArray) {
      // console.log(indivdualAnserObj);
      for (const key in indivdualAnserObj) {
        outputStrings = outputStrings + `${indivdualAnserObj[key]},`
        // console.log(outputStrings);
      }
      outputStrings = outputStrings + "<br>"
    }
    document.getElementById("result").innerHTML = outputStrings;
  }
});

//// 次にやりたいこと ////
// Case2、3の入力欄を増やす
