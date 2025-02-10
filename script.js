const board = document.getElementById('board');
        const resetBtn = document.getElementById('reset');
        const winnerText = document.getElementById('winner');
        let currentPlayer = 'X';
        let gameBoard = Array(9).fill(null);

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let combo of winningCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    winnerText.textContent = `Player ${gameBoard[a]} Wins!`;
                    document.querySelectorAll('.cell').forEach(cell => cell.classList.add('taken'));
                    return true;
                }
            }
            if (!gameBoard.includes(null)) {
                winnerText.textContent = "It's a Draw!";
                return true;
            }
            return false;
        }

        function handleClick(event) {
            const index = event.target.dataset.index;
            if (!gameBoard[index]) {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                event.target.classList.add('taken');
                if (!checkWinner()) {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }

        function resetGame() {
            gameBoard.fill(null);
            currentPlayer = 'X';
            board.innerHTML = '';
            winnerText.textContent = '';
            createBoard();
        }

        function createBoard() {
            board.innerHTML = '';
            gameBoard.forEach((_, index) => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.index = index;
                cell.addEventListener('click', handleClick);
                board.appendChild(cell);
            });
        }

        createBoard();
        resetBtn.addEventListener('click', resetGame);