// Gets all the DOM objects
const DOM = (() => {
    const squares = document.querySelectorAll('.square');
    const restartBtn = document.querySelector('.restartBtn');
    const gameContainer = document.querySelector('.gameContainer');
    const message = document.querySelector('.message');

    const showAlert = (message) => {
        alert(`${message}`);
    }

    return { squares, gameContainer, showAlert , restartBtn, message };
})();

const PlayerFactory = (player, choice) => {
    return { player, choice };
};

// Builds the board and players and deals with game logic
const GameBoard = (() =>  {
    const container = DOM.gameContainer;
    const restartButton = DOM.restartBtn;
    const winConditions = [[0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6]];
    let players = [];
    let gameBoard = [];
    let roundCounter = 1;
    let gameOver = false;
    
    
    players.push(PlayerFactory('p1', 'O'), PlayerFactory('p2', 'X'));
    renderBoard();
   

    restartButton.addEventListener('click', clear);

    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            const squareView = document.createElement('div');
            squareView.style.backgroundColor = 'blue';
            squareView.style.borderRadius = '5px';
            squareView.textContent = '';
            squareView.style.display = 'flex';
            squareView.style.justifyContent = 'center';
            squareView.style.alignItems = 'center';
            squareView.setAttribute('data-index', `${i}`)
            squareView.addEventListener('click', (e) => {
                updateSquare(e.target)
            })
            gameBoard.push(squareView);
            container.appendChild(squareView);
        }
        console.log(gameBoard);
    }

    function updateSquare(square) {
        if (roundCounter % 2  != 0 && square.textContent == '' && gameOver == false) {
            // player1 turn
            square.textContent = 'O';
            roundCounter++;
            checkForWinnerP1();
        } else if (square.textContent == '' && roundCounter % 2 == 0 && gameOver == false) {
            // player2 turn
            square.textContent = 'X';
            roundCounter++;
            checkForWinnerP2();
        }

        // Check if board is full
        if (roundCounter > 9) {
            displayMessage(`It's a draw :(`);
        }
    }

    function checkForWinnerP1() {
        winConditions.forEach(element => {
            if (gameBoard[element[0]].textContent == 'O' && gameBoard[element[1]].textContent == 'O' && gameBoard[element[2]].textContent == 'O') {
                displayMessage('Player 1 is victorious!');
                gameOver = true;
            }
        });
    }

    function checkForWinnerP2() {
        winConditions.forEach(element => {
            if (gameBoard[element[0]].textContent == 'X' && gameBoard[element[1]].textContent == 'X' && gameBoard[element[2]].textContent == 'X') {
                displayMessage('Player 2 is victorious!');
                gameOver = true;
            }
        });
    }

    function clear() {
        for (let i = 0; i < gameBoard.length; i++) {
            const element = gameBoard[i];
            element.textContent = '';
        }
        roundCounter = 1;
        gameOver = false;
        DOM.message.style.display = 'none';
    }

    function displayMessage(message) {
        DOM.message.textContent = message;
        DOM.message.style.display = 'block';
    }
})();
