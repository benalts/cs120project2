let usedWords = [];

export async function generateWord() {
    try {
        let word;
        
        do {
            let response = await fetch("https://random-word-api.herokuapp.com/word?length=5");
            let data = await response.json();
            word = data[0];
        } while (usedWords.includes(word));

        usedWords.push(word);
        return word;

    } catch (error) {
        console.error("Error fetching word:", error);
    }
}
