// First of all we need to require the Letter constructor
var Word = require("./Word.js");

// Also, require the inquirer package
var inquire = require("inquirer");

// ------------
//Our list of words that will be randomly picked.
const wordArray = ["CASA", "PERRO", "VACA", "MESA", "SILLA"]

//We only want letters as input. No special characters, empty spaces, or numbers.
const letters = /[a-zA-Z]/;


//The number of incorrect tries the player gets to have. We will initialize this value in the playGame() function so it can be set
//to 10 when a new game starts.
let numGuesses;

//This function creates a new game with a new word.
function playGame() {

    let newWord = wordArray[Math.floor(Math.random() * wordArray.length)]
    //First we pick our new word randomly from the word array
    let word = new Word(newWord);

    //The user gets 10 incorrect tries before the game is over.
    numGuesses = 10;

    //Now we execute the game based on the word.
    guessWord(word, newWord);
    

};

//The meat of our game. This function handles everything the game should do to take a word, display it as blanks, have the user guess,
//indicate if the guess is correct or not, etc etc. This function will call itself over and over until either the word is guessed
//or the user runs out of incorrect attempts. 
function guessWord(guess, actual) {

    let letterWordArr = [];
    //This array will be used to store boolean values for each letter to see if everything has been guessed correctly
    let guessArr = [];

    //Shows the word being guessed, initially as underscores. The underscores will be replaced by letters when they are guessed
    console.log("");
    console.log(guess.createFrontWord());
    console.log("");

    //Ask for the letter and only letters. We do not want to accept special characters, numbers, or empty spaces.
    inquire.prompt([
        {
            name: "guessLetter",
            message: "Pick a letter.",
            validate: function validateLetter(name) {
                if (!name.match(letters)) {
                    return "Please pick a letter only.";
                }
                else{
                    return true;
                }
            }
        }
    ]).then(function (answer) {
        //Converts input to upper case to make things easier to compare. Then we use the constructor methods from Word.js to see if
        //the letter is in the word being guessed. 
        guess.checkFrontWord(answer.guessLetter.toUpperCase());

        //We want to get the boolean value for each Letter object in the Word so we can see if there are any false values. If there are
        //then the word is still being guessed on. Also, we want to get all the letters in the word so that we can see if the letter
        //is in the word. The checkGuessWord function above does not do that (though it could be written as if it was).
        guess.backWord.forEach(function (element) {

            letterWordArr.push(element.letter);
            guessArr.push(element.guessed);
        });

        if(letterWordArr.indexOf(answer.guessLetter.toUpperCase()) > -1){
            console.log("")
            console.log("CORRECT!!!");
        }
        else{
            console.log("");
            console.log("Incorrect!");
            numGuesses--;
            console.log(`You have ${numGuesses} tries remaining.`)
        }

        //If the word is not fully guessed and the player still has tries available, then the function asks for another letter
        //by calling itself
        if (guessArr.indexOf(false) > -1 && numGuesses > 0) {
            guessWord(guess, actual);
        }
        //Otherwise, we need to indicate if the user won or lost
        else {
            //Show the correct word whether the user won or lost
            

            if (numGuesses === 0) {
                console.log("");
                console.log("You lose.");
                console.log(`The word was ${actual}!`);
                console.log("");
            }
            else {
                console.log("");
                console.log("You did it!");
                console.log(`The word was ${actual}`);
                console.log("");
            };

            //Then ask if the user wants to play again.
            inquire.prompt([
                {
                    type: "confirm",
                    name: "playAgain",
                    message: "Would you like to play again?",
                    default: true
                }
            ]).then(function(answer){
                //If yes, a new game starts.
                if(answer.playAgain){
                    playGame();
                }
                //If not, the program stops.
                else{
                    process.exit();
                }
            });
        };
    });
};

//Start the game when the file is called in the terminal
playGame();

// ------------