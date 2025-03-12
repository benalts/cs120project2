import { Tile } from "./Tile.js";
import { generateWord } from "./fetchWord.js";


var guessForm = document.getElementById("guess-form");
var guess = document.getElementById("guess");
var newGame = document.getElementById("new-game");
newGame.addEventListener("click", resetGame);
var totalGuesses = 0;
var secretWord = "";

let rows = []; 

window.onload = async () => {
    submitButton.disabled = true;
    guess.placeholder = "Loading...";

    secretWord = await generateWord();

    console.log("The secret word is: " + secretWord);
    guess.placeholder = "Enter your guess.";
    submitButton.disabled = false;

    //put cursor in box
    guess.focus();

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

    guess.select();

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

async function resetGame(){

    //preventing submissions that cause errors before we have secret word
    submitButton.disabled = true;
    guess.placeholder = "Loading...";
    guess.value = "";

    //reset total guesses
    totalGuesses = 0;

    //clear board
    rows.forEach(row => {
        row.forEach(tile => {
            tile.update("", "white");
        });
    });

    secretWord = await generateWord();
    console.clear();
    console.log("New secret word:", secretWord);

    guess.value = "";
    guess.focus();

    //now we can guess again
    guess.placeholder = "Enter your guess.";
    submitButton.disabled = false;
    guess.focus();

    //hide new game button
    newGame.style.display = 'none';
}


