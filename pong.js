import { wait } from './utils.js';

let ball = 'O'
let width = 10;
let positionX = 0;
let speed = 4;
let direction = 1;

while (true) {
    console.clear();
    update();
    draw();
    await wait(1 / speed);
}

function update() {
    if (positionX == width - 1) {
        direction = -1;
    } else if (positionX == 0) {
        direction = 1;
    }

    positionX += direction;
}

function draw() {
    let line = '|';

    for (var i = 0; i < width; i++) {
        // Complete this part of the program. It will involve:
        //   an if condition
        //   comparing the values of i and positionX
        //   updating the value of line
        //   using the vale of ball
    }

    line += '|';

    console.log(line);
}

// Additional things to try:
//   Change the shape of the ball
//   Make the ball go faster
//   Make the width of the line bigger
//   Draw the line twice.
//   Make the balls on the two lines start on opposite sides and go in opposite directions
