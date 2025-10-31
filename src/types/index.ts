export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  score: number;
  highScore: number;
  isPaused: boolean;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface GameConstants {
  BOARD_SIZE: number;
  CELL_SIZE: number;
  INITIAL_SPEED: number;
  SPEED_INCREMENT: number;
  COLORS: {
    BACKGROUND: string;
    SNAKE_HEAD: string;
    SNAKE_BODY: string;
    FOOD: string;
    BORDER: string;
    TEXT: string;
    BUTTON: string;
    BUTTON_TEXT: string;
  };
}