import Game from './Game';
import Playfield from './Playfield';
import './style.scss';

const game = new Game(new Playfield());

game.start();
