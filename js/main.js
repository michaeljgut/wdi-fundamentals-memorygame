/* main.js
Author: Michael Gutleber
Date: 7/3/2017
Concentration Card Game - basic simulation of the game only with 4 cards: the queen of hearts,
queen of diamonds, king of hearts and king of diamonds. Cards are selected by clicking on them. 
After 2 cards are selected, their ranks are compared. When a match is found, the score is increased 
by 1. If no match is found, the user must press the reset button to turn the cards back over. To 
reset the score, the screen must be refreshed. */

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

// updateScore takes the new score as a parameter and updates the global score variable, then writes
// the new score to the screen using the textContent property.

var updateScore = function(newScore) {
	score = newScore;
	document.getElementById('score').textContent = score;
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
			updateScore(++score);
		}
		cardsInPlay = [];
	}
}

// createBoard will create the number of cards in the cards array as image elements and append them
// to the div element with the id of "game-board." All cards will initially have their backs
// showing. The data-id attribute holds the index in the cards array and is used in the flipCard
// function to get the cards face value.

var createBoard = function() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id',i);
		cardElement.addEventListener('click',flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

// resetGame will go through all the card images and set them to the back of the cards.

var resetGame = function() {
	var div = document.getElementById('game-board');
	var child = div.firstChild;
	while (child !== div.lastChild) {
		child.setAttribute('src','images/back.png');
		child = child.nextSibling;
	}
	// Set the attribute for the last card
	child.setAttribute('src','images/back.png');
	// Clear out cardsInPlay so that 2 cards may be selected
	cardsInPlay = [];
}

createBoard();
var button = document.querySelector('button');
// Set the reset button to execute resetGame when clicked.
button.addEventListener('click',resetGame);
