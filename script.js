const cells = document.querySelectorAll('.cell');  
const board = document.getElementById('board');  
const restartButton = document.getElementById('restart');  
let currentPlayer = 'X';  
let gameState = ['', '', '', '', '', '', '', '', ''];  
let gameActive = true;  

const winningConditions = [  
    [0, 1, 2],  
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7],  
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]  
];  

function handleCellClick(event) {  
    const clickedCell = event.target;  
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));  

    if (gameState[clickedCellIndex] !== '' || !gameActive) {  
        return;  
    }  

    gameState[clickedCellIndex] = currentPlayer;  
    clickedCell.innerHTML = currentPlayer;  

    checkWinner();  
}  

function checkWinner() {  
    for (let i = 0; i < winningConditions.length; i++) {  
        const [a, b, c] = winningConditions[i];  
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {  
            continue;  
        }  

        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {  
            alert(`Player ${currentPlayer} wins!`);  
            gameActive = false;  
            return;  
        }  
    }  

    if (!gameState.includes('')) {  
        alert('It\'s a draw!');  
        gameActive = false;  
    }  

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
}  

function restartGame() {  
    gameState = ['', '', '', '', '', '', '', '', ''];  
    gameActive = true;  
    currentPlayer = 'X';  
    cells.forEach(cell => {  
        cell.innerHTML = '';  
    });  
}  

cells.forEach(cell => {  
    cell.addEventListener('click', handleCellClick);  
});  

restartButton.addEventListener('click', restartGame);