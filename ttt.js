const ga= document.querySelectorAll(".ge");
const inf = document.querySelector("#inf");
const reset= document.querySelector("#reset");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer= "X";
let running="false";

initialise();

function initialise(){
    ga.forEach(ge=>ge.addEventListener("click", geclick));
    reset.addEventListener("click", restart);
    inf.textContent= `${currentPlayer}'s turn`;
    running=true;
}
function geclick(){
    const cellIndex=this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updatege(this, cellIndex);
    changePlayer();
    checkWinner();
 
}
function updatege(ge, index){
    options[index]=currentPlayer;
    ge.textContent=currentPlayer;

}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    inf.textContent=`${currentPlayer}'s turn`;

}
function ncp(){
    const ncp1 = (currentPlayer == "X") ? "O" : "X";
    inf.textContent = `${ncp1} is the winner`;
}


function checkWinner(){
    let won=false;

    for(let i=0; i<winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
    

    if(cellA == "" || cellB == "" || cellC == ""){
        continue;
    }
    if(cellA == cellB && cellB == cellC){
        won=true;
        break;
    }
    }
    if(won){
        ncp();
        running=false;
    }
    else if(!options.includes("")){
        inf.textContent=`draw`;
        running=false;
    }
    /*else{
        changePlayer();
    }*/

}
function restart(){
    options=["", "", "", "", "", "", "", "", ""];
    inf.textContent=`X's turn`;
    ga.forEach(ge=>ge.textContent="");
    running=true;
}