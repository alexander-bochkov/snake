import Playfield from '../Playfield';
import Score from '../Score';
import { PLAYFIELD_SIZE, POSITION_X, POSITION_Y } from '../common/constants';
import { Position, SnakePosition } from '../common/types';
import { DIRECTION, KEYS, SNAKE_HEAD, SNAKE_START_DIRECTION, SNAKE_START_POSITION, STEP_INTERVAL } from './constants';

export default class Game {
  private readonly playfield: Playfield;

  private readonly score: Score;

  private canChangeDirection = true;

  private snakeDirection: DIRECTION = SNAKE_START_DIRECTION;

  private snakePosition: SnakePosition = SNAKE_START_POSITION;

  private applePosition?: Position;

  private prevTimeStamp = 0;

  constructor(playfield: Playfield, score: Score) {
    this.playfield = playfield;
    this.score = score;
  }

  start() {
    this.enableControl();
    requestAnimationFrame(this.loop.bind(this));
  }

  private loop(timeStamp: number) {
    if (timeStamp - this.prevTimeStamp >= STEP_INTERVAL) {
      this.prevTimeStamp = timeStamp;
      this.update();
      this.draw();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  private update() {
    if (!this.applePosition && this.hasFreeCells()) {
      this.applePosition = this.createNewApplePosition(this.snakePosition);
      return;
    }

    const nextHeadPosition = this.getNextHeadPosition();

    if (this.isGameOver(nextHeadPosition)) {
      this.setDefault();
      this.score.reset();
      return;
    }

    if (this.wasAppleEaten(nextHeadPosition)) {
      this.snakePosition = this.calculateNextSnakePosition(nextHeadPosition, true);
      this.applePosition = this.hasFreeCells() ? this.createNewApplePosition(this.snakePosition) : undefined;

      this.score.increase();
    } else {
      this.snakePosition = this.calculateNextSnakePosition(nextHeadPosition, false);
    }

    this.canChangeDirection = true;
  }

  private getNextHeadPosition(): Position {
    switch (this.snakeDirection) {
      case DIRECTION.UP: {
        const [headX, headY] = this.snakePosition[SNAKE_HEAD];
        const nextX = headX - 1;
        const nextHeadX = nextX < 0 ? PLAYFIELD_SIZE - 1 : nextX;
        return [nextHeadX, headY];
      }

      case DIRECTION.DOWN: {
        const [headX, headY] = this.snakePosition[SNAKE_HEAD];
        const nextX = headX + 1;
        const nextHeadX = nextX < PLAYFIELD_SIZE ? nextX : 0;
        return [nextHeadX, headY];
      }

      case DIRECTION.LEFT: {
        const [headX, headY] = this.snakePosition[SNAKE_HEAD];
        const nextY = headY - 1;
        const nextHeadY = nextY < 0 ? PLAYFIELD_SIZE - 1 : nextY;
        return [headX, nextHeadY];
      }

      case DIRECTION.RIGHT:
      default: {
        const [headX, headY] = this.snakePosition[SNAKE_HEAD];
        const nextY = headY + 1;
        const nextHeadY = nextY < PLAYFIELD_SIZE ? nextY : 0;
        return [headX, nextHeadY];
      }
    }
  }

  private isGameOver(nextHeadPosition: Position): boolean {
    return this.snakePosition.some(
      (snakePartPosition) =>
        snakePartPosition[POSITION_X] === nextHeadPosition[POSITION_X] &&
        snakePartPosition[POSITION_Y] === nextHeadPosition[POSITION_Y]
    );
  }

  private wasAppleEaten(nextHeadPosition: Position): boolean {
    if (!this.applePosition) return false;

    return (
      nextHeadPosition[POSITION_X] === this.applePosition[POSITION_X] &&
      nextHeadPosition[POSITION_Y] === this.applePosition[POSITION_Y]
    );
  }

  private calculateNextSnakePosition(nextHeadPosition: Position, wasAppleEaten: boolean): SnakePosition {
    const lastSnakePartPosition = this.snakePosition[this.snakePosition.length - 1];

    const nextSnakePosition = this.snakePosition.map((_, index, array) =>
      index === SNAKE_HEAD ? nextHeadPosition : array[index - 1]
    );

    if (wasAppleEaten) {
      nextSnakePosition.push(lastSnakePartPosition);
    }

    return nextSnakePosition;
  }

  private setDefault() {
    this.canChangeDirection = true;
    this.snakeDirection = SNAKE_START_DIRECTION;
    this.snakePosition = SNAKE_START_POSITION;
    this.applePosition = undefined;
  }

  private draw() {
    this.playfield.draw(this.snakePosition, this.applePosition);
  }

  private hasFreeCells() {
    const cellsAmount = PLAYFIELD_SIZE * PLAYFIELD_SIZE;
    return this.snakePosition.length < cellsAmount;
  }

  private createNewApplePosition(snakePosition: SnakePosition): Position {
    let posX: number;
    let posY: number;

    do {
      posX = Math.floor(Math.random() * PLAYFIELD_SIZE);
      posY = Math.floor(Math.random() * PLAYFIELD_SIZE);
      // eslint-disable-next-line no-loop-func
    } while (snakePosition.some((snakePart) => snakePart[POSITION_X] === posX && snakePart[POSITION_Y] === posY));

    return [posX, posY];
  }

  private enableControl() {
    document.addEventListener('keydown', this.changeDirection.bind(this));
  }

  private changeDirection({ key }: KeyboardEvent) {
    if (key === KEYS.ARROW_UP) this.turnUp();
    if (key === KEYS.ARROW_DOWN) this.turnDown();
    if (key === KEYS.ARROW_LEFT) this.turnLeft();
    if (key === KEYS.ARROW_RIGHT) this.turnRight();
  }

  private turnUp() {
    if (this.canChangeDirection && this.snakeDirection !== DIRECTION.UP && this.snakeDirection !== DIRECTION.DOWN) {
      this.snakeDirection = DIRECTION.UP;
      this.canChangeDirection = false;
    }
  }

  private turnDown() {
    if (this.canChangeDirection && this.snakeDirection !== DIRECTION.DOWN && this.snakeDirection !== DIRECTION.UP) {
      this.snakeDirection = DIRECTION.DOWN;
      this.canChangeDirection = false;
    }
  }

  private turnLeft() {
    if (this.canChangeDirection && this.snakeDirection !== DIRECTION.LEFT && this.snakeDirection !== DIRECTION.RIGHT) {
      this.snakeDirection = DIRECTION.LEFT;
      this.canChangeDirection = false;
    }
  }

  private turnRight() {
    if (this.canChangeDirection && this.snakeDirection !== DIRECTION.RIGHT && this.snakeDirection !== DIRECTION.LEFT) {
      this.snakeDirection = DIRECTION.RIGHT;
      this.canChangeDirection = false;
    }
  }
}
