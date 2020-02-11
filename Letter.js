// HW Instructions for this constructor:
// Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

var Letter = function(value) {
    // -1- A string value to store the underlying character for the letter
    this.letter = value;
    // -2- A boolean value that stores whether that letter has been guessed yet
    this.guessed = false;

    // -3- A function that:
    this.guessResult = function() {
        if (this.guessed) {
            // returns the underlying character if the letter has been guessed,
            return this.letter + " ";
        }
        else {
            // or a placeholder (like an underscore) if the letter has not been guessed
            return "_ ";
        }
    };

    // -4- A function that takes a character as an argument 
    this.checkGuess = function(guess) {
        // and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
        if (guess === this.letter) {
            this.guessed = true;
        }
    };
};

// This constructor function needs to be exported to be called on the Word.js file later on
module.exports = Letter;

