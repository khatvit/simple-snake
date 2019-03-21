import { LEFT, RIGHT, UP, DOWN } from './constants';
export default class Snake {
    constructor(initialState) {
        this.segments = [...initialState];
        this.direction = this._direction = RIGHT;
    }
    move() {
        const collision = this._detectCollision();
        if (collision) return collision;
        this.segments.shift();
        this.grow();
    }

    grow() {
        switch(this.direction) {
            case RIGHT: {
                this.segments.push({
                    x:this.head.x +1,
                    y:this.head.y
                });
                break;
            }
            case UP: {
                this.segments.push({
                    x:this.head.x,
                    y:this.head.y-1
                })
                break;
            }
            case DOWN: {
                this.segments.push({
                    x: this.head.x,
                    y: this.head.y + 1
                });
                break;
            }
            case LEFT: {
                this.segments.push({
                    x: this.head.x - 1,
                    y: this.head.y
                });
                break;
            }
        }
    }

    get headIndex() {
        return this.segments.length - 1;
    }
    get head() {
        return {...this.segments[this.headIndex]};
    }
    get tail() {
        return {...this.segments[0]};
    }

    set direction(direction) {
        if (this._isOpositeDirection(direction)) {
            return;
        } else {
            this._direction = direction;
        }
    }
    get direction() {
        return this._direction;
    }

    //Private

    _isOpositeDirection(direction) {
        if (this.direction === UP && direction === DOWN) return true;
        if (this.direction === DOWN && direction === UP) return true;
        if (this.direction === LEFT && direction === RIGHT) return true;
        if (this.direction === RIGHT && direction === LEFT) return true;
        return false;
    }

    _detectCollision() {
        return this.segments.reduce((collisionSegment,segment, currentIndex) => {
            if (currentIndex !== this.headIndex) { //skip head from head's collision detection
                if ((this.head.x === segment.x) && (this.head.y === segment.y))  {
                    return collisionSegment = segment;
                }
            }
            return collisionSegment;
        },null);
    }
}