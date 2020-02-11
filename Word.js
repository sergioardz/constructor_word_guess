// First of all we need to require the Letter constructor
var Letter = require("./Letter.js");

// HW Instructions for this constructor:
// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

var Word = function(word) {
    // -1- An array of new Letter objects representing the letters of the underlying word, i.e. "backword"
    this.backWord = [];
    for (i = 1; i < word.length; i++) {
        if (word.charAt(i) === " ") {
            this.backWord.push(" ");
        }
        else {
            this.backWord.push(new Letter(word.charAt(i)));
        }
    }

    // -2- A function that returns a string representing the word, i.e. "frontword". This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
    this.createFrontWord = function() {
        var frontWord = "";
        this.backWord.forEach(element => {
            if (element === " ") {
                frontWord += " ";
            }
            else {
                frontWord += element.guessResult();
            }
            return frontWord;
        });
    };

    // -3- A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
    this.checkFrontWord = function(guessedLetter) {
        this.backWord.forEach(element => {
            if (element.letter !== undefined) {
                element.checkGuess(guessedLetter);
            }
        });
    };
};

module.exports = Word;