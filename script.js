/* *****************
* Helper Functions *
****************** */
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbol = ['♥️', '♦️', '♣️', '♥️'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbol[suitIndex];
    let currentSuitColour = '';
    // set suit colour based on suit index
    if (suitIndex === 0 || suitIndex === 1) {
      currentSuitColour = 'red';
    } else if (suitIndex === 2 || suitIndex === 3) {
      currentSuitColour = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let currentDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        currentDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        currentDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        currentDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        currentDisplayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: currentDisplayName,
        colour: currentSuitColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// function that creates the card element
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// create a helper function to find highest rank in an array of card objects
const highestRank = (cardArr) => {
  let largestRank;
  largestRank = 0;

  for (let i = 0; i < cardArr.length; i += 1) {
    if (cardArr[i].rank > largestRank) {
      largestRank = cardArr[i].rank;
    }
  }
  return largestRank;
};

// create a helper function to find lowest rank in an array of card objects
const lowestRank = (cardArr) => {
  let smallestRank;
  smallestRank = 13;

  for (let i = 0; i < cardArr.length; i += 1) {
    if (cardArr[i].rank < smallestRank) {
      smallestRank = cardArr[i].rank;
    }
  }
  return smallestRank;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/* *****************
* Global Variables *
****************** */

let deck;
deck = shuffleCards(makeDeck());

// Player 1 starts first
let playersTurn;
playersTurn = 1;

// Use let for player1Card object because player1Card will be reassigned
let player1Card;

// create two buttons
const player1DrawButton = document.createElement('button');
const player1DoneButton = document.createElement('button');

const player2DrawButton = document.createElement('button');
const player2DoneButton = document.createElement('button');

// create restart game button
const resetGameButton = document.createElement('button');

// Create game info div as global value
// fill game info div with starting instructions
const gameInfo = document.createElement('div');

// card container
let player1CardContainer;
let player2CardContainer;

// drawn card arrays
let player1Cards = [];
let player2Cards = [];

/* ************************
* Player Action Callbacks *
************************* */

// Add an event listener on player 1's button to draw card and switch
// to player 2's turn
const player1Draw = () => {
  if (playersTurn === 1) {
  // pop player 1's card metadata from the deck
    player1Card = deck.pop();
    // console.log('player1card: ');
    // console.log(player1Card);
    player1Cards.push(player1Card);

    // Create card element from card metadata
    const cardElement = createCard(player1Card);
    // cardElement.className = 'player1Cards';
    cardElement.classList.add('player1Cards');
    // Empty cardContainer in case this is not the 1st round of gameplay
    // player1CardContainer.innerHTML = '';
    // Append the card element to the card container
    player1CardContainer.appendChild(cardElement);
  }
};

// Add an event listener on player 1's button to end turn and switch
// to player 2's turn
const player1Done = () => {
  if (playersTurn === 1) {
    // Switch to player 2's turn
    playersTurn = 2;

    output('Its player 2 turn. Click to draw card!');
  }
};

// Add event listener on player 2's button to draw card and determine winner
// Switch back to player 1's turn to repeat game
const player2Draw = () => {
  if (playersTurn === 2) {
  // Pop player 2's card metadata from the deck
    const player2Card = deck.pop();
    // console.log('player2card: ');
    // console.log(player2Card);
    player2Cards.push(player2Card);

    // Create card element from card metadata
    const cardElement = createCard(player2Card);
    // cardElement.className = 'player2Cards';
    cardElement.classList.add('player2Cards');
    // Append the card element to the card container
    player2CardContainer.appendChild(cardElement);
  }
};

// Add an event listener on player 2's button to end turn and determine winner switch
// Switch back to player 1's turn to repeat game
const player2Done = () => {
  // Switch to player 1's turn
  playersTurn = 1;

  // Determine and output winner
  if ((highestRank(player1Cards) - lowestRank(player1Cards))
  > (highestRank(player2Cards) - lowestRank(player2Cards))) {
    output(`player 1 wins with difference of ${highestRank(player1Cards) - lowestRank(player1Cards)}. 
    Click reset game button to play again.`);
  } else if ((highestRank(player1Cards) - lowestRank(player1Cards))
  < (highestRank(player2Cards) - lowestRank(player2Cards))) {
    output(`player 2 wins with difference of ${highestRank(player2Cards) - lowestRank(player2Cards)} 
    Click reset game button to play again.`);
  } else {
    output(`tie.  
    Click reset game button to play again.`);
  }
};

// Create a callback function to reset game
const resetGame = () => {
  gameInfo.innerText = 'Its player 1 turn. Click to draw a card!';
  player1CardContainer.innerHTML = '';
  player2CardContainer.innerHTML = '';

  console.log(player1Cards);
  console.log(player2Cards);
  player1Cards = [];
  player2Cards = [];
  console.log(player1Cards);
  console.log(player2Cards);

  deck = shuffleCards(makeDeck());
};

/* ********************
* Game Initialisation *
********************* */
const initGame = () => {
  // initialise player 1 card container
  player1CardContainer = document.createElement('div');
  player1CardContainer.classList.add('card-container');
  player1CardContainer.id = 'player1-card-container';
  document.body.appendChild(player1CardContainer);

  // initialise player 2 card container
  player2CardContainer = document.createElement('div');
  player2CardContainer.classList.add('card-container');
  player2CardContainer.id = 'player2-card-container';
  document.body.appendChild(player2CardContainer);

  // initialize player 1 buttons
  player1DrawButton.innerText = 'Player 1 Draw';
  player1CardContainer.after(player1DrawButton);
  player1DoneButton.innerText = 'Player 1 Done';
  player1DrawButton.after(player1DoneButton);

  // initialize player 1 buttons
  player2DrawButton.innerText = 'Player 2 Draw';
  player2CardContainer.after(player2DrawButton);
  player2DoneButton.innerText = 'Player 2 Done';
  player2DrawButton.after(player2DoneButton);

  player1DrawButton.addEventListener('click', player1Draw);
  player1DoneButton.addEventListener('click', player1Done);
  player2DrawButton.addEventListener('click', player2Draw);
  player2DoneButton.addEventListener('click', player2Done);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Its player 1 turn. Click to draw card!';
  document.body.appendChild(gameInfo);

  // initialize a button to restart game
  resetGameButton.innerText = 'Reset Game';
  gameInfo.after(resetGameButton);
  resetGameButton.addEventListener('click', resetGame);
};

initGame();
