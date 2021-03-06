/* main.js
Author: Michael Gutleber
Date: 7/3/2017
Concentration Card Game - basic simulation of the game only with 4 cards: the queen of hearts,
queen of diamonds, king of hearts and king of diamonds. Cards are selected by clicking on them. 
After 2 cards are selected, their ranks are compared. When a match is found, the score is increased 
by 1. If no match is found, the user must press the next turn button to turn the cards back over. To 
reset the score, the user must press the new game button. Note: I took out the alerts as part of
bonus challenge to make the game better and added the next turn and new game buttons, since alerts 
are annoying. I also added a shuffle algorithm to make the card order random.*/

// The cards array holds the 4 cards.
var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

// cardsInPlay represents the cards that have been selected.
var cardsInPlay = [];

// score represents the number of matches found
var score = 0;

var firstCardSelected = null;	// Will hold the image element of the first card selected. Used in 
								// nextTurn to flip the card back over.

var secondCardSelected = null;	// Will hold the image element of the second card selected. Used in 
								// nextTurn to flip the card back over.

var scoreElement = document.getElementsByClassName('score')[0]; // scoreElement is used in  
// updateScore to update the score.

// updateScore takes the new score as a parameter and updates the global score variable, then writes
// the new score to the screen using the textContent property.

var updateScore = function(newScore) {
	score = newScore;
	scoreElement.textContent = score;
}

// flipCard is executed when a card is clicked. It simulates turning the card over. The image is
// changed to the front of the card. The cardsInPlay array gets the card's rank. If this is the
// second card selected, then check for a match. A match occurs when the 2 cards selected have the
// same rank. If this occurs, increase the score by 1 and call updateScore. Clear out the
// cardsInPlay array after the check for a match so that 2 new cards can be selected.

var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src',cards[cardId].cardImage);
	cardsInPlay.push(cards[cardId].rank);
	if (cardsInPlay.length === 2) {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			updateScore(score + 1);
			// alert("You found a match!");
		}
		// else
			// alert("Sorry, try again.");
		cardsInPlay = [];
		secondCardSelected = this;
	}
	else
		firstCardSelected = this;
}

// shuffleCards will use an algorithm from the https://jsperf.com/array-shuffle-comparator/5 web 
// site which I modified to "shuffle" the cards array. Pick a card at random from 0 to the length 
// of the cards array - 2. Swap this card with the last card. Then repeat this process only picking
// a random card from 0 to the length - 3, then 0 to the length - 4 etc. until n = 0 and all the
// cards have been shuffled.

var shuffleCards = function() {
	var n = cards.length;
	var i = 0;
	var temp;
	while (--n) { // Decrease n before checking its truthiness to skip the last case where n === 0.
		i = Math.floor(Math.random() * (n-1));	// Pick a number between 0 and the next to last card.
		// Now swap cards[i] with cards[n].
		temp = cards[i];
		cards[i] = cards[n];
		cards[n] = temp;
	}

}

// createBoard will first shuffle the cards array, then create the number of cards in the cards 
// array as image elements and append them to the div element with the id of "game-board." All 
// cards will initially have their backs showing. The data-id attribute holds the index in the 
// cards array and is used in the flipCard function to get the cards face image.

var createBoard = function() {
	shuffleCards(); // Mix up the cards array
	var l = cards.length;
	var cardElement;
	for (var i = 0; i < l; i++) {
		cardElement = document.createElement('img');
		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id',i);
		cardElement.addEventListener('click',flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

// nextTurn will change the 2 selected card images to the back of the cards.

var nextTurn = function() {
	if (firstCardSelected) // Make sure the first card was selected.
		firstCardSelected.setAttribute('src','images/back.png');
	if (secondCardSelected) // Make sure the second card was selected.
		secondCardSelected.setAttribute('src','images/back.png');
	firstCardSelected = secondCardSelected = null;
	// Clear out cardsInPlay so that 2 cards may be selected again
	cardsInPlay = [];
}

// newGame will remove all the cards from the game-board, then re-create the game-board. This is
// necessary so that the cards can be shuffled into a new order.

var newGame = function() {
	// Make sure all the cards are turned over
	var divGameBoard = document.getElementById("game-board");
	var divChild = divGameBoard.firstChild;
	while (divChild !== divGameBoard.lastChild) {
		divChild.setAttribute('src','images/back.png');
		divChild = divChild.nextSibling;
	}
	divChild.setAttribute('src','images/back.png'); // Now set the last child image
	shuffleCards();	// Now mix up the cards array
	firstCardSelected = secondCardSelected = null;	// Reset for new game
	// Clear out cardsInPlay so that 2 cards may be selected again
	cardsInPlay = [];
	updateScore(0); // reset the score to 0
}

createBoard(); // Shuffle the cards and create the board

// Set the Next Turn button to execute nextTurn when clicked.
document.getElementById("next turn").addEventListener('click',nextTurn);

// Set the New Game button to execute newGame when clicked.
document.getElementById("new game").addEventListener('click',newGame);
