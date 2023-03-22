import { Map, MapPlayer, MapStar, MapWall} from './map.js';

const map = new Map({ width: 10, height: 10, size: 1 });
const player = new MapPlayer({ map, x: 0, y: 0, symbol: 'ᐅ' });
const star = new MapStar({ map, x: map.width - 1, y: map.height - 1 });

map.addObject(player);
map.addObject(star);

let innerCount = 0;
export function repeat(count) {
    if (innerCount === 0) {
        innerCount = count;
    }
    return {
        times: () => {
            innerCount = innerCount - 1;
            return innerCount != 0;
        }
    };
}

export async function challenge(num) {
    if (num === 1) {
        // Nothing other than finding the star
    } else if (num === 2) {
        map.addObject(new MapWall({ map, x: 0, y: 5 }));
        map.addObject(new MapWall({ map, x: 5, y: 0 }));
        await map.draw();
    } else if (num === 3) {
        for (let i = 1; i < map.width; i++) {
            map.addObject(new MapWall({ map, x: i, y: 4 }));
        }
        for (let i = 0; i < map.width - 1; i++) {
            map.addObject(new MapWall({ map, x: i, y: 6 }));
        }
        await map.draw();
    } else if (num === 4) {
        star.x = map.width - 1;
        star.y = 0;
        for (let i = 0; i < map.height - 1; i++) {
            map.addObject(new MapWall({ map, x: 5, y: i }));
        }
        await map.draw();
    } else if (num === 5) {
        for (let i = 1; i < map.width; i++) {
            map.addObject(new MapWall({ map, x: i, y: 3 }));
        }
        for (let i = 0; i < map.width - 1; i++) {
            map.addObject(new MapWall({ map, x: i, y: 5 }));
        }
        for (let i = 1; i < map.width; i++) {
            map.addObject(new MapWall({ map, x: i, y: 7 }));
        }
        await map.draw();
    } else if (num === 6) {
        for (let i = 1; i < map.width / 2; i++) {
            map.addObject(new MapWall({ map }).moveRandom());
        }
        await map.draw();
    } else if (num === 7) {
        for (let i = 1; i < map.width; i++) {
            map.addObject(new MapWall({ map }).moveRandom());
        }
        await map.draw();
    } else {
        console.log('No challenge ' + num);
        process.exit(0);
    }

    return await map.draw();
}

export async function challenge1() {
    map.addObject(player);
    map.addObject(new MapStar({ map, x: map.width - 1, y: map.height - 1 }));
    map.addObject(new MapWall({ map, x: 0, y: 5 }));
    return await map.draw();
}

export async function speedUp(factor) {
    return map.speedUp(factor);
}

export async function turnLeft() {
    return await player.turnLeft();
}

export async function turnRight() {
    return await player.turnRight();
}

export async function moveForward() {
    return await player.moveForward();
}

export async function facingAWall() {
    return await player.facingAWall();
}