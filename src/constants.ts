import { Position } from './types';

export const COLUMNS = 10;
export const ROWS = 10;

export const SEPARATOR = ':';

export const APP_ID = 'app';
export const PLAYFIELD_ID = 'playfield';

export const APPLE_CLASS = 'apple';
export const SNAKE_CLASS = 'snake';

export const POSITION_X = 0;
export const POSITION_Y = 1;

export enum DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export const SNAKE_HEAD = 0;
export const SNAKE_START_DIRECTION = DIRECTION.RIGHT;
export const SNAKE_START_POSITION: Position = [2, 0];

export const START_DELAY = 400;
export const STEP_INTERVAL = 400;

export enum KEYS {
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_LEFT = 'ArrowLeft',
}
