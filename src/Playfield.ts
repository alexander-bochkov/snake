import { convertPositionToId } from './utils';
import { APP_ID, APPLE_CLASS, PLAYFIELD_ID, SEPARATOR, SNAKE_CLASS } from './constants';
import type { Position, SnakePosition } from './types';

export default class Playfield {
  private appEl: HTMLDivElement | null = null;

  private readonly rows: number;

  private readonly columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
  }

  private createRows(): Array<HTMLTableRowElement> {
    const rows: Array<HTMLTableRowElement> = [];

    for (let i = 0; i < this.rows; i += 1) {
      const row = document.createElement('tr');
      row.setAttribute('id', `${i}`);

      const cells = this.createCells(i);
      cells.forEach((cell) => row.appendChild(cell));

      rows.push(row);
    }

    return rows;
  }

  private createCells(rowId: number): Array<HTMLTableCellElement> {
    const cells: Array<HTMLTableCellElement> = [];

    for (let i = 0; i < this.columns; i += 1) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${rowId}${SEPARATOR}${i}`);

      cells.push(cell);
    }

    return cells;
  }

  renderField() {
    if (!this.appEl) {
      this.appEl = document.getElementById(APP_ID) as HTMLDivElement;
    }

    const playfield = document.createElement('table');
    playfield.setAttribute('id', PLAYFIELD_ID);

    const rows = this.createRows();
    rows.forEach((row) => playfield.appendChild(row));

    this.appEl.appendChild(playfield);
  }

  // eslint-disable-next-line class-methods-use-this
  renderSnake(snakePosition: SnakePosition) {
    snakePosition.forEach((position) => {
      const cell = document.getElementById(convertPositionToId(position));
      if (cell) cell.classList.add(SNAKE_CLASS);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  removeSnake() {
    const cells = document.querySelectorAll(`.${SNAKE_CLASS}`);
    cells.forEach((cell) => cell.classList.remove(SNAKE_CLASS));
  }

  // eslint-disable-next-line class-methods-use-this
  renderApple(applePosition: Position) {
    const cell = document.getElementById(convertPositionToId(applePosition));
    if (cell) cell.classList.add(APPLE_CLASS);
  }

  // eslint-disable-next-line class-methods-use-this
  removeApple() {
    const cell = document.querySelector(`.${APPLE_CLASS}`);
    if (cell) cell.classList.remove(APPLE_CLASS);
  }
}
