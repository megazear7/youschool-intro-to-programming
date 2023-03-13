import { ask, close } from './io.js';

let firstName = await ask("What is your name?");

console.log(firstName);

let i = 0;

while (i < firstName.length) {
    i = i + 2;
    console.log(firstName[i]);
}

close();
