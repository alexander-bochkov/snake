import { POSITION_X, POSITION_Y } from './constants';
import type { Position, SnakePosition } from './types';

export default class Apple {
  private position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  setPosition(nextPosition: Position) {
    this.position = nextPosition;
  }

  static createNewPosition(snakePosition: SnakePosition, rows: number, columns: number): Position {
    let posX: number;
    let posY: number;

    do {
      posX = Math.floor(Math.random() * rows);
      posY = Math.floor(Math.random() * columns);
      // eslint-disable-next-line no-loop-func
    } while (snakePosition.some((snakePart) => snakePart[POSITION_X] === posX && snakePart[POSITION_Y] === posY));

    return [posX, posY];
  }
}
