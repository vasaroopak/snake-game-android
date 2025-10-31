import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Position } from '../types';
import { GAME_CONFIG } from '../utils/constants';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

export const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    
    let cellStyle: any = styles.cell;
    
    if (isSnakeHead) {
      cellStyle = [styles.cell, styles.snakeHead];
    } else if (isSnakeBody) {
      cellStyle = [styles.cell, styles.snakeBody];
    } else if (isFood) {
      cellStyle = [styles.cell, styles.food];
    }
    
    return (
      <View
        key={`${x}-${y}`}
        style={cellStyle}
      />
    );
  };

  const renderRow = (y: number) => {
    const cells = [];
    for (let x = 0; x < GAME_CONFIG.BOARD_SIZE; x++) {
      cells.push(renderCell(x, y));
    }
    return (
      <View key={y} style={styles.row}>
        {cells}
      </View>
    );
  };

  const renderBoard = () => {
    const rows = [];
    for (let y = 0; y < GAME_CONFIG.BOARD_SIZE; y++) {
      rows.push(renderRow(y));
    }
    return rows;
  };

  return (
    <View style={styles.board}>
      {renderBoard()}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    backgroundColor: GAME_CONFIG.COLORS.BACKGROUND,
    borderWidth: 2,
    borderColor: GAME_CONFIG.COLORS.BORDER,
    padding: 4,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: GAME_CONFIG.CELL_SIZE,
    height: GAME_CONFIG.CELL_SIZE,
    margin: 0.5,
    backgroundColor: GAME_CONFIG.COLORS.BACKGROUND,
  },
  snakeHead: {
    backgroundColor: GAME_CONFIG.COLORS.SNAKE_HEAD,
    borderRadius: 2,
  },
  snakeBody: {
    backgroundColor: GAME_CONFIG.COLORS.SNAKE_BODY,
    borderRadius: 1,
  },
  food: {
    backgroundColor: GAME_CONFIG.COLORS.FOOD,
    borderRadius: GAME_CONFIG.CELL_SIZE / 2,
  },
});