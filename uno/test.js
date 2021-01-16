var myPromise = new Promise(function (resolve, reject) {
  // 実行したい処理を記述
  setTimeout(function() {
    // 成功
    resolve('成功!'); // resolve(渡したい値)
  }, 3000);
});


myPromise
  .then(function(value) {
    // 非同期処理が成功した場合
    console.log('実行結果:' + value); // => 実行結果:成功!
  })
  .catch(function(value) {
    // 非同期処理が失敗した場合
    console.log('実行結果:' + value); // 呼ばれない
  });
