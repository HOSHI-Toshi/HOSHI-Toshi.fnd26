'use strict'
// 1行目に記載している 'use strict' は削除しないでください
// retrun用配列の宣言
const ratingAllArray = [];
// htmlからid"fixed"のHtml Element（送信ボタンのあるところ）を変数fixedに代入
const fixed = document.getElementById("fixed");
// ボタン押された後の処理
fixed.addEventListener("click",function() {
  // 入力漏れチェック
  const ratingIndividualObject = {
    name:document.getElementById("name").value,
    bdyCtrl:Number(document.getElementById("ratingBdyCntrl1").value),
    buru:Number(document.getElementById("ratingBuru1").value),
    biri:Number(document.getElementById("ratingBiri1").value)
  };
  // let inputErrorBoolean = true;
  // for (const key in ratingIndividualObject) {
  //   if (ratingIndividualObject[key] === "") {
  //     inputErrorBoolean = false;
  //   }
  // }
  // console.log("object Null check =>", inputErrorBoolean);
  // if (!inputErrorBoolean) {
  //   window.alert("エラー：入力確認してください");
  // }
  if (document.getElementById("name").value === "") {
    window.alert("エラー：評価者を入力してください");
  } else if (document.getElementById("ratingBdyCntrl1").value === "") {
    window.alert("エラー：評価項目Ａを入力してください");
  } else if (document.getElementById("ratingBuru1").value === "") {
    window.alert("エラー：評価項目Ｂを入力してください");
  } else if (document.getElementById("ratingBiri1").value === "") {
    window.alert("エラー：評価項目Ｃを入力してください");
  } else if (window.confirm("評価確定してもよいですか？")) {   //入力最終チェック
    ratingAllArray.push(ratingIndividualObject);
    document.getElementById("name").value = "";
    document.getElementById("ratingBdyCntrl1").value = "";
    document.getElementById("ratingBuru1").value = "";
    document.getElementById("ratingBiri1").value = "";
  }
  console.log(ratingAllArray);
});

//// 次にやりたいこと ////
// Case2、3の入力欄を増やす
// 配列をファイル出力（できれば）
// 試験スタッフ向けの集計アプリを作る
