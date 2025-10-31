import { Position, Direction, GameState } from '../types';
import { GAME_CONFIG } from './constants';

export const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE),
      y: Math.floor(Math.random() * GAME_CONFIG.BOARD_SIZE),
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  return food;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkCollision = (head: Position, snake: Position[]): boolean => {
  // Check wall collision
  if (head.x < 0 || head.x >= GAME_CONFIG.BOARD_SIZE || 
      head.y < 0 || head.y >= GAME_CONFIG.BOARD_SIZE) {
    return true;
  }
  
  // Check self collision
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (head: Position, food: Position): boolean => {
  return head.x === food.x && head.y === food.y;
};

export const growSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case Direction.UP:
      head.y -= 1;
      break;
    case Direction.DOWN:
      head.y += 1;
      break;
    case Direction.LEFT:
      head.x -= 1;
      break;
    case Direction.RIGHT:
      head.x += 1;
      break;
  }
  
  return [head, ...snake];
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.RIGHT:
      return Direction.LEFT;
  }
};

export const isValidDirection = (currentDirection: Direction, newDirection: Direction): boolean => {
  return getOppositeDirection(currentDirection) !== newDirection;
};

export const calculateSpeed = (score: number): number => {
  return Math.max(50, GAME_CONFIG.INITIAL_SPEED - Math.floor(score / 50) * GAME_CONFIG.SPEED_INCREMENT);
};

export const initializeGame = (): GameState => {
  const initialSnake: Position[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ];
  
  return {
    snake: initialSnake,
    food: generateFood(initialSnake),
    direction: Direction.UP,
    gameOver: false,
    score: 0,
    highScore: 0,
    isPaused: false,
  };
};