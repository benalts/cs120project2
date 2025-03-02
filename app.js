var guessForm = document.getElementById("guess-form");
var guess = document.getElementById("guess");
var totalGuesses = 0;

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

    if (totalGuesses >= 6) {
        alert("Game over!");
    }
    
    rows[totalGuesses].forEach(tile => {
        tile.update("l", "white");
    });

    totalGuesses++;

});


