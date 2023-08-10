let word = "ivory";
let wordSplit = word.toUpperCase().split("");
let letters = document.querySelectorAll('.letter');

//State of the app
let currentGuess = "";
let currentRow = 0;
let ANSWER_LENGTH = word.length;

function addLetter(letter) {

    //Make sure that the user cannot add letters beyond the specified number
    if (ANSWER_LENGTH > currentGuess.length) {
        //Keeps track of the current guess of the user
        currentGuess += letter;
        //I need to check what box i am in before adding the letter
    }
    // else {
    //     current = currentGuess.substring(0, currentGuess.length - 1) + letter;
    // }
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerHTML = letter;


}

function deleteOneLetter() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1)
    console.log(currentGuess);
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerHTML = "";

}

function commit() {
    console.log(currentGuess)
    console.log(wordSplit)
    //Check if the word is complete
    if (currentGuess.length < ANSWER_LENGTH) {
        //do nothing so return
        return;
    }
    //Check if word is valid 
    let guessSplit = currentGuess.toUpperCase().split("");
    console.log(guessSplit)


    //Check if the word is close
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (wordSplit.includes(guessSplit[i])) {
            letters[ANSWER_LENGTH * currentRow + i].classList.add('close');

        } else {
            letters[ANSWER_LENGTH * currentRow + i].classList.add('off');

        }
    }

    //Check if it is a win or a lose
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (wordSplit[i] == guessSplit[i]) {
            letters[ANSWER_LENGTH * currentRow + i].classList.add('success');

        }
    }
    //How not to add yellow when  when it is already green


    //Move on to the next row
    currentRow++;
    currentGuess = '';

}

document.addEventListener('keydown', function handlePress(event) {
    //Here i am handlling the input from the user 
    let action = event.key;
    switch (action) {
        //When enter is pressed whatever the user presssed the function will be executed
        case "Enter":
            //User is done typing his or her answer
            commit();
            break;

        case "Backspace":
            //Trial thus the user is deleting something that he had previoudly input
            deleteOneLetter();
            break;

        default:
            //For any other letter other than the above do this
            addLetter(action);
            break;
    }
})

