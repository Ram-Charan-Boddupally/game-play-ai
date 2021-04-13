var selectedElement = 0;
var cells = document.getElementsByClassName('cell');
var numCells = document.getElementsByClassName('num-container-element');
var board = new Array(81);
var nonEmptyIndices = [];
let selectedBoard;
var availableBoards = [{probBoard: '070000009510420600080300700008001370023080040400900100962800030000010400700203096',
                         solBoard: '374168259519427683286395714698541372123786945457932168962874531835619427741253896'},
                       {probBoard: '305402060490760108600103245003900580960058703081304092050601400200549070149007306',
                         solBoard: '315482967492765138678193245723916584964258713581374692857631429236549871149827356'},
                       {probBoard: '005007000000000902701209600950080300020036000007005010000600059530090000000150260',
                         solBoard: '295367184643518972781249635954781326128436597367925418412673859536892741879154263'},
                       {probBoard: '004079630007530008023000000060050000300600801900001300000000015800203070709000000',
                         solBoard: '584179632697532148123846597461358729372694851958721364236987415845213976719465283'},
                       {probBoard: '000000200080007090602000500070060000000901000000020040005000603090400070006000000',
                         solBoard: '957613284483257196612849537178364952524971368369528741845792613291436875736185429'}
                      ];

function start(){
    for(let i=0;i<numCells.length;i++){
        numCells[i].addEventListener('click',getElement);
    }
    selectedElement = 0;

    selectedBoard = Math.floor(Math.random()*availableBoards.length);
    for(let i=0;i<81;i++){
        cells[i].addEventListener('click',setElement);
        cells[i].style.removeProperty('background-color');
        if(availableBoards[selectedBoard].probBoard[i] === '0'){
            board[i] = '';
            cells[i].innerHTML = cells[i].id;
            continue;     
        }
        nonEmptyIndices.push(i);
        board[i] = availableBoards[selectedBoard].probBoard[i];
        cells[i].innerHTML = cells[i].id;
    }   
}
console.log(cells[73]);
console.log(cells[74]);

function is_changable(id){
    for (let i = 0; i < nonEmptyIndices.length; i++) {
        if(nonEmptyIndices[i] == id){
            return false;
        }   
    }
    return true;  
}

function setElement(event){
    if(selectedElement == 0){
        alert('select element from container');
    }
    let id = parseInt(event.target.id.substring(1));
    
    if(is_changable(id)){
        if(is_verified(id,selectedElement)){
            event.target.innerHTML = selectedElement;
            board[id] = selectedElement; 
        }
    }else{
        alert('cannot change the element');
    }    
}

function getElement(event){
    if(selectedElement != 0){
        if(event.target.classList.contains('selected')){
            event.target.classList.remove('selected');
            selectedElement = 0;
        }else{
            for(let i=0;i<numCells.length; i++){
                if(numCells[i].classList.contains('selected')){
                    numCells[i].classList.remove('selected');
                    selectedElement = 0;
                }               
            }
            event.target.classList.add('selected');
            selectedElement = event.target.id;
        }    
    }else{
        event.target.classList.add('selected');
        selectedElement = event.target.id;
    }
}

function set_wrong(element,locationId){
    console.log("id : "+locationId);
    document.getElementById(element).style.backgroundColor = 'red';
    document.getElementById(locationId).style.backgroundColor = 'red';
    setTimeout(function(){
        document.getElementById(element).style.removeProperty('background-color');
        document.getElementById(locationId).style.removeProperty('background-color');    
    },500);
}

function is_verified(locationId,element){
    //location id shoud be index of the array changed on 12/4/21
    let id = parseInt(locationId);
    let col = id % 9; // reminder gives the col
    let row = (Math.floor(id / 9)); //quotient gives the row index

    //checks if a row contains the same number
    for(let i=row;i<=row+8;i++){
        if(i == id){
            continue;
        }
        if(board[i] == element){
            set_wrong(element,'b'+locationId);
            return false;
        }
    }
    //checks if the column contains the same number
    for(let i=col;i<=row+72;i+=9){
        if(i == id){
            continue;
        }
        if(board[i] == element){
            set_wrong(element,'b'+locationId);
            return false;
        }
    }
    //checks for the sub square contains the same number or not

    let boxStartId = (((Math.floor(id/3))*3) - (((id/9)%3)*9));    
    for(let i = boxStartId;i<=boxStartId+3;i++){
            if(i == id){
                continue;
            }if(board[i] == element){
                set_wrong(element,'b'+locationId);
                return false;
            }
        let boxColStartId = i;
        for(let j=i;j<=boxColStartId+18;j+=9){
            if(j == id){
                continue;
            }
            if(board[j] == element){
                set_wrong(element,'b'+locationId);
                return false;
            }
        }
    }
    return true;
}

function aiPlay(){
    document.getElementsByTagName('h1').innerHTML = 'Processing';
    probSolver(board);
}

let possibleValues = [1,2,3,4,5,6,7,8,9];

function probSolver(newBoard){

    if(completed(newBoard)){
        console.log("completed");
        for(let i=0;i<81;i++){
            if(!is_changable(i)){
                cells[i].innerHTML = newBoard[i];
                cells[i].style.backgroundColor = 'green';
                if(newBoard[i] != availableBoards[selectedBoard].solBoard[i]){
                    cells[i].style.backgroundColor = 'red';
                }        
            }
        }
        return true;
    }

    for(let i=0;i<81;i++){
        if(newBoard[i] == ''){
            for (let value=0; value<possibleValues.length;value++){
                let key = possibleValues[value];
                if(is_verified(i,key)){
                    newBoard[i] = key;
                    let result = probSolver(newBoard);
                    if(result == false){
                        newBoard[i] ='';
                    }else{
                        return true;
                    }        
                }
            }
        }
    }
    return false;
}

function completed(newBoard){
    for(let i=0;i<81;i++){
        if(newBoard[i] == ''){
            return false;
        }
    }
    return true;
}