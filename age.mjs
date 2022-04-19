import { ask, close } from './io.mjs';

const age = await ask('What is your age?');
console.log('You are ' + age + ' years old');
close();
