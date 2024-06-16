const gameInfo  = document.querySelector(".game-info");
const ticTac = document.querySelector(".tic-tac-toe");
const newgame = document.querySelector(".btn");
const boxes  = document.querySelectorAll(".box");
// const  = document.querySelector("");
// const  = document.querySelector("");

let currPlayer;
let gameGrid;
const winningPosition =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
// let create a function to initialise the game 
function initGame(){
    currPlayer ="X";
    gameGrid = ["","","","","","","","",""];
    // ui pe bhi empty krna padega
    boxes.forEach((box,index)=>{
      box.innerText="";
      boxes[index].style.pointerEvents = "all";
      // green color ko bhi remove krna hai ,sari css property ko phir se laga do 
      box.classList = `box box${index+1}`;


    })

    newgame.classList.remove("active");
    gameInfo.innerText= `current player - ${currPlayer}`;


}
initGame();
 

function swapTurn(){
  if(currPlayer==="X")
    {
      currPlayer="O";
    }
    else{
      currPlayer="X";
    }
    // update in ui
    gameInfo.innerText=`current player -${currPlayer}`;
}
function checkGameOver(){
   let answer="";
    winningPosition.forEach((position) =>{
      // all three boxes should be non empty and exactly same in value
      if((gameGrid[position[0]] !=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]!==""]) && ((gameGrid[position[0]]=== gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]]) && (gameGrid[position[2]]=== gameGrid[position[0]]) )){
        // check if winner is x
        if(gameGrid[position[0]]==="X")
          {
            answer="X";
          }
          else{
            answer="O";
          }
          // disable pointer events 
          boxes.forEach((box)=>{
            box.style.pointerEvents="none";
          })

          // now we know x/o is winner
          boxes[position[0]].classList.add("win");
          boxes[position[1]].classList.add("win");
          boxes[position[2]].classList.add("win");
      }
    });
    if(answer!==""){
      gameInfo.innerText = `winner player - ${answer}`;
      newgame.classList.add("active");
      return;
    }

    // lets check when there is no winner
    let fillcount=0;
    gameGrid.forEach((box)=>{
      if(box!=="")
        fillcount++;
    })

    // all boxes are non empty then fillcount is 9
    if(fillcount===9)
      {
        gameInfo.innerText="Game Tied !";
        newgame.classList.add("active");
      }
} 
function handleCLick(index){
  if(gameGrid[index]===""){
    boxes[index].innerText=currPlayer;
    gameGrid[index]=currPlayer;
    boxes[index].style.pointerEvents = "none";
    // swap player
    swapTurn();
    // check ki koi jeet toh ni gaya
    checkGameOver();
  }

}


boxes.forEach((box,index)=>{
  box.addEventListener("click",()=>{
    handleCLick(index);
  })
});
newgame.addEventListener("click",initGame);