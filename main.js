'use strict';

{
  //①まず、必要な要素を全部取得する。
  const timer = document.getElementById('timer');//timerというidを持つ要素を取得し、定数timerに代入し定義している。今後、変数timerを使用していく。
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;/* 変数宣言。今回は初期化しない。*/
  let timeoutId;
  let elapsedTime = 0;


  //③カウントアップメソッドを設定する。経過時間を表示し続けるメソッド。//
  function countUp() {
    // console.log(Date.now() - startTime);/*ここのstartTimeは、startボタンをクリックした時の時刻。*/ 
    const d = new Date(Date.now() - startTime + elapsedTime);//new Date()には、整数値を引数として渡すことができる。その引数を基に、それに対応する時間を取得する。
    const m = String(d.getMinutes()).padStart(2, '0');//定数dを基に、分を取得する。padStartは文字列でないと使えない。
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}:${ms}`;//テンプレートリテラルを使用する。

    timeoutId = setTimeout(() => {/*10ミリ秒ごとにこのcountUp()自身を呼び出す。*/
      countUp();/*countUp()が再度呼び出され、止めるまで永遠に動く。*/
    }, 10); 
  }

  //最初の状態では、startボタンだけ押せるようにする。stop,resetは押せないようにする。
  function setButtonStateInitial() {
    start.classList.remove('inactive'); /**disabledを無効化。初期状態では、これだけクリックできるようにする。 */
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {/**動いてるとき、stopボタンだけクリックできるようにする。 */
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {/**stopボタンを押した後、startとresetが押せるようにする。 */
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  //②startボタンにクリックイベントを設定する。
  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }//inactiveクラスを持っていたら、ここで処理を終わらせる。

    setButtonStateRunning();

    startTime = Date.now();/*現在の時刻における UTC 1970/01/01 00:00:00 からの経過ミリ秒*/
    countUp();/**countUp()を呼び出す。 */
  });

  //④stopのクリックイベントを設定する。
  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }//inacitve要素を持っていたら、ここで処理を終わらせる。つまり、stopボタンを押しても、以下の処理は行われないので、反応しない。

    setButtonStateStopped();

    clearTimeout(timeoutId);/** 指定した引数の処理をキャンセルする。 */

    elapsedTime += Date.now() - startTime;/** stopを押した時点での時間を保持しておけばよい。 */
    /** +=とすることで、タイマーが走っていた時間を全て過不足なく足し上げることができる。=だけだと、一番直近のstartボタンを押した時から止めるまでの経過時間しか保持できない。*/
  });

  //⑤resetのクリックイベントを設定する。
  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }//inacitve要素を持っていたら、ここで処理を終わらせる。つまり、stopボタンを押しても、以下の処理は行われないので、反応しない。

    setButtonStateInitial();

    timer.textContent = '00:00.000';/** start前の表示に戻す。 */

    elapsedTime = 0;/**resetを押した時に、elapsedTimeもリセットしておく。*/
  });

}
