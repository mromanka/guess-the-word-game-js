// 1. GLOBAL VARIABLES TO TARGET HTML ELEMENTS

const guessedLettersElement = document.querySelector(".guessed-letters"); // UNORDERED LIST WHERE THE PLAYER'S GUESSED LETTERS WILL APPEAR
const guessButton = document.querySelector(".guess"); // BUTTON WITH THE TEXT "GUESS!" IN IT
const guessLetterInput = document.querySelector(".letter"); // TEXT INPUT WHERE PLAYER WILL GUESS A LETTER
const wordInProgress = document.querySelector(".word-in-progress"); // EMPTY PARAGRAPH WHERE THE WORD IN PROGRESS WILL APPEAR
const remainingGuessesElement = document.querySelector(".remaining"); // PARAGRAPH WHERE THE REMAINING GUESSES WILL DISPLAY
const remainingGuessesSpan = document.querySelector(".remaining span"); // SPAN INSIDE THE PARAGRAPH WHERE REMAINING GUESSES WILL DISPLAY
const message = document.querySelector(".message"); // EMPTY PARAGRAPH WHERE MESSAGES WILL APPEAR WHEN THE PLAYER GUESSES A LETTER
const playAgainButton = document.querySelector(".play-again"); // HIDDEN BUTTON THAT WILL APPEAR PROMPTING PLAYER TO PLAY AGAIN

let word = "magnolia"; // STARTING WORD TO TEST OUT THE GAME
let guessedLetters = []; // ARRAY FOR GUESSED LETTERS
let remainingGuesses = 8; // MAXIMUM NUMBER OF GUESSES

// 10. ASYNC FUNCTION TO FETCH RANDOM WORDS

const getWord = async function (){
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    console.log(words);
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length)
    word = wordArray[randomIndex].trim();
    addPlaceholders(word);
};
getWord(); // Calling this function starts the game

// 2. FUNCTION TO ADD PLACEHOLDERS FOR EACH LETTER THAT WILL APPEAR IN THE WORD IN PROGRESS ELEMENT (CREATE AN ARRAY, LOOP THROUGH EACH LETTER OF THE WORD AND ADD IT TO THE END OF THE ARRAY AS THE SYMBOL, JOIN ARRAY BACK TO A STRING AND DISPLAY AS WORD IN PROGRESS)

const addPlaceholders = function (word){
    const placeholder = [];
    for (const letter of word){
        console.log(letter);
        placeholder.push("●");
    };
    wordInProgress.innerText = placeholder.join("");
};

// 3. CLICK EVENT FOR THE GUESS BUTTON (CAPTURE THE VALUE OF THE INPUT, LOG OUT THE VALUE OF THE INPUT, THEN EMPTY THE VALUE OF THE INPUT)

guessButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
    const guess = guessLetterInput.value;
    console.log(guess);
    const validatedGuess = validateInput(guess);
    console.log(validatedGuess);
    if (validatedGuess){
        makeGuess(guess);
    }
    guessLetterInput.value = "";
});

// 4. FUNCTION TO CHECK PLAYER'S INPUT, THEN VALIDATE THE INPUT IN THE GUESS BUTTON EVENT HANDLER

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length = 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1){
        message.innerText = "Please enter only 1 letter";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return input;
    };
};

// 5. FUNCTION TO CAPTURE INPUT AND ADD TO GUESSED LETTERS ARRAY

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already guessed that letter, try again";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        displayGuessedLetters();
        countGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    };
};

// 6. FUNCTION TO SHOW THE GUESSED LETTERS (LOOP THROUGH EACH LETTER OF THE guessedLetters ARRAY, CREATE A NEW LIST ITEM FOR EACH LETTER, ADD NEW LIST ITEM TO THE guessedLettersElement)

const displayGuessedLetters = function(){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
    const listItem = document.createElement("li");
    listItem.innerText = letter;
    guessedLettersElement.append(listItem);
    };
};

// 7. FUNCTION TO UPDATE THE WORD IN PROGRESS WITH THE CORRECTLY GUESSED LETTERS TO REPLACE THE PLACEHOLDER SYMBOLS

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    const showWord = [];
    for (const letter of wordArray){
        if (guessedLetters.includes(letter)){
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        };
    };
    console.log(wordArray);
    wordInProgress.innerText = showWord.join("");
    checkIfPlayerWon();
};

// 9. FUNCTION TO COUNT GUESSES REMAINING

const countGuessesRemaining = function (guess){
    const wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.innerText = `The word doesn't contain the letter ${guess}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `The word contains the letter ${guess}`;
    };
    if (remainingGuesses === 0){
        message.innerHTML = `Game over! The word is <span class ="highlight">${word}`;
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
}

// 8. FUNCTION TO CHECK IF THE PLAYER WON

const checkIfPlayerWon = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
    };
};