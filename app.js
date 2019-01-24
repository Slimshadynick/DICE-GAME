/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,gameOn,input,maxScore;
function initialiseGame(){
    document.querySelector("#score-0").textContent=0;
    document.querySelector("#score-1").textContent=0;
    document.querySelector("#current-0").textContent=0;
    document.querySelector("#current-1").textContent=0;
    document.querySelector(".dice").style.display="none";
    scores=[0,0];
    roundScore=[0,0];
    activePlayer=0;
    gameOn=true;
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".player-1-panel").classList.remove("active");
};
initialiseGame();
var lastDice=0;
document.querySelector(".btn-roll").addEventListener("click",function(){
    //1. random number
    if(gameOn){
    var dice=Math.floor(Math.random()*6+1);
    //2. display the result
    var diceImage=document.querySelector(".dice");
    diceImage.style.display="block";
    diceImage.src="dice-"+dice+".png";
    //3. update the score
        if(dice==6&&lastDice==6)
        {
         scores[activePlayer]=0;
         document.querySelector("score-"+activePlayer).textContent=0;
         roundScore[activePlayer]=0;
            document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
            if(activePlayer==0)
                activePlayer++;
            else
                activePlayer--;
            document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");
        }
    else if(dice!=1){
        roundScore[activePlayer]+=dice;
        document.getElementById("current-"+activePlayer).textContent=roundScore[activePlayer];
    }
    else
    {
        roundScore[activePlayer]=0;
        document.getElementById("current-"+activePlayer).textContent=roundScore[activePlayer];
        document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
        if(activePlayer==0)
            activePlayer++;
        else
            activePlayer--;
        document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");

    }
    lastDice=dice;
    }
})
document.querySelector(".btn-hold").addEventListener("click",function(){
    if(gameOn){
    scores[activePlayer]+=roundScore[activePlayer];
    roundScore[activePlayer]=0;
        input=document.querySelector(".final-score").value;
        console.log(input);
        if(input)
            maxScore=input;
        else
            maxScore=20;
    document.getElementById("current-"+activePlayer).textContent=0;
    document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
    document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
    if(scores[activePlayer]>=maxScore){
        document.getElementById("name-"+activePlayer).textContent="WINNER!";
        gameOn=false;
    }
    if(activePlayer==0)
        activePlayer++;
    else
        activePlayer--;
    document.querySelector(".player-"+activePlayer+"-panel").classList.add("active");
    }
})
document.querySelector(".btn-new").addEventListener("click",initialiseGame);