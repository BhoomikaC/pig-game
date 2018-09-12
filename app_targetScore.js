/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 or two 6s in a row, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 50 points on GLOBAL score wins the game

*/


var score, roundScore, gamePlaying, activePlayer;
var prevDice = 0;
// Initialize the screen
init();

// Roll Dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        // Generate random number
        var dice =  Math.floor(Math.random()*6) + 1 ;
        
        // Change the dice according to number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //if two sixes in a row
        if(dice === 6 && prevDice === 6){
            prevDice = 0;
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
            changePlayer();
        }
        else if(dice === 1){
           changePlayer();
        }
        else{
            roundScore += dice;
            // update round score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  
            prevDice = dice;
        }
          
    }
   
});

//Hold
document.querySelector('.btn-hold').addEventListener('click', function(){
   
    if(gamePlaying){
        var target = document.querySelector('.target-score').value;
        var finalTarget;
        target == 0 ? finalTarget = 50 : finalTarget = target;
        
        //copy score to board
        score[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

       //Winner
        if(score[activePlayer] >= finalTarget){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        } 
        else{
            //player change
            changePlayer(); 
        }
        
    }
    
    
});

//New Game
document.querySelector('.btn-new').addEventListener('click', init);


function changePlayer(){
        //change score to zero
        document.querySelector('#current-' + activePlayer).textContent = '0';
        roundScore = 0;
        
        //Change the player 
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0 ;
        
        //Remove Dice
        document.querySelector('.dice').style.display = 'none';   
          
}

function init(){
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = 'true';
    
    // Initialize
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');

    //Remove Dice
    document.querySelector('.dice').style.display = 'none';
}


