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
 
  boxes.forEach((box, index) => {
    box.addEventListener('click', (e) => {
      playerSelection(e,  playRound.switchPlayer(), index);
    });
  });

  const gameBoard = {
    array: [null, null, null, null, null, null, null, null, null],
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
    } else {
      playerName.textContent = "Player X's turn";
    }

    e.target.textContent = `${player.marker}`;
    gameBoard.array[index] = `${player.marker}`;
    
    checkForWinner();
    checkForTie();
  }

  function checkForWinner() {
    for (let i = 0; i < winningNumbers.length; i++) {
      const [a, b, c] = winningNumbers[i];
      if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
        let marker = boxes[a].textContent;
        announceWinner(marker);
      }
    }
    return null;
  }

  function announceWinner(marker) {
    if (marker === 'X') {
      playerName.textContent = 'Player X  has won!';
    } else {
      playerName.textContent = 'Player O has won!';
    }

    winner = true;
  }

  function checkForTie() {
   if (gameBoard.array.every(letter => letter !== null)) {
     playerName.textContent = "It's a tie!";
   }
  }
})();
