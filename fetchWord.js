let usedWords = [];

let generateWord = async () => {
    try {
        let response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
        let data = await response.json();
        console.log(data);
        let word = data[0];
        usedWords.push(word);
        return word;

    } catch (error) {
        console.error("Error fetching word:", error);
    }
}

console.log(generateWord());