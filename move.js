
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

class Map {
    constructor({ width = 5, height = 5, size = 2, empty = ' ' } = {}) {
        this.width = width;
        this.height = height;
        this.size = size;
        console.log(this.size);
        this.empty = empty;
        this.objects = [];
    }

    addObject(obj) {
        if (obj instanceof MapObject) {
            this.objects.push(obj);
        } else {
            throw 'Object must be of type MapObject';
        }
        return this;
    }

    draw() {
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
        //console.clear();
        this.map = [];
    }

    drawLine(str) {
        this.map.push(str);
    }
}

const map = new Map({ width: 5, height: 5, size: 3 });
const player = new MapObject({ map, x: 2, y: 2, symbol: [ '---', '| |', '---' ] });
map.addObject(player);
map.draw();


/*

---
*/