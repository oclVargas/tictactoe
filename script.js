const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const Gameboard = (() => {
    let board = [];
})();

const Player = (name, symbol) => {
    const sayName = () => console.log(`Hey ${name}!`);
    return { symbol, sayName }
};

const Game = (() => {
    const winningMessageElement = document.getElementById('winning-message');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text');
    const restart = document.querySelector('#restartButton');
    const player1 = Player('player1', 'X');
    const player2 = Player('player2', 'O');
    let playerTurn = player1;

    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', handleCellClick);
    })

    restart.addEventListener('click', (() => {
        cells.forEach(cell => {
            cell.classList.remove('X')
            cell.classList.remove('O')
            cell.classList.remove('taken')
            cell.innerText = '';
            // cell.removeEventListener('click', handleCellClick);
            // cell.addEventListener('click', handleCellClick)
        })
        winningMessageElement.classList.remove('show')
    }))

    function swapTurns() {
        playerTurn === player1 ? playerTurn = player2 : playerTurn = player1;
    }

    function checkWin(symbol) {
        return WINNING_COMBOS.some(combination => {
            // combination is a winning combination
            // console.log(combination)
            return combination.every(index => {
                // console.log(cells[index])
                // index is the first index of every array
                // console.log(index)
                return cells[index].classList.contains(symbol);
            })
        })
    }

    function isDraw() {
        return [...cells].every(cell => {
            return cell.classList.contains(player1.symbol) || cell.classList.contains(player2.symbol);
        })
    }

    
    function endGame(draw) {
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!';
        } else {
            winningMessageTextElement.innerText = `${playerTurn.symbol === 'X' ? "X's" : "O's"} wins!`
        }
        winningMessageElement.classList.add('show');
    }

    function handleCellClick(e) {
        e.target.classList.add(playerTurn.symbol);
        e.target.innerText = playerTurn.symbol;
        if (checkWin(playerTurn.symbol)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true)
        } else {
            // if a cell is taken, dont allow user to mark the spot
            if (e.target.innerText != '') {
                e.target.classList.add('taken');
            }
            swapTurns();
        }
    }

})();