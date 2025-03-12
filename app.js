// Note: Asked ChatGPT to give me 30 5 letter words
const words = [
    "apple", "brave", "crisp", "dance", "eager", 
    "flame", "grape", "happy", "ivory", "jolly", 
    "kneel", "lemon", "mango", "noble", "ocean", 
    "pearl", "quick", "roast", "sugar", "tiger", 
    "ultra", "vivid", "whale", "xenon", "youth", 
    "zebra", "brick", "cloud", "frost", "globe"
];

var guessForm = document.getElementById("guess-form");
var guess = document.getElementById("guess");
var newGame = document.getElementById("new-game");
var totalGuesses = 0;
var secretWord = "mummy";

/*
* each tile is a td with a letter and a color
*/

class Tile {
    constructor(element) {
        this.element = element;
        this.letter = "";
        this.color = "white";
    }

    update(letter, color) {
        this.letter = letter;
        this.color = color;
        this.element.textContent = letter;
        this.element.style.backgroundColor = color;
    }
}

let rows = []; 

window.onload = () => {

    console.log("The secret word is: " + secretWord);

    const tableRows = document.querySelectorAll("table tr");
    tableRows.forEach((tr) => {
        const tiles = Array.from(tr.children).map(td => new Tile(td));
        rows.push(tiles);
    });
}

guessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // on submit we must check if the guess exists, is less than or more than 5 chars

    if (guess.value.length != 5) {
        alert("Your guess must be 5 characters");
        return;
    }

    populateRows(guess.value, secretWord, totalGuesses);

});

function populateRows(guess, answer, rowNumber) {
    let guessWord = guess.toUpperCase();
    let answerWord = answer.toUpperCase();

    let correctLetters = [];

    //set the colors of each tile
    
    for(let i = 0; i < 5; i++){
        //match => green
        if(guessWord[i] == answerWord[i]){ 
            rows[rowNumber][i].update(guessWord[i], "green"); 
            correctLetters.push(guessWord[i]);
        }        
        //fail => white
        if(guessWord[i] != answerWord[i]){ 
            rows[rowNumber][i].update(guessWord[i], "white"); 
        }        
    }

    //now that we have the correct letters, we can giving a
    for(let i = 0; i < 5; i++){
        //correct letter wrong spot, yellow
        //canot already be used
        if(answerWord.includes(guessWord[i]) && !correctLetters.includes(guessWord[i])){ 
            rows[rowNumber][i].update(guessWord[i], "yellow"); 
        }       
    }

    correctLetters.length = 0;


    //winning message
    //this happens after we color the tiles 
    if(guessWord == answerWord) { 
        alert("You win!");
        //show new game button
        newGame.style.display = 'block';
    }

    if (rowNumber == 6) {
        alert("Game over!");
        resetGame();
    }

    totalGuesses++;
}

function resetGame(){
    //reset total guesses
    totalGuesses = 0;

    //clear board

    rows.forEach(row => {
        row.forEach(tile => {
            tile.update("", "white");
        });
    });


    //set secret word to a new word

    //hide new game button
    newGame.style.display = 'none';





    
}


