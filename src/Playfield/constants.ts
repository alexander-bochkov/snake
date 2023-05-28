export const APP_ID = 'app';
export const PLAYFIELD_ID = 'playfield';

export const CANVAS_SIZE = '418';

export const PLAYFIELD_SIZE = 10;

export const BORDER_RADIUS = 2;

export const CELL_GAP = 2;
export const CELL_SIZE = 40;

export const FILL_GAP = 4;
export const FILL_SIZE = 28;

export const STROKE_WIDTH = 2;

export enum CELL_TYPE {
  APPLE = 'apple',
  GROUND = 'ground',
  SNAKE_PART = 'snakePart',
}

const APPLE_CELL = {
  FILL_COLOR: '#D90513',
  STROKE_COLOR: '#9B4534',
};

const GROUND_CELL = {
  FILL_COLOR: '#7EA177',
  STROKE_COLOR: '#7EA177',
};

const SNAKE_PART_CELL = {
  FILL_COLOR: '#333331',
  STROKE_COLOR: '#364A2F',
};

export const CELL = {
  [CELL_TYPE.APPLE]: APPLE_CELL,
  [CELL_TYPE.GROUND]: GROUND_CELL,
  [CELL_TYPE.SNAKE_PART]: SNAKE_PART_CELL,
};
