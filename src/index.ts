import Apple from './Apple';
import Game from './Game';
import Playfield from './Playfield';
import Snake from './Snake';
import { COLUMNS, ROWS, SNAKE_START_DIRECTION, SNAKE_START_POSITION } from './constants';
import './style.scss';

const game = new Game(
  new Playfield(),
  new Snake(SNAKE_START_POSITION, SNAKE_START_DIRECTION),
  new Apple(Apple.createNewPosition([SNAKE_START_POSITION], ROWS, COLUMNS))
);

game.start();
