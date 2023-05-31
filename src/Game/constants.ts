import type { SnakePosition } from '../common/types';

export const STEP_INTERVAL = 600;

export const SNAKE_HEAD = 0;

export enum DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const SNAKE_START_DIRECTION = DIRECTION.RIGHT;
export const SNAKE_START_POSITION: SnakePosition = [[2, 0]];

export enum KEYS {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
}
