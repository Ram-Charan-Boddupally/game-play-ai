var board = [[0,0,0],
             [0,0,0],
             [0,0,0]];

var humanPlayer = 'X';
var computerPlayer ='O';

//human in maxizmizing palyer , retrivies score of +1 || 0
//computer is minimizing player , retrivies score of -1 || 0

function getBoard(){
    let boardValues = document.getElementsByClassName('board-element');
    let k=0;
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(boardValues[k].textContent === ''){
                board[i][j] = "";
                k++;
                continue;
            }
            board[i][j] = boardValues[k].textContent;
            k++;
        }
    }
}

function is_terminalState(board){
    terminalState = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(board[i][j] === ''){
                terminalState = false;
            }
        }
    }
}

function evaluator(player){
    if(player == humanPlayer){
        return +1;
    }else{
        return -1;
    }
}

function evaulationScore(board){
//for diagonal winner checking
    if (board[0][0] != '' && board[0][0] == board[1][1] && board[1][1] == board[2][2]){
        player = board[0][0];
        console.log("diagonal1");
        document.getElementById('winner').innerHTML = player + "WON";
        return evaluator(player);
    }
    if (board[0][2] != '' && board[0][2] == board[1][1] && board[1][1] == board[2][0]){
        player = board[0][0];
        console.log("diagonal2");
        document.getElementById('winner').innerHTML = player + "WON";
        return evaluator(player);
    }
//for row wise selection
    for(let i=0;i<3;i++){
        if(board[i][0] != '' && board[i][0] == board[i][1] && board[i][1]== board[i][2]){
            player = board[i][0];
            console.log("row"+i);
            document.getElementById('winner').innerHTML = player + "WON";
            return evaluator(player);
        }
    }
//for column wise selection
    for(let i=0;i<3;i++){
        if(board[0][i] != '' && board[0][i] == board[1][i] && board[1][i] == board[2][i]){
            player = board[0][i];
            console.log("column"+i);
            document.getElementById('winner').innerHTML = player + "WON";
            return evaluator(player);
        }
    }
    return 0;
}

function elementIdVerifier(bestMove){
    if(bestMove.row == 0 && bestMove.col == 0){
        return 'b1';
    }else if(bestMove.row == 0 && bestMove.col == 1){
        return 'b2'
    }else if(bestMove.row == 0 && bestMove.col == 2){
        return 'b3'
    }else if(bestMove.row == 1 && bestMove.col == 0){
        return 'b4'
    }else if(bestMove.row == 1 && bestMove.col == 1){
        return 'b5'
    }else if(bestMove.row == 1 && bestMove.col == 2){
        return 'b6'
    }else if(bestMove.row == 2 && bestMove.col == 0){
        return 'b7'
    }else if(bestMove.row == 2 && bestMove.col == 1){
        return 'b8'
    }else if(bestMove.row == 2 && bestMove.col == 2){
        return 'b9'
    }
}

function move(selector){
    var bestMove = new Object();
    let element = document.getElementById(selector);
    if(element.innerHTML != ''){
        alert('invalid move');
        return;
    }
    element.innerHTML = humanPlayer;
    getBoard();
    let score = evaulationScore(board);
    if(score == +1){
        alert("YOU WON");
    }
    bestMove = computerPlay();
    score = evaulationScore(board);
    if(score == -1){
        alert("COMPUTER WON");
    }
    computerElementId = elementIdVerifier(bestMove);
    document.getElementById(computerElementId).innerHTML = computerPlayer;
    console.log(bestMove);
}

function computerPlay(){
    bestMove = { row:-1 , col:-1};
    let bestMoveScore = -1000;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if(board[i][j] === ''){
                board[i][j] = computerPlayer;
                moveScore = minimax(board,0,false);
                board[i][j] = '';
                if(moveScore >= bestMoveScore){
                    bestMove.row = i;
                    bestMove.col = j;
                    bestMoveScore = moveScore;
                }
            }
        }
    }
    return bestMove;
}

function minimax(board,depth,isMaximizer){

    console.log("depth : "+depth);
    let score = evaulationScore(board);
     
    if(score == 1 || score == -1){
        return score;
    }else if(score == 0){
        if(is_terminalState(board)){
            return 0;
        }
    }

    if(isMaximizer){
        let maxValue = -1000;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(board[i][j] === ''){
                    board[i][j] = humanPlayer;
                    console.log("maximizer");
                    let score = minimax(board,depth+1,false);
                    maxValue = maxValue > score ? maxValue : score;
                    board[i][j] = ''; 
                }
            }
        }
        return maxValue;
    }
    else{
        let minValue = +1000;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if(board[i][j] === ''){
                    board[i][j] = computerPlayer;
                    console.log("minimizer");
                    let score = minimax(board,depth+1,true);
                    minValue = minValue < score ? minValue : score;
                    board[i][j] = ''; 
                }
            }
        }
        return minValue;
    }
}


// function turnCalc(board) {
//     let emptyBlocks = 0, humanPlayerMoves = 0,computerPlayerMoves = 0;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if(board[i][j] === ''){
//                 emptyBlocks++;
//             }else if(board[i][j] === humanPlayer){
//                 humanPlayerMoves++;
//             }else if(board[i][j] === computerPlayer){
//                 computerPlayerMoves++;
//             }
//         }
//     }
//     if(emptyBlocks == 9){
//         document.getElementById('turn-notifier').innerHTML = 'HUMAN PLAYER'
//         return humanPlayer;
//     }
//     if(emptyBlocks == 0){
//         document.getElementById('turn-notifier').innerHTML = 'no moves'
//         return 'noMoves'
//     }else if(humanPlayerMoves >computerPlayerMoves){
//         document.getElementById('turn-notifier').innerHTML = 'HUMAN PLAYER'
//         return humanPlayer;
//     }else{
//         document.getElementById('turn-notifier').innerHTML = 'COMPUTER PLAYER'
//         return computerPlayer;
//     }
// }
