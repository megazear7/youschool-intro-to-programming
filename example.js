import { speedUp, turnLeft, turnRight, moveForward, facingAWall, challenge, repeat } from './map-challenge.js';

// Run the program to see how this works
// Use the functions you see here to find the star
// Try using for loops instead of repeating the same command multiple times

await challenge(1);
await speedUp(5);
await turnRight();
while (repeat(5).times()) {
    await moveForward();
}
await turnLeft();
await turnLeft();
while (!await facingAWall()) {
    await moveForward();
}
