import Game from './Game';
import { LEFT, RIGHT, UP, DOWN } from './constants';
import { GAME_AREA_WIDTH, GAME_AREA_HEIGHT } from './constants';
import { GAME_WON, GAME_LOST, WIN_SCORE, GAME_SPEED } from './constants';
import PUMPKIN_IMAGE from './pumpkin';

export default class Main {
    constructor() {
        window.addEventListener('keydown', this.handleKeyboard.bind(this), false);
        this.game = new Game({size: {width: GAME_AREA_WIDTH, height: GAME_AREA_HEIGHT}, winScore: WIN_SCORE});
        this.dt = 20;//scale factor
        this.pumpkinImg = new Image();
        this.pumpkinImg.src = PUMPKIN_IMAGE;
        let canvas = document.getElementById('canvas');
        canvas.width = GAME_AREA_WIDTH * this.dt;
        canvas.height = GAME_AREA_HEIGHT * this.dt;
        this.ctx = canvas.getContext('2d');
        document.getElementById('start-game-button').addEventListener('click', (event) => {
            this.resetGame();
            this.startGame();
        });
    }

    draw() {
        this.snake = this.game.snake;
        this.oldTail = {...this.snake.tail};
        const collision = this.game.tick();
        this.drawStats();
        if (collision) {
            this.drawCollision(collision);
            this.stopGame(GAME_LOST);
            return;
        }
        if (this.game.gameFinished) {
            this.drawSnake();
            this.stopGame(GAME_WON);
            return;
        }
        this.drawSnake();
        this.keyboardLock = false;
    }

    handleKeyboard(event) {
        //prevent from changing direction while draw() is running
        if (this.keyboardLock) return;
        this.keyboardLock = true;
        switch(event.key) {
            case 'ArrowDown': {
                this.game.snake.direction = DOWN;
                break;
            }
            case 'ArrowUp': {
                this.game.snake.direction = UP;
                break;
            }
            case 'ArrowLeft': {
                this.game.snake.direction = LEFT;
                break;
            }
            case 'ArrowRight': {
                this.game.snake.direction = RIGHT;
                break;
            }
        }
    }

    drawSnake() {
        const dt = this.dt;
        this.ctx.drawImage(this.pumpkinImg, this.game.food.x * dt, this.game.food.y * dt, dt, dt);
        this.snake.segments.forEach((segment) => {
            this.ctx.fillRect(segment.x *dt, segment.y * dt , dt, dt);
            this.ctx.strokeStyle = "white";
            this.ctx.strokeRect(segment.x * dt +1, segment.y * dt +1 , dt - 2 , dt - 2);
            this.ctx.strokeStyle = "black";
        });
        if (this.oldTail) {
            this.ctx.clearRect(this.oldTail.x * dt , this.oldTail.y * dt , dt , dt );
        }
    }

    drawCollision(collision) {
        const dt = this.dt;
        if (collision)  {
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(collision.x * dt, collision.y * dt, dt, dt);
            this.ctx.fillStyle = 'black';
        }
    }

    startGame() {
        document.getElementById('game-start').classList.add('hidden');
        document.getElementById('menu').classList.add('hidden');
        this.gameTimer = setInterval(() => {
            window.requestAnimationFrame(this.draw.bind(this));
        },GAME_SPEED);
    }

    stopGame(status) {
        const gameLost = document.getElementById('game-lost');
        const gameWon = document.getElementById('game-won');
        document.getElementById('menu').classList.remove('hidden');
        gameLost.classList.add('hidden');
        gameWon.classList.add('hidden');
        switch (status) {
            case GAME_LOST: {
                gameLost.classList.remove('hidden');
                break;
            }
            case GAME_WON: {
                gameWon.classList.remove('hidden');
            }
        }
        clearInterval(this.gameTimer);
    }

    drawStats() {
        document.getElementById('score').innerText = `Score: ${this.game.score}`;
        document.getElementById('snake-length').innerHTML = `Length: ${this.snake.segments.length}`
    }

    resetGame() {
        this.game = new Game({size: {width: GAME_AREA_WIDTH, height: GAME_AREA_HEIGHT}, winScore: WIN_SCORE });
        this.ctx.clearRect(0,0,canvas.width, canvas.height);
    }
}


