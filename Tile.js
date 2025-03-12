/*
* each tile is a td with a letter and a color
*/
export class Tile {
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
