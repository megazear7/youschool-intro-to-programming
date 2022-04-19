import { ask, close } from './io.mjs';

const number = parseInt(Math.random() * 100);
const maxTrys = 10;
let guess = -1;
let trys = 0;

console.log('I have a random number. You have ' + maxTrys + ' to figure it out.');

while (guess !== number && trys < maxTrys) {
    trys = trys + 1;
    guess = parseInt(await ask('Try #' + trys + '. Guess a number'));

    if (guess > number) {
        console.log('Too high');
    } else if (guess < number) {
        console.log('Too low');
    } else if (guess === number) {
        console.log('You guessed it in ' + trys + ' trys!');
    } else {
        console.log('You need to guess a number!');
    }
}

if (trys >= maxTrys) {
    console.log('You lose!');
}

close();
