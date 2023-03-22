
class MapObject {
    constructor({ map, x = 0, y = 0, symbol = 'x' } = {}) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.symbol = symbol;
    }

    symbolAt(spaceX, spaceY) {
        if (typeof this.symbol === 'object') {
            const str = this.symbol[spaceY];
            const char = str ? str[spaceX] : 'x';
            return char;
        } else {
            return this.symbol;
        }
    }
}

class MapStar extends MapObject {
    constructor() {
        super(...arguments);
        this.symbol = '★';
    }
}

class MapPlayer extends MapObject {
    constructor() {
        super(...arguments);
        this.facing = 0;
        this.leftMapMsg = 'Oh no! You tried leaving the map!';
    }

    async turnLeft() {
        this.facing = this.facing - 1 >= 0 ? this.facing - 1 : 3;
        await this.map.draw();
    }

    async turnRight() {
        this.facing = (this.facing + 1) % 4;
        await this.map.draw();
    }

    async moveForward() {
        if (this.facing === 0) {
            if (this.x < this.map.width - 1) {
                this.x++;
            } else {
                this.map.abort(this.leftMapMsg);
            }
        } else if (this.facing === 1) {
            if (this.y < this.map.height - 1) {
                this.y++;
            } else {
                this.map.abort(this.leftMapMsg);
            }
        } else if (this.facing === 2) {
            if (this.x > 0) {
                this.x--;
            } else {
                this.map.abort(this.leftMapMsg);
            }
        } else if (this.facing === 3) {
            if (this.y > 0) {
                this.y--;
            } else {
                this.map.abort(this.leftMapMsg);
            }
        } else {
            throw 'Unknown facing: ' + this.facing;
        }

        await this.map.draw();
        this.checkIfWon();
    }

    checkIfWon() {
        const star = this.map.objects.find(obj => obj instanceof MapStar);
        if (star && star.x === this.x && star.y === this.y) {
            this.map.abort('You found the star!');
        }
    }

    symbolAt() {
       return [ 'ᐅ', 'ᐁ', 'ᐊ', 'ᐃ' ][this.facing];
    }
}

class Map {
    constructor({ width = 5, height = 5, size = 2, speed = 1000, empty = ' ' } = {}) {
        this.width = width;
        this.height = height;
        this.size = size;
        this.speed = speed;
        this.empty = empty;
        this.doClear = true;
        this.doingAbort = true;
        this.objects = [];
    }
    
    speedUp(factor) {
        this.speed = this.speed / factor;
    }

    addObject(obj) {
        if (obj instanceof MapObject) {
            this.objects.push(obj);
        } else {
            throw 'Object must be of type MapObject';
        }
        return this;
    }

    async draw() {
        this.resetMap();
        this.drawHorizontalEdge();
        for (var y = 0; y < this.width; y++) {
            this.resetUndrawnLines();
            for (var x = 0; x < this.height; x++) {
                this.drawSpace(x, y);
            }
            this.drawUndrawnLines();
        }
        this.drawHorizontalEdge();
        this.map.forEach(str => console.log(str));
        await this.wait(this.speed);
    }

    async wait(ms) {
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }

    drawSpace(mapX, mapY) {
        const object = this.objectAt(mapX, mapY);
        for (var spaceY = 0; spaceY < this.size; spaceY++) {
            for (var spaceX = 0; spaceX < this.size; spaceX++) {
                if (object) {
                    this.undrawnLines[spaceY] += object.symbolAt(spaceX, spaceY);
                } else {
                    this.undrawnLines[spaceY] += this.empty;
                }
            }
        }
    }

    objectAt(x, y) {
        return this.objects.find(obj => obj.x === x && obj.y === y);
    }
    
    drawHorizontalEdge() {
        let str = '';
        for (var x = 0; x < (this.width * this.size) + 2; x++) {
            str += '-';
        }
        this.drawLine(str);
    }

    drawUndrawnLines() {
        for (var i = 0; i < this.size; i++) {
            this.drawLine(this.undrawnLines[i] + '|');
        }
    }

    resetUndrawnLines() {
        this.undrawnLines = [];
        for (var i = 0; i < this.size; i++) {
            this.undrawnLines[i] = '|';
        }
    }

    resetMap() {
        this.doClear && console.clear();
        this.map = [];
    }

    drawLine(str) {
        this.map.push(str);
    }

    clearing() {
        this.doClear = true;
    }

    notClearing() {
        this.doClear = false;
    }

    doAbort() {
        this.doingAbort = true;
    }

    dontDoAbort() {
        this.doingAbort = false;
    }

    abort(msg) {
        if (this.doingAbort) {
            console.log(msg);
            process.exit(0);
        }
    }
}

const map = new Map({ width: 10, height: 10, size: 1 });
const player = new MapPlayer({ map, x: 0, y: 0, symbol: 'ᐅ' });
map.addObject(player);
const star = new MapStar({ map, x: map.width - 1, y: map.height - 1 });
map.addObject(star);
map.speedUp(10);
await map.draw();
await player.turnRight();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.turnLeft();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();
await player.moveForward();


/*
ᐃ
ᐁ
ᐊ
ᐅ
■
★
✪
*/