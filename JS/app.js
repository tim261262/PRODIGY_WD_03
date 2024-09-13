const cells = document.querySelectorAll(".cell");
const restart = document.querySelector("#restart");
let currentPlayer = "X";
let board = ['','','','','','','','',''];
let isGameActive =  true;
const win = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

function handleCellClick(e){
    const index = e.target.getAttribute("data-value");
    if(board[index] !== '' || !isGameActive) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if(checkWin()){
        alert(`${currentPlayer} wins!`);
        isGameActive = false;
    }else if(board.every(cell => cell !== '')){
        alert('draw!');
        isGameActive = false;
    }else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}
function checkWin(){
    return win.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
})
restart.addEventListener("click", restartGame);