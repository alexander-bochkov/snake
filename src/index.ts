import Game from './Game';
import Playfield from './Playfield';
import Score from './Score';
import './style.scss';

const game = new Game(new Playfield(), new Score());

game.start();
