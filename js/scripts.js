function createPlayer(name, marker) {
  return { name, marker };
}

const player1 = createPlayer('Player X', 'X');
const player2 = createPlayer('Player O', 'O');

const game = (() => {
  const playerName = document.querySelector('.player-name');
  const boxes = document.querySelectorAll('.box');
  let currentMarker;

  boxes.forEach((box, index) => {
    box.addEventListener('click', (e) => {
      playerSelection(e,  playRound.switchPlayer(), index);
    });
  });

  const gameBoard = {
    ticTacToeBoard: [null, null, null, null, null, null, null, null, null],
  };

  const playRound = {
    switchPlayer: function() {
       if (currentMarker === 'X') {
         return player2;
       } else {
         return player1;
       }
    }
  };

  function playerSelection(e, player, index) {
    if (e.target.textContent){
      return;
    }

    currentMarker = player.marker;

    if (player.marker === 'X') {
      playerName.textContent = "Player O's turn";
    } else {
      playerName.textContent = "Player X's turn";
    }

    e.target.textContent = `${player.marker}`;
    gameBoard.ticTacToeBoard[index] = `${player.marker}`;
    console.log(gameBoard.ticTacToeBoard)
  }
})();
