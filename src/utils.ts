import { SEPARATOR } from './constants';
import type { Position } from './types';

// eslint-disable-next-line import/prefer-default-export
export const convertPositionToId = (position: Position) => position.join(SEPARATOR);
