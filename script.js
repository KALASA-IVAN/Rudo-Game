'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// ---------------------
// starting condition

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}
// Rolling condition
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for rolled 1: if true switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
    // if (activePlayer == 0) {
    //     player1.classList.remove('player--active');
    //     player0.classList.add('player--active');
    // } else {
    //     player0.classList.remove('player--active');
    //     player1.classList.add('player--active');
    // }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to activePlayer's scores
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player score is >= 100

    if (scores[activePlayer] >= 100) {
      // Finish Game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
