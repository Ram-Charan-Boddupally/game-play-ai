let cells = document.querySelectorAll('.cell');
let elements = document.getElementsByClassName('select');
let selectedElementId;
let selectBlock = document.getElementById('selected-item');
let board = new Array(cells.length);
let LEFT = -1, RIGHT = +1, UP = -15, DOWN = +15;
let startIndex,goalIndex;
//to remove the first elem

function start(){
    selectedElementId = -1;
    for(let i=0;i<cells.length;i++){
        cells[i].addEventListener('click',setElement);
        cells[i].classList.add('wall-block');
        board[i] = 'X';
        cells[i].innerText = '';
    }
    for(let i=0;i<elements.length;i++){
        elements[i].addEventListener('click',getElement);
    }
}
start();

function getElement(event){
    if(selectedElementId != -1){       
        selectBlock.classList.remove(selectedElementId+'-block');
     }
    selectedElementId = event.target.id;
    selectBlock.classList.add(selectedElementId+'-block');
}

function setElement(event){
    if(selectedElementId == -1){
        alert('select element from container');
        return;
    }else if(selectedElementId == 'start'){
        startIndex = event.target.id;
        startIndex = startIndex.substring(1);
        check('start-block');
    }else if(selectedElementId == 'end'){
        goalIndex = event.target.id;
        goalIndex = goalIndex.substring(1);
        check('end-block');
    }
    if(event.target.classList.length > 1){
        event.target.classList.remove(event.target.classList[1]);
    }
    event.target.classList.add(selectBlock.classList[1]);    
    let id = event.target.id;
    id = id.substring(1)
    board[id] = boardElement(selectedElementId+'-block');
}

function boardElement(selectedElementId){
    if(selectedElementId == 'wall-block'){
        return 'X';
    }else if(selectedElementId == 'free-block'){
        return '';
    }else if(selectedElementId == 'start-block'){
        return 'A';
    }else if(selectedElementId == 'end-block'){
        return 'B';
    }
}
function check(classTag){
    for(let i=0;i<cells.length;i++){
        if(cells[i].classList.contains(classTag)){
            cells[i].classList.remove(classTag);
            cells[i].classList.add('free-block');
            board[i] = '';
            break;
        }
    }
}

function getIndex(){
    console.log(cells.length)
    let newBoard = new Array(cells.length);
    for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = boardElement(cells[i].classList[1]);
    }
    for (let i = 0; i < newBoard.length; i++) {
        console.log(newBoard[i]);
    }
}

obc ={
       currentNode:-1,
       nextNode:-1
  };

function getParent(node,exploredNodes){
    for(let i=0;i<exploredNodes.length;i++){
        if(i == node.parentIndex){
            return exploredNodes[i];
        }
    }
    return false;
}

function printPath(path){
    for(i=0;i<path.length-1;i++){
        console.log(cells[path[i]])
        cells[path[i]].style.backgroundColor = 'blue';
    }
}

class createObjectNode {
    constructor(presentNodeIndex, parentNodeIndex, parentIndex) {
        this.presentNodeIndex = presentNodeIndex;
        this.parentNodeIndex = parentNodeIndex;
        this.parentIndex = parentIndex;
    }
}

function solveMazeBFS(){
    let frontier = [],exploredSet = [];
    let path=[],exploredNodes=[];
    let i=0;
    var node = new createObjectNode(parseInt(startIndex),-1,-1);
    frontier.push(node);
    while(frontier.length > 0){
        let itemNode = frontier.shift();
        exploredNodes.push(itemNode);
        if(cells[itemNode.presentNodeIndex].innerText != 'A' || cells[itemNode.presentNodeIndex].innerText != 'B'){
            cells[itemNode.presentNodeIndex].style.backgroundColor = 'darkkhaki'; 
        }
        if(itemNode.presentNodeIndex == goalIndex){
            let nodeParent = itemNode;
            while(nodeParent.parentIndex != -1){
                nodeParent = getParent(nodeParent,exploredNodes);
                path.push(nodeParent.presentNodeIndex);
            }            
            printPath(path);
            return;
        }else{
            let moves = getMoves(itemNode.presentNodeIndex);
            moves.forEach((element) => {
                element += itemNode.presentNodeIndex;
                if(board[element] !='X'){
                    if(checkFrontirier(frontier,exploredSet,element)){
                        var newNode = new createObjectNode(element,itemNode.presentNodeIndex,i);                   
                        frontier.push(newNode);
                    }
                }
            });
            i+=1;
        }
    }
    if(frontier.length == 0){
        alert("no solution");
    }
}

function checkFrontirier(frontier,exploredSet,element){
    let fFound = true, eFound = true;
    for(let i=0;i<frontier.length;i++){
        if(frontier[i].presentNodeIndex == element){
            fFound = false;
            break;
        }
    }

    for(let i=0;i<exploredSet.length;i++){
        if(exploredSet[i].presentNodeIndex == element){
            eFound = false;
            break;
        }
    }
    
    return (fFound && eFound);
}
function getMoves(index){
    let possible = [];
    if(index == 0 || index == 14){
        possible.push(DOWN);
        if(index == 0){ 
            possible.push(RIGHT);
        }else {
            possible.push(LEFT);
        }
        return possible;
    }else if(index == 150 || index == 164){
        possible.push(UP);
        if(index == 150){
            possible.push(RIGHT);
        }else{
             possible.push(LEFT);
        }
        return possible;
    }

    if(Math.floor(index/14) == 0 || Math.floor(index/14) == 10){
        possible.push(RIGHT);
        possible.push(LEFT);
        if(Math.floor(index/14) == 0){
            possible.push(DOWN);
        }else{
            possible.push(UP);
        }
        return possible;
    }else if(index % 15 == 0 || index % 15 == 14){
        possible.push(UP);
        possible.push(DOWN);
        if(index % 15 == 0){
            possible.push(RIGHT);
        }else{
            possible.push(LEFT);
        }
        return possible;
    }
    possible.push(UP,RIGHT,DOWN,LEFT);
    return possible
}