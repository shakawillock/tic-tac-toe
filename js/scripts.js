function createPlayer(name, marker) {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker};
}

const player1 = createPlayer('Player X', 'X');
const player2 = createPlayer('Player O', 'O');

const game = (() => {
  const playerName = document.querySelector('.player-name');
  const boxes = document.querySelectorAll('.box');
  const restartBtn = document.querySelector('.btn-restart');

  let currentMarker = '';
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

  restartBtn.addEventListener('click', restartGame);

  const gameBoard = {
    array: [null, null, null, null, null, null, null, null, null],
  };

  const playRound = {
    switchPlayer: function() {
       if (currentMarker === player1.getMarker()) {
         return player2;
       } else {
         return player1;
       }
    }
  };

  function playerSelection(e, player, index) {
    if (winner === true) {
      return;
    }

    if (e.target.textContent !== ''){
      return;
    }

    currentMarker = player.getMarker();

    if (player.getMarker() === 'X') {
      playerName.textContent = `${player2.getName()}'s turn`;
    } else {
      playerName.textContent = `${player1.getName()}'s turn`;
    }

    e.target.textContent = `${player.getMarker()}`;
    gameBoard.array[index] = `${player.getMarker()}`;
    
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
      playerName.textContent = `${player1.getName()} has won!`;
    } else {
      playerName.textContent = `${player2.getName()} has won!`;
    }

    winner = true;
  }

  function checkForTie() {
   if (gameBoard.array.every(letter => letter !== null)) {
     playerName.textContent = "It's a tie!";
   }
  }

  function restartGame() {
   boxes.forEach(box => {
     box.textContent = '';
   });

   winner = false;
   currentMarker = '';

   playerName.textContent = `${player1.getName()}'s turn`;
   
   for (let i = 0; i < gameBoard.array.length; i++) {
     if (gameBoard.array[i] !== null) {
       gameBoard.array[i] = null;
     }
   }
  }
})();
