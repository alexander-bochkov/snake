import Apple from './Apple';
import Playfield from './Playfield';
import Snake from './Snake';
import {
  COLUMNS,
  DIRECTION,
  KEYS,
  POSITION_X,
  POSITION_Y,
  ROWS,
  SNAKE_HEAD,
  SNAKE_START_DIRECTION,
  SNAKE_START_POSITION,
  START_DELAY,
  STEP_INTERVAL,
} from './constants';
import type { Position, SnakePosition } from './types';

export default class Game {
  private readonly playfield: Playfield;

  private readonly snake: Snake;

  private readonly apple: Apple;

  private timer: NodeJS.Timeout | null = null;

  constructor(playfield: Playfield, snake: Snake, apple: Apple) {
    this.playfield = playfield;
    this.snake = snake;
    this.apple = apple;
  }

  start() {
    const snakePosition = this.snake.getPosition();
    const applePosition = this.apple.getPosition();

    this.playfield.renderField();
    this.playfield.renderSnake(snakePosition);
    this.playfield.renderApple(applePosition);

    this.activateControl();
    setTimeout(this.startMovement.bind(this), START_DELAY);
  }

  restart() {
    this.stopMovement();

    this.playfield.removeSnake();
    this.playfield.removeApple();

    this.snake.setPosition([SNAKE_START_POSITION]);
    this.snake.setDirection(SNAKE_START_DIRECTION);

    const snakePosition = this.snake.getPosition();
    this.apple.setPosition(Apple.createNewPosition(snakePosition, ROWS, COLUMNS));

    const applePosition = this.apple.getPosition();

    this.playfield.renderSnake(snakePosition);
    this.playfield.renderApple(applePosition);

    setTimeout(this.startMovement.bind(this), START_DELAY);
  }

  private startMovement() {
    this.timer = setInterval(this.step.bind(this), STEP_INTERVAL);
  }

  private stopMovement() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private activateControl() {
    document.addEventListener('keydown', ({ key }) => {
      const snakeDirection = this.snake.getDirection();
      const canChangeDirection = this.snake.getCanChangeDirection();

      switch (key) {
        case KEYS.ARROW_UP: {
          if (canChangeDirection && snakeDirection !== DIRECTION.UP && snakeDirection !== DIRECTION.DOWN) {
            this.snake.setDirection(DIRECTION.UP);
            this.snake.setCanChangeDirection(false);
          }
          break;
        }

        case KEYS.ARROW_DOWN: {
          if (canChangeDirection && snakeDirection !== DIRECTION.DOWN && snakeDirection !== DIRECTION.UP) {
            this.snake.setDirection(DIRECTION.DOWN);
            this.snake.setCanChangeDirection(false);
          }
          break;
        }

        case KEYS.ARROW_RIGHT: {
          if (canChangeDirection && snakeDirection !== DIRECTION.RIGHT && snakeDirection !== DIRECTION.LEFT) {
            this.snake.setDirection(DIRECTION.RIGHT);
            this.snake.setCanChangeDirection(false);
          }
          break;
        }

        case KEYS.ARROW_LEFT: {
          if (canChangeDirection && snakeDirection !== DIRECTION.LEFT && snakeDirection !== DIRECTION.RIGHT) {
            this.snake.setDirection(DIRECTION.LEFT);
            this.snake.setCanChangeDirection(false);
          }
          break;
        }

        default:
      }
    });
  }

  private step() {
    const snakeDirection = this.snake.getDirection();

    switch (snakeDirection) {
      case DIRECTION.RIGHT: {
        this.playfield.removeSnake();

        const [headX, headY] = this.snake.getPosition()[SNAKE_HEAD];
        const nextY = headY + 1;
        const nextHeadY = nextY < COLUMNS ? nextY : 0;
        const nextHeadPosition: Position = [headX, nextHeadY];

        if (this.isGameOver(nextHeadPosition)) {
          this.restart();
          break;
        }

        let nextSnakePosition: SnakePosition;

        const wasAppleEaten = this.wasAppleEaten(nextHeadPosition);

        if (wasAppleEaten) {
          this.playfield.removeApple();

          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);

          const nextApplePosition = Apple.createNewPosition(nextSnakePosition, ROWS, COLUMNS);
          this.apple.setPosition(nextApplePosition);
          this.playfield.renderApple(nextApplePosition);
        } else {
          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);
        }

        this.snake.setPosition(nextSnakePosition);
        this.playfield.renderSnake(nextSnakePosition);

        break;
      }

