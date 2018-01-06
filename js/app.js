var scores, roundScore, activePlayer, gamePlay, winningScore;

const rollButton = document.querySelector('.btn-roll');


init();

rollButton.addEventListener('click', function () {
    if (gamePlay) {
        //random number
        var dice1 = Math.floor(Math.random() * 6) + 1; //random number from 1 to 6
        var dice2 = Math.floor(Math.random() * 6) + 1; //random number from 1 to 6
        console.log(dice1);
        console.log(dice2);

        //display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = '../images/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = '../images/dice-' + dice2 + '.png';
        //Set the Global score to 0 if hit 6 two times in a row

        //Update the round score if the rolled number was not 1
        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

    }
});

const buttonHold = document.querySelector('.btn-hold');

buttonHold.addEventListener('click', function () {
    if (gamePlay) {
        //Add current score to global score 
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        //Undefinied,0,null or empty string are false
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        //Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlay = false;

        } else {
            //Next player;
            nextPlayer();
        }
    }

});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');



    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

const btnNew = document.querySelector('.btn-new');

btnNew.addEventListener('click', init);

function init() {
    scores = [0, 0]; //vector cu scoruile celor 2 jucatori
    roundScore = 0;
    activePlayer = 0;
    gamePlay = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');


}
