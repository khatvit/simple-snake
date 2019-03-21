import Snake from './Snake';
export default class Game {
    /**
     *
     * @param {Object} config game configuration object
     * @param {number} config.width width in blocks
     * @param {number} config.height height in blocks
     * @param {number} config.winScore needed score to win
     */
    constructor(config) {
        this.config = { ...config };
        //TBD generate position randomly
        //TBD validate that snake generates within play area
        this.snake = new Snake([
            {x:10,y:10},
            {x:10,y:11},
            {x:10,y:12},
            {x:10,y:13},
            {x:10,y:14},
            {x:10,y:15},
            {x:10,y:16},
            {x:10,y:17},
            {x:10,y:18}
        ]);
        this.food = this.placeFood();
        this.score = 0;
    }

    tick() {
        const snakeCollision = this.snake.move();
        if (snakeCollision) return snakeCollision;
        const wallCollision = this._detectWallCollision();
        if (wallCollision) return wallCollision;
        if (this.snake.head.x === this.food.x && this.snake.head.y === this.food.y) {
            this.score++;
            if (this.score === this.config.winScore) {
                this.gameFinished = true;
                return;
                //don't place new food, and don't grow
            }  
            this.snake.grow();
            this.food = this.placeFood();
        }
    }

    placeFood() {
        const x = Math.floor(Math.random() * Math.floor(this.config.size.width));
        const y = Math.floor(Math.random() * Math.floor(this.config.size.height));
        let food = {x: x, y: y};
        const foodInsideSnake = this.snake.segments.find((segment) => {
            return (segment.x === food.x && segment.y === food.y);
        });
        if (foodInsideSnake) return this.placeFood();
        return food;
    }

    _detectWallCollision() {
        if ( this.snake.head.x < 0 || this.snake.head.x >= this.config.size.width ||
        this.snake.head.y < 0 || this.snake.head.y >= this.config.size.height) {
            return this.snake.head;
        }
    }
}