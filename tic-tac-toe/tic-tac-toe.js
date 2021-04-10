let humanPlayer= 'X';
let aiPlayer = 'O';
var board = new Array(9);

var cells = document.querySelectorAll('.board-cell');

function start(){
    for(let i=0; i < cells.length; i++){
        cells[i].addEventListener('click',play);
        cells[i].style.removeProperty('background-color');
        cells[i].innerHTML = '';
        board[i] = '';
    }
     document.getElementById('winner').style.display = 'none';    
}

start();

function play(event){
    if(event.target.innerHTML != ''){
        alert('invalid move');
        return;    
    }
    event.target.innerHTML = humanPlayer;
    board[event.target.id] = humanPlayer;
    if(is_winner(board,humanPlayer)){
        document.getElementById('winner').style.display = 'inline';
        document.getElementById('winner').innerHTML = 'YOU WON';
        document.getElementById('winner').style.backgroundColor = 'green';
        gameOver();
        return;
    }else if(check_tie(board)){
        document.getElementById('winner').style.display = 'inline';
        document.getElementById('winner').innerHTML = 'MATCH TIE';
        document.getElementById('winner').style.backgroundColor = 'yellow';
        gameOver();
        return;
    }
    var aiMove = minimax(board,aiPlayer).index;
    cells[aiMove].innerHTML = aiPlayer;
    board[aiMove] = aiPlayer;
    if(is_winner(board,aiPlayer)){
        document.getElementById('winner').style.display = 'inline';
        document.getElementById('winner').innerHTML = 'YOU LOSS';
        document.getElementById('winner').style.backgroundColor = 'red';
        gameOver();
        return;
    }else if(check_tie(board)){
        document.getElementById('winner').style.display = 'inline';
        document.getElementById('winner').innerHTML = 'tie';
        document.getElementById('winner').style.backgroundColor = 'yellow';
        gameOver();
        return;
    }
}


// function minimax(newBoard, player) {
	

// 	if (is_winner(newBoard, humanPlayer)) {
// 		return  -10;
// 	} else if (is_winner(newBoard, aiPlayer)) {
// 		return  10;
// 	} else if (check_tie(newBoard)) {
// 		return  0}
// 	}

//     var moves = [];
//     for(i=0;i<board.length;i++){
//         if(board[i] == ''){
//             var move = {};
//             move.index = i;
//             newBoard[i] = player;

//             if (player == aiPlayer) {
//                 var result = minimax(newBoard, humanPlayer);
//                 move.score = result.score;
//             } else {
//                 var result = minimax(newBoard, aiPlayer);
//                 move.score = result.score;
//             }

//             newBoard[i] = '';

//             moves.push(move);
//         }
//         }

// 	var bestMove;
// 	if(player === aiPlayer) {
// 		var bestScore = -10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score > bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = moves[i].index;
//                 console.log("maximizer player : "+" score : "+bestScore+" best move : "+bestMove+" i value : "+i);
// 			}
// 		}
// 	}else {
// 		var bestScore = 10000;
// 		for(var i = 0; i < moves.length; i++) {
// 			if (moves[i].score < bestScore) {
// 				bestScore = moves[i].score;
// 				bestMove = moves[i].index;
//                 console.log("manimizing player : "+" score : "+bestScore+" best move : "+moves[i].index+" i value : "+i);
// 			}
// 		}
// 	}
// 	return bestMove;
// }


function minimax(newBoard,player){

    if(is_winner(newBoard,humanPlayer)){
        return {score: -10};
    }else if(is_winner(newBoard,aiPlayer)){
        return {score: +10};
    }else if(check_tie(board)){
        return {score: 0};
    }

    let allMoves = [];
    for(let i=0;i<newBoard.length;i++){
        if(newBoard[i]==''){
            let move = {}
            move.index = i;
            newBoard[i] = player;

            if(player == aiPlayer){
                let resultScore = minimax(newBoard,humanPlayer).score;
                move.score = resultScore;
            }else{
                let resultScore = minimax(newBoard,aiPlayer).score;
                move.score = resultScore;
            }
            newBoard[i] = '';
            allMoves.push(move);
        }
    }
    
    //ai is maximizzing player
    //human is minimizing player
    var bestMove;
    if(player == aiPlayer){
        let maxScore = -1000;
        for(let i=0;i<allMoves.length;i++){
            if(allMoves[i].score > maxScore){
                maxScore = allMoves[i].score;
                bestMove = i;
            }
        }
    }else{
        let minScore = +1000;
        for(let i=0;i<allMoves.length;i++){
            if(allMoves[i].score < minScore){
                minScore = allMoves[i].score;
                bestMove = i;
            }
        }
    }
    return allMoves[bestMove];
}  

function check_tie(board){
    let tie = true;
    for(let i=0;i<board.length;i++){
        if(board[i]==''){
            tie = false;
            return tie;
        }
    }
    return tie;
}

function gameOver(){
    for(let i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',play);
    }
}

function is_winner(board,player){
    let won = false;
    
    if(board[0] == player && board[0] == board[4] && board[4] == board[8]){
        won = true;
        return won;
    }else if(board[2] == player && board[2] == board[4] && board[4] == board[6]){
        won = true;
        return won;
    }

    for(let i=0;i<=6; i+=3){
        if(board[i] == player && board[i] == board[i+1] && board[i+1] == board[i+2]){
             won = true;
             return won;
        }
    }
    for(let i=0;i<=3; i+=1){
        if(board[i] == player && board[i] == board[i+3] && board[i+3] == board[i+6]){
             won = true;
             return won;
        }
    }
    return won;
}