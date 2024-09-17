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

// Play

const cells = document.querySelectorAll(".cell");
const restart = document.querySelector("#restart");

let board = ['','','','','','','','',''];
let isGameActive = true;
let isPlayerTurn = true;
let currentPlayer = 'X';
const winGame = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function getQueryParam(param){
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = new URLSearchParams(url.search);
    return params.get(param);
}

function userClick(e){
    const index = e.target.getAttribute("data-value");
    if(board[index] !== "" || !isGameActive) return;
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    makeMove(index, currentPlayer);
    if(checkWin()){
        alert(`${currentPlayer} Won!`);
        isGameActive = false;
    }else if(board.every(cell => cell !== "")){
        alert("Draw!");
        isGameActive = false;
    }else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
    }
}

function makeMove(index, player){
    board[index] = player;
    cells[index].textContent = player;
}

function checkWin(){
    return winGame.some(combination =>{
        return  combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame(){
    board = ['','','','','','','','',''];
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = 'X';
    isGameActive = true;
    // to determine who the starter is in the second game of player vs cpu
    const gameMode = getQueryParam('vs');
    setTimeout(() => {
        if(gameMode === 'cpu'){
            let starter = Math.floor(Math.random() * 10) + 1;
            if(starter % 2 === 0){
                isPlayerTurn = true;
                alert("You are the Starter");
            }else{
                alert("AI is the Starter");
                setTimeout(() => {
                    let cpuMove = getCpuMove();
                    makeMove(cpuMove, currentPlayer);
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    isPlayerTurn = true;
                }, 700);
            }
        }
    }, 100);
}



function playVsCpu(e){
    let index = e.target.getAttribute("data-value");
    if(board[index] !== '' || !isGameActive || !isPlayerTurn) return;
    makeMove(index, currentPlayer);
    if(checkWin()){
        setTimeout(() => {
            alert(`Player has Won the  Game!`);
        }, 200);
        isGameActive = false;
        return;
    }
    if (board.every(cell => cell !== '')){
        setTimeout(() => {
            alert("Draw!");
        }, 200);
        isGameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    isPlayerTurn = false;
    setTimeout(() => {
        let cpuMove = getCpuMove();
    makeMove(cpuMove, currentPlayer);
    if(checkWin()){
        setTimeout(() => {
            alert(`AI has Won the Game!`);
        }, 200);
        isGameActive = false;
    }else if(board.every(cell => cell !== '')){
        setTimeout(() => {
            alert("Draw!");
        }, 200);
        isGameActive = false;
    }else{
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        isPlayerTurn = true;
    }
    }, 700)
}

function getCpuMove(){
    let avaliableSpot = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    return avaliableSpot[Math.floor(Math.random() * avaliableSpot.length)];
}

if(show){
    show.addEventListener("click", showPopUp);
    hide.addEventListener("click", hidePopUp);
}
if(cells){
    const gameMode = getQueryParam('vs');
    if(gameMode === 'player'){
        cells.forEach(cell => {
            cell.addEventListener("click", userClick);
        });   
    }else if(gameMode === 'cpu'){
        let starter = Math.floor(Math.random() * 10) + 1;
        if(starter % 2 === 0){
            alert("You are the Starter!");
            cells.forEach(cell => {
                cell.addEventListener("click", playVsCpu);
            });
        }else{
            alert("AI is the Starter");
            let cpuMove = getCpuMove();
            makeMove(cpuMove, currentPlayer);
            currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
            cells.forEach(cell => {
                cell.addEventListener("click", playVsCpu);
            });
        }
        restart.addEventListener("click", restartGame);
    }   
}
