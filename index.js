//determines what's displayed on the cards/what they are.
const SUITS = [	'♠', '♥', '♣', '♦'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

//determines what string = what value as an integer.
const CARD_VALUE_MAP = {
    '2': 2,
    '3': 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
}

let playerDeck;
let cpuDeck;
let inRound;
let stop;
let playerDeckCount;
let cpuDeckCount;
let player = 0;
let cpu = 0;

//I learned this in normal Java with clicking on the screen to produce another turn/itteration
document.addEventListener('click', () => {
    if (cpuDeck != 0) {
        if (inRound) {
            cleanBeforeRound();
        } else {
            flipCards();
        }
    } else {
        stop = true;
        if (player > cpu) {
                console.log(player + ": You won the game!");
            } else if (cpu > player) {
                console.log(cpu + ": Cpu has won the game!");
            }
        }
    })

//This gives each card a suit and value.
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

//I set this up in 2 different ways. One way was the war that I played when I grew up which you took the other player's card when you won the round. Hence why there's a pop and push function but after re-reading the rules you gave, I used the pop function to take the top card off and use that as the card from that specific deck.
class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    get numberOfCards() {
        return this.cards.length;
    }

    pop() {
        return this.cards.shift();
    }

    push(card) {
        this.cards.push(card);
    }

    //I almost used the sort fuction here but the issue was that sort makes the likelyhood of getting the same cards in the same spots is too high. This gives a real random shuffle.
    shuffle() {
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1));
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

//this just creates a fresh new deck and maps it out to be equal among the numbers and suits.
function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value);
        })
    })
}


function startGame() {
    const deck = new Deck();
    deck.shuffle();

    //this splits the cards into 2 decks. I used the math ceil as a precoation for a whole number base to round to.
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    cpuDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false;
    stop = false;

    cleanBeforeRound();
}

// this is mainly here to keep things from overlapping and keeping things running in order.
function cleanBeforeRound() {
    inRound = false;

    updateDeckCount();
}

//everytime you click, you flip a card and they play against each other. At the end, you get an updated player score, the number left in the deck, and the card for each player.
function flipCards() {
    inRound = true;

    const playerCard = playerDeck.pop();
    const cpuCard = cpuDeck.pop();

    updateDeckCount(); 

    if (isRoundWinner(playerCard, cpuCard)) {
        player++;
        console.log("Your Score (" + player + "): " + playerDeckCount + ": " + playerCard.value + playerCard.suit + "   vs   " + "CPU Score (" + cpu + "): " + cpuDeckCount + ": " + cpuCard.value + cpuCard.suit + ":   Round won!");
    } else if (isRoundWinner(cpuCard, playerCard)) {
        cpu++;
        console.log("Your Score (" + player + "): " + playerDeckCount + ": " + playerCard.value + playerCard.suit + "   vs   " + "CPU Score (" + cpu + "): " + cpuDeckCount + ": " + cpuCard.value + cpuCard.suit + ":   Round lost!");
    } else {
        console.log("Your Score (" + player + "): " + playerDeckCount + ": " + playerCard.value + playerCard.suit + "   vs   " + "CPU Score (" + cpu + "): " + cpuDeckCount + ": " + cpuCard.value + cpuCard.suit + ":   Draw!");
    }

}

//this keeps track of the deck count for both players.
function updateDeckCount() {
    cpuDeckCount = cpuDeck.numberOfCards;
    playerDeckCount = playerDeck.numberOfCards;
}

//this compares the 2 cards/arguments put in. It's easier to call this fuction instead of typing out the CARD_VALUE... etc. over and over.
function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
}

startGame()