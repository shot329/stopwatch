'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;/* 変数宣言。今回は初期化しない。*/
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // console.log(Date.now() - startTime);/*ここのstartTimeは、startボタンをクリックした時の時刻。*/ 
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {/*10ミリ秒ごとにこのcountUp()自身を呼び出す。*/
      countUp();/*countUp()が再度呼び出され、止めるまで永遠に動く。*/
    }, 10);
  }

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

  start.addEventListener('click', () => {
    if (start.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateRunning();
    startTime = Date.now();/*現在の時刻における UTC 1970/01/01 00:00:00 からの経過ミリ秒*/
    countUp();/**countUp()を呼び出す。 */
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);/** 指定した引数の処理をキャンセルする。 */
    elapsedTime += Date.now() - startTime;/** stopを押した時点での時間を保持しておけばよい。 */
    /** +=とすることで、タイマーが走っていた時間を全て足し上げることができる。=だけだと、一番直近のstartボタンを押した時から止めるまでの経過時間しか保持できない。*/
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateInitial();
    timer.textContent = '00:00:000';/** start前の表示に戻す。 */
    elapsedTime = 0;/**resetを押した時に、elapsedTimeもリセットしておく。 */
  });

}
