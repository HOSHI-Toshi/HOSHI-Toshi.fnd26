'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 関数）評価入力チェックと後処理
/**
 * @param {Array} raitingArray ケースごとの評価結果
 * @returns {Boolean} 採点入力チェック結果（False：未入力あり）  
 */
function fixedRaiting(raitingArray) {
  let inputErrChkBoolean;
  if (numOfCase === 1) {
    inputErrChkBoolean = 
      raitingArray[0] === "" || raitingArray[1] === "" || raitingArray[2] === "";
  } else if (numOfCase === 2) {
    inputErrChkBoolean = 
      raitingArray[0] === "" || raitingArray[1] === "" || raitingArray[2] === ""   //case1
      || raitingArray[3] === "" || raitingArray[4] === "" || raitingArray[5] === "" ; //case2
  } else {
    console.log("エラー：ケース数に対応していません")
  };
  if (inputErrChkBoolean) {  // 入力チェック（採点）
    window.alert("エラー：採点漏れがあります");
    return false;
  } else if (window.confirm("評価確定してもよいですか？")) {   //入力最終チェック
    const ratingIndividualObject = {
      name:document.getElementById("name").value,
      // case1
      bdyCtrl1:Number(raitingArray[0]),
      buru1:Number(raitingArray[1]),
      biri1:Number(raitingArray[2])
      // case2
      , bdyCtrl2:Number(raitingArray[3]),
      buru2:Number(raitingArray[4]),
      biri2:Number(raitingArray[5])
      // case3
      // ...
    }; // 回答をオブジェクト化
    ratingAllArray.push(ratingIndividualObject); // オブジェクト化した回答を配列の最後に追加
    console.log(ratingAllArray);
    return true;
  }
}

// 評価ケース数をここで登録（定義）すること！（.htmlと一致させる）
const numOfCase =2;

// 「評価送信」ボタンが押された後の処理
const ratingAllArray = []; // 全員の回答をまとめる配列宣言
const fixed = document.getElementById("fixed"); // htmlからid"fixed"のHtml Element（送信ボタンのあるところ）を変数fixedに代入

fixed.addEventListener("click",function() {
  const raitingCase1Array = [
    // case1
    document.getElementById("ratingBdyCntrl1").value,
    document.getElementById("ratingBuru1").value,
    document.getElementById("ratingBiri1").value
    // case2
    , document.getElementById("ratingBdyCntrl2").value,
    document.getElementById("ratingBuru2").value,
    document.getElementById("ratingBiri2").value
    // case3
    // , document.getElementById("ratingBdyCntrl3").value,
    // document.getElementById("ratingBuru3").value,
    // document.getElementById("ratingBiri3").value
  ];
  if (document.getElementById("name").value !== "") { // 入力チェック（評価者）
    const existingRaitingBoolean = fixedRaiting(raitingCase1Array);  // 評価データ登録関数を呼び出す
    // ファイル出力 //
    if (existingRaitingBoolean) {
      let indivdualAnserObj = ratingAllArray[ratingAllArray.length-1];
      let raitingIndividualStrings = "";
      for (const key in indivdualAnserObj) {
        raitingIndividualStrings = raitingIndividualStrings + indivdualAnserObj[key] + ","
      }  // 0-a.回答（オブジェクト）を1つの文字列に変換
      let outputFileName = `answer_${document.getElementById("name").value}.txt`; // 0-b.出力ファイル名に回答者名を差込 
      const blob = new Blob([raitingIndividualStrings],{type:"text/plain"}); // 1. Blobオブジェクトを作成する
      const link = document.createElement('a'); // 2. HTMLのa要素を生成
      link.href = URL.createObjectURL(blob); // 3. BlobオブジェクトをURLに変換
      link.download = outputFileName; // 4. ファイル名を指定する
      link.click(); // 5. a要素をクリックする処理を行う
      // ファイル出力ここまで //
      // 画面テキストボックスの初期化（名前）
      document.getElementById("name").value = "";
      // 画面テキストボックスの初期化（case1）
      document.getElementById("ratingBdyCntrl1").value = "";
      document.getElementById("ratingBuru1").value = "";
      document.getElementById("ratingBiri1").value = "";
      // 画面テキストボックスの初期化（case2）
      document.getElementById("ratingBdyCntrl2").value = "";
      document.getElementById("ratingBuru2").value = "";
      document.getElementById("ratingBiri2").value = "";
      // 画面テキストボックスの初期化（case3）
      // ...
    }
  } else {
    window.alert("エラー：評価者が未入力です");
  }
});


// 「管理者用」ボタンを押された後の処理
const viewResult = document.getElementById("viewResult"); // Button部分のHTML要素の抽出
viewResult.addEventListener("click",function() {
  let signStr = prompt("Input password")
  if (signStr === "password") {     // 管理者用かどうかパスワード認証
    let outputStrings = "name,Ans-A1,Ans-B1,Ans-C1,Ans-A2,Ans-B2,Ans-C2,<br>"; // 表示1行目のタイトル行の挿入
    for (const indivdualAnserObj of ratingAllArray) {
      for (const key in indivdualAnserObj) {
        outputStrings = outputStrings + `${indivdualAnserObj[key]},`
      }
      outputStrings = outputStrings + "<br>" // 配列に格納された全回答を文字列として行挿入。最後に改行も挿入。
    }
    document.getElementById("result").innerHTML = outputStrings;
  }
});
