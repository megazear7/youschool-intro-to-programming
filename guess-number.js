import { ask, close } from './io.js';

let number = parseInt(Math.random() * 100);
let guess = -1;
let guesses = 10;

while (guess != number && guesses > 0) {
    guess = parseInt(await ask('Guess a number '));
    guesses = guesses - 1;

    if (guess > number) {
        console.log('Too high. You have ' + guesses + ' left.');
    } else if (guess < number) {
        console.log('Too low. You have ' + guesses + ' left.');
    } else {
        console.log('You win!!!');
    }
}

close();
