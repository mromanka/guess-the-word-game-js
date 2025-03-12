// 1. CREATE GLOBAL VARIABLES TO TARGET HTML ELEMENTS

// UNORDERED LIST WHERE THE PLAYER'S GUESSED LETTERS WILL APPEAR
const guessedLetters = document.querySelector(".guessed-letters");
// BUTTON WITH THE TEXT "GUESS!" IN IT
const buttonGuess = document.querySelector(".guess");
// TEXT INPUT WHERE PLAYER WILL GUESS A LETTER
const inputGuessLetter = document.querySelector(".letter");
// EMPTY PARAGRAPH WHERE THE WORD IN PROGRESS WILL APPEAR
const wordInProgress = document.querySelector(".word-in-progress")
// PARAGRAPH WHERE THE REMAINING GUESSES WILL DISPLAY
const remainingGuesses = document.querySelector(".remaining");
// SPAN INSIDE THE PARAGRAPH WHERE REMAINING GUESSES WILL DISPLAY
const remainingGuessesSpan = document.querySelector(".remaining span");
// EMPTY PARAGRAPH WHERE MESSAGES WILL APPEAR WHEN THE PLAYER GUESSES A LETTER
const message = document.querySelector(".message");
// HIDDEN BUTTON THAT WILL APPEAR PROMPTING PLAYER TO PLAY AGAIN
const buttonPlayAgain = document.querySelector(".play-again");

// STARTING WORD TO TEST OUT THE GAME
const word = "magnolia";

// 2. WRITE A FUNCTION TO ADD PLACEHOLDERS FOR EACH LETTER THAT WILL APPEAR IN THE WORD IN PROGRESS ELEMENT (CREATE AN ARRAY, LOOP THROUGH EACH LETTER OF THE WORD AND ADD IT TO THE END OF THE ARRAY AS THE SYMBOL, JOIN ARRAY BACK TO A STRING AND DISPLAY AS WORD IN PROGRESS)

const addPlaceholders = function (word){
    const placeholder = [];
    for (const letter of word){
        console.log(letter);
        placeholder.push("●");
    };
    wordInProgress.innerText = placeholder.join("");
};
addPlaceholders(word);

// 3. ADD A CLICK EVENT FOR THE GUESS BUTTON (CAPTURE THE VALUE OF THE INPUT, LOG OUT THE VALUE OF THE INPUT, THEN EMPTY THE VALUE OF THE INPUT)

buttonGuess.addEventListener("click", function(e){
    e.preventDefault();
    const input = inputGuessLetter.value;
    console.log(input);
    inputGuessLetter.value = "";
});
