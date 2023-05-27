import { DIRECTION } from './constants';
import type { Position, SnakePosition } from './types';

export default class Snake {
  private position: SnakePosition = [];

  private direction: DIRECTION;

  private canChangeDirection = true;

  constructor(startPosition: Position, startDirection: DIRECTION) {
    this.position.push(startPosition);
    this.direction = startDirection;
  }

  getPosition() {
    return this.position;
  }

  setPosition(nextPosition: SnakePosition) {
    this.position = nextPosition;
  }

  getDirection() {
    return this.direction;
  }

  setDirection(nextDirection: DIRECTION) {
    this.direction = nextDirection;
  }

  getCanChangeDirection() {
    return this.canChangeDirection;
  }

  setCanChangeDirection(nextCanChangeDirection: boolean) {
    this.canChangeDirection = nextCanChangeDirection;
  }
}
