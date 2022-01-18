function createPlayer(name, marker) {
  return { name, marker };
}

const player1 = createPlayer('Player X', 'X');
const player2 = createPlayer('Player O', 'O');

const game = (() => {
  const playerName = document.querySelector('.player-name');
  const boxes = document.querySelectorAll('.box');

  let currentMarker;
  let winner = false;

  const winningNumbers = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6], 
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ];
 
  let playerXChoices = [];
  let playerOChoices = [];

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
    if (winner) {
      return;
    }

    if (e.target.textContent){
      return;
    }

    currentMarker = player.marker;

    if (player.marker === 'X') {
      playerName.textContent = "Player O's turn";
      playerXChoices.push(index);
    } else {
      playerName.textContent = "Player X's turn";
      playerOChoices.push(index);
    }

    e.target.textContent = `${player.marker}`;
    gameBoard.ticTacToeBoard[index] = `${player.marker}`;
    
    if (checkWinner(index)) {
      winner = true;
    }
  }

  function checkWinner() {
    
  }
})();
