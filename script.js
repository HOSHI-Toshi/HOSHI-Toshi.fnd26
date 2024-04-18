'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const ratingAllArray = [];

const fixed = document.getElementById("fixed");
fixed.addEventListener("click",function() {
  // console.log(document.getElementById("name").value);
  // console.log(Number(document.getElementById("ratingBdyCntrl").value));
  // console.log(Number(document.getElementById("ratingBuru").value));
  // console.log(Number(document.getElementById("ratingBiri").value));
  const ratingIndividualObject = {
    name:document.getElementById("name").value,
    bdyCtrl:Number(document.getElementById("ratingBdyCntrl").value),
    buru:Number(document.getElementById("ratingBuru").value),
    biri:Number(document.getElementById("ratingBiri").value)
  };
  // console.log(ratingIndividualObject);
  ratingAllArray.push(ratingIndividualObject);
  console.log(ratingAllArray);
});

// 次にやりたいこと
// Case2、3の入力欄を増やす
// 評価送信時に確認Windowを表示する
// 集まった結果（配列）を使って、管理者用ページにて即座に集計する（平均値を出す）
