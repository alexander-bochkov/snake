import { POSITION_X, POSITION_Y } from '../constants';
import type { Position, SnakePosition } from '../types';
import {
  APP_ID,
  BORDER_RADIUS,
  CANVAS_SIZE,
  CELL_GAP,
  CELL_SIZE,
  CELL_TYPE,
  CELL,
  FILL_GAP,
  FILL_SIZE,
  PLAYFIELD_ID,
  PLAYFIELD_SIZE,
  STROKE_WIDTH,
} from './constants';

export default class Playfield {
  constructor() {
    this.init();
  }

  private init() {
    const playField = document.createElement('canvas');
    playField.setAttribute('id', PLAYFIELD_ID);
    playField.setAttribute('height', CANVAS_SIZE);
    playField.setAttribute('width', CANVAS_SIZE);

    const app = document.getElementById(APP_ID);
    app?.appendChild(playField);
  }

  draw(snakePosition: SnakePosition, applePosition: Position) {
    this.clearPlayfield();
    this.drawCells(snakePosition, applePosition);
  }

  private clearPlayfield() {
    const playField = document.getElementById(PLAYFIELD_ID) as HTMLCanvasElement | null;
    const context = playField?.getContext('2d');

    if (!playField || !context) return;

    context.clearRect(0, 0, playField.width, playField.height);
  }

  private drawCells(snakePosition: SnakePosition, applePosition: Position) {
    for (let row = 0; row < PLAYFIELD_SIZE; row += 1) {
      for (let column = 0; column < PLAYFIELD_SIZE; column += 1) {
        const cellType = this.getCellType(row, column, snakePosition, applePosition);
        this.drawCell(row, column, cellType);
      }
    }
  }

  private getCellType(row: number, column: number, snakePosition: SnakePosition, applePosition: Position): CELL_TYPE {
    if (this.isApple(row, column, applePosition)) return CELL_TYPE.APPLE;
    if (this.isSnakePart(row, column, snakePosition)) return CELL_TYPE.SNAKE_PART;
    return CELL_TYPE.GROUND;
  }

  private isApple(row: number, column: number, applePosition: Position): boolean {
    return applePosition[POSITION_X] === row && applePosition[POSITION_Y] === column;
  }

  private isSnakePart(row: number, column: number, snakePosition: SnakePosition) {
    return snakePosition.some((snakePart) => snakePart[POSITION_X] === row && snakePart[POSITION_Y] === column);
  }

  private drawCell(row: number, column: number, type: CELL_TYPE) {
    // Half of the stroke is drawn on the inner side, and half on the outer side
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
    const offset = STROKE_WIDTH / 2;

    const totalGapSizeX = column * CELL_GAP;
    const totalCellsSizeX = column * CELL_SIZE;

    const totalGapSizeY = row * CELL_GAP;
    const totalCellsSizeY = row * CELL_SIZE;

    const strokeX = totalGapSizeX + totalCellsSizeX + offset;
    const strokeY = totalGapSizeY + totalCellsSizeY + offset;

    const fillX = strokeX + FILL_GAP + offset;
    const fillY = strokeY + FILL_GAP + offset;

    this.drawStroke(strokeX, strokeY, type);
    this.drawFill(fillX, fillY, type);
  }

  private drawStroke(x: number, y: number, type: CELL_TYPE) {
    const playField = document.getElementById(PLAYFIELD_ID) as HTMLCanvasElement | null;
    const context = playField?.getContext('2d');

    if (!playField || !context) return;

    const size = CELL_SIZE - STROKE_WIDTH;

    context.beginPath();
    context.lineWidth = STROKE_WIDTH;
    context.strokeStyle = CELL[type].STROKE_COLOR;
    context.roundRect(x, y, size, size, BORDER_RADIUS);
    context.stroke();
  }

  private drawFill(x: number, y: number, type: CELL_TYPE) {
    const playField = document.getElementById(PLAYFIELD_ID) as HTMLCanvasElement | null;
    const context = playField?.getContext('2d');

    if (!playField || !context) return;

    context.beginPath();
    context.fillStyle = CELL[type].FILL_COLOR;
    context.roundRect(x, y, FILL_SIZE, FILL_SIZE, BORDER_RADIUS);
    context.fill();
  }
}
