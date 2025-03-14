import { Tile } from "./Tile.js";
import { generateWord } from "./fetchWord.js";


var guessForm = document.getElementById("guess-form");
var guess = document.getElementById("guess");
var newGame = document.getElementById("new-game");
var scoreDisplay = document.getElementById("average-score");
var lettersDisplay = document.getElementById("letters");
newGame.addEventListener("click", resetGame);

var totalWins = 0;
var totalWordsPlayed = 0;
var totalGuessesAllGames = 0;
var totalGuesses = 0;
var secretWord = "";
var guessedLetters = new Set();

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


    addGuessedLetters(guess.value); //for list at bottom
    populateRows(guess.value, secretWord, totalGuesses);

    guess.select();

});

function addGuessedLetters(word) {
    for (let letter of word.toUpperCase()) {
        guessedLetters.add(letter);
    }
    lettersDisplay.textContent = [...guessedLetters].join(", ");
}

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
    if(guessWord === answerWord) { 
        totalWins++;
        totalWordsPlayed++;
        totalGuessesAllGames += (rowNumber + 1);
        updateAverageScore();
        alert("You win!");
        submitButton.disabled = true;
        //show new game button
        newGame.style.display = 'block';
    }

    if (rowNumber === 5) {
        //had this issue for a while... the last guess wouldnt show before the game over popup
        //so we set a timeout to allow the UI to popuate first
        totalWordsPlayed++;
        totalGuessesAllGames += 6;
        updateAverageScore();
        setTimeout(() => {
            alert(`Game over :( The correct word was: ${answerWord}`);
            newGame.style.display = 'block';
            submitButton.disabled = true;
        }, 300);
        return;
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
    guessedLetters.clear();
    lettersDisplay.textContent = "";

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

// here i calculate the users score
// we track thier total number of guesses, and the total words played, and average
function updateAverageScore() {
    if (totalWordsPlayed === 0) {
        scoreDisplay.textContent = "0";

    } else {
        let averageScore = (totalGuessesAllGames / totalWordsPlayed);
        scoreDisplay.textContent = averageScore;
    }
}