      case DIRECTION.LEFT: {
        this.playfield.removeSnake();

        const [headX, headY] = this.snake.getPosition()[SNAKE_HEAD];
        const nextY = headY - 1;
        const nextHeadY = nextY < 0 ? COLUMNS - 1 : nextY;
        const nextHeadPosition: Position = [headX, nextHeadY];

        if (this.isGameOver(nextHeadPosition)) {
          this.restart();
          break;
        }

        let nextSnakePosition: SnakePosition;

        const wasAppleEaten = this.wasAppleEaten(nextHeadPosition);

        if (wasAppleEaten) {
          this.playfield.removeApple();

          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);

          const nextApplePosition = Apple.createNewPosition(nextSnakePosition, ROWS, COLUMNS);
          this.apple.setPosition(nextApplePosition);
          this.playfield.renderApple(nextApplePosition);
        } else {
          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);
        }

        this.snake.setPosition(nextSnakePosition);
        this.playfield.renderSnake(nextSnakePosition);

        break;
      }

      case DIRECTION.DOWN: {
        this.playfield.removeSnake();

        const [headX, headY] = this.snake.getPosition()[SNAKE_HEAD];
        const nextX = headX + 1;
        const nextHeadX = nextX < ROWS ? nextX : 0;
        const nextHeadPosition: Position = [nextHeadX, headY];

        if (this.isGameOver(nextHeadPosition)) {
          this.restart();
          break;
        }

        let nextSnakePosition: SnakePosition;

        const wasAppleEaten = this.wasAppleEaten(nextHeadPosition);

        if (wasAppleEaten) {
          this.playfield.removeApple();

          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);

          const nextApplePosition = Apple.createNewPosition(nextSnakePosition, ROWS, COLUMNS);
          this.apple.setPosition(nextApplePosition);
          this.playfield.renderApple(nextApplePosition);
        } else {
          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);
        }

        this.snake.setPosition(nextSnakePosition);
        this.playfield.renderSnake(nextSnakePosition);

        break;
      }

      case DIRECTION.UP: {
        this.playfield.removeSnake();

        const [headX, headY] = this.snake.getPosition()[SNAKE_HEAD];
        const nextX = headX - 1;
        const nextHeadX = nextX < 0 ? ROWS - 1 : nextX;
        const nextHeadPosition: Position = [nextHeadX, headY];

        if (this.isGameOver(nextHeadPosition)) {
          this.restart();
          break;
        }

        let nextSnakePosition: SnakePosition;

        const wasAppleEaten = this.wasAppleEaten(nextHeadPosition);

        if (wasAppleEaten) {
          this.playfield.removeApple();

          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);

          const nextApplePosition = Apple.createNewPosition(nextSnakePosition, ROWS, COLUMNS);
          this.apple.setPosition(nextApplePosition);
          this.playfield.renderApple(nextApplePosition);
        } else {
          nextSnakePosition = this.calculateNextSnakePosition(nextHeadPosition, wasAppleEaten);
        }

        this.snake.setPosition(nextSnakePosition);
        this.playfield.renderSnake(nextSnakePosition);

        break;
      }

      default:
    }

    this.snake.setCanChangeDirection(true);
  }

  private isGameOver(nextHeadPosition: Position): boolean {
    const snakePosition = this.snake.getPosition();
    return snakePosition.some(
      (snakePartPosition) =>
        snakePartPosition[POSITION_X] === nextHeadPosition[POSITION_X] &&
        snakePartPosition[POSITION_Y] === nextHeadPosition[POSITION_Y]
    );
  }

  private wasAppleEaten(nextHeadPosition: Position): boolean {
    const applePosition = this.apple.getPosition();
    return (
      nextHeadPosition[POSITION_X] === applePosition[POSITION_X] &&
      nextHeadPosition[POSITION_Y] === applePosition[POSITION_Y]
    );
  }

  private calculateNextSnakePosition(nextHeadPosition: Position, wasAppleEaten: boolean): SnakePosition {
    const snakePosition = this.snake.getPosition();
    const lastSnakePartPosition = snakePosition[snakePosition.length - 1];

    const nextSnakePosition = snakePosition.map((_, index, array) =>
      index === SNAKE_HEAD ? nextHeadPosition : array[index - 1]
    );

    if (wasAppleEaten) {
      nextSnakePosition.push(lastSnakePartPosition);
    }

    return nextSnakePosition;
  }
}
