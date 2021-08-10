"use strict";
{
  // 新しい単語をセットする関数。

  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    // wordsの中からランダムに文字列を選んで、splice()で選んだ単語をwordsから１つ削除しwordに再代入する。
    // spliceeの返り値は結果がひとつであっても配列になるので、配列から取り出すために、添字の[0]をつける。

    target.textContent = word;
    // targetにwordの文字列を表示。

    loc = 0;
    // 新しい単語をセットしたらlocを0でリセット。
  }

  const words = ["gfdsa", "hjkl;", "trewq", "yuiop", "12345", "67890","bvcxz", "nm,./"];

  let word;
  let loc = 0;
  // タイプしているlocationを管理する変数を宣言。

  let startTime;
  // クリックした時刻を記録し、最後に表示するために使用する変数を宣言。

  let isPlaying = false;
  // クリックしてゲームを開始し、タイプした後、再度クリックすると単語がリセットされないように、プレイ中であるかどうかを変数で管理。
  // 初期値はゲームが始まっていないのでfalese。

  const target = document.getElementById("target");
  // 取得したtarget要素を定数で宣言。

  // クリックしたらで新しい単語をセットし、ゲームスタート。

  document.addEventListener("keydown", () => {
    if (isPlaying === true) {
      return;
    }
    // もしゲームが始まっていたら、以降の処理(ゲームスタートの処理)を行わない。

    isPlaying = true;
    // ゲームが始まったことをtureで保持。

    startTime = Date.now();
    // ゲームスタートした時刻をDate.now()で取得し、startTimeに代入。

    setWord();
    // 単語をセットする関数を実行。
  });

  document.addEventListener("keydown", (e) => {
    // キーが押された時、以下のイベントをドキュメントに追加。
    // イベントオブジェクトをeの引数で受け取る。

    if (e.key !== word[loc]) {
      return;
    }
    // タイプした文字の正誤判定。
    // 打った文字 = e.keyと、wordのloc番目の文字 = word[loc]が同じでなかったら、以降の処理を行わない。= この条件に該当しないということは正解。
    // (メイン処理以外のケースを早めに除外し、メイン処理をわかりやすくすることを早期リターンという）

    loc++;
    // 正解したら打つべき文字は次の文字になるので、locを１増やす。

    target.textContent = "_".repeat(loc) + word.substring(loc);
    // 以下の文字列を組み合わせたものをtargetに表示する。
    // repeatメソッドを使って、locの個数分、アンダーバーをつなげた文字列。
    // substringメソッドを使って、wordのloc番目以降の文字列。

    // 文字を最後まで打ったら次の単語へ進み、
    // 全ての文字を打ち終わったら処理を終える。

    if (loc === word.length) {
      // locがword.lengthと同じだったら、

      if (words.length === 0) {
        // wordsから単語が無くなった時に、

        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        // 最後の単語を打ち終わったときの経過時間を定義。定数elapsedTimeに、ゲームセット時刻から、startTime を引いて計算する。
        // 計算結果はミリ秒単位なので、1000で割って秒単位表記にする。
        // toFicedで小数点以下を２桁表示に指定。

        const result = document.getElementById("result");
        result.textContent = `Finished! ${elapsedTime} seconds!`;
        // ゲームセット時にアナウンスとクリア時間を表示。
        // クリア時間をテンプレートリテラルでテキストに埋め込む。

        return;
        // resultIDのついた要素のテキストをFinished!として、それ以降の処理を行わない。
      }

      setWord();
      // 単語をセットする関数を実行。
    }
  });
}
