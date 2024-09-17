// popup
const show = document.querySelector(".show");
const popUp = document.querySelector(".popup");
const hide = document.querySelector(".hide");

function showPopUp(){
    popUp.style.display = "block";
    show.style.display = "none";
}

function hidePopUp(){
    popUp.style.display = "none";
    show.style.display = "block";
}


// play
const cells = document.querySelectorAll(".cell");
const restart = document.querySelector("#restart");

let currentPlayer = "X";
let board = ['','','','','','','','',''];
let isGameActive =  true;
const win = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6],
    [1,4,7], [2,5,8], [0,4,8], [2,4,6]
];

function getQueryParams(param){
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return params.get(param)
}


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
function playAgainstCPU(e){
    const index = e.target.getAttribute("data-value");
    let ai = Math.floor(Math.random()*8)+1;
    if(board[index] !== '' || !isGameActive) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
}



if(show){
    show.addEventListener("click", showPopUp);
    hide.addEventListener("click", hidePopUp);
}else{
    const vs = getQueryParams('vs');
    if(vs === "player"){
        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        })
       
    }else if(vs === "cpu"){
        let starter = Math.floor(Math.random()*10)+1;
        if(starter % 2 === 0){
            alert("You are the Starter");
            cells.forEach((cell) => {
                cell.addEventListener("click", playAgainstCPU);
            })
        }else{
            alert("AI is the Starter");
            cells.forEach((cell) => {
                cell.addEventListener("click", playAgainstCPU);
            })
        }
        
        
    }
    restart.addEventListener("click", restartGame);
  }

