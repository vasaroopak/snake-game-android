import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, Alert, Dimensions, TouchableOpacity, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GameBoard } from './GameBoard';
import { GameControls } from './GameControls';
import { ScoreDisplay } from './ScoreDisplay';
// import { SwipeControls } from './SwipeControls';
import { GameSettings } from './GameSettings';
import { GameState, Direction } from '../types';
import { 
  initializeGame, 
  moveSnake, 
  checkCollision, 
  checkFoodCollision, 
  growSnake, 
  generateFood, 
  isValidDirection,
  calculateSpeed 
} from '../utils/gameLogic';
import { saveHighScore, getHighScore } from '../utils/storage';
import { soundManager } from '../utils/soundManager';
import { GAME_CONFIG } from '../utils/constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const SnakeGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [showSettings, setShowSettings] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.INITIAL_SPEED);
  const [boardSize, setBoardSize] = useState(GAME_CONFIG.BOARD_SIZE);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const nextDirectionRef = useRef<Direction>(Direction.UP);

  // Initialize sound manager
  useEffect(() => {
    soundManager.loadSounds();
    return () => {
      soundManager.cleanup();
    };
  }, []);

  // Load high score on component mount
  useEffect(() => {
    const loadHighScore = async () => {
      const savedHighScore = await getHighScore();
      setGameState(prev => ({ ...prev, highScore: savedHighScore }));
    };
    loadHighScore();
  }, []);

  // Save high score when it changes
  useEffect(() => {
    if (gameState.score > gameState.highScore) {
      setGameState(prev => ({ ...prev, highScore: prev.score }));
      saveHighScore(gameState.score);
    }
  }, [gameState.score, gameState.highScore]);

  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || prevState.isPaused) {
        return prevState;
      }

      const direction = nextDirectionRef.current;
      let newSnake = moveSnake(prevState.snake, direction);
      const head = newSnake[0];

      // Check collision
      if (checkCollision(head, prevState.snake)) {
        soundManager.playGameOverSound();
        return { ...prevState, gameOver: true };
      }

      let newScore = prevState.score;
      let newFood = prevState.food;

      // Check food collision
      if (checkFoodCollision(head, prevState.food)) {
        newSnake = growSnake(prevState.snake, direction);
        newFood = generateFood(newSnake);
        newScore = prevState.score + 10;
        
        // Play eat sound
        soundManager.playEatSound();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        direction,
      };
    });
  }, []);

  // Game loop
  useEffect(() => {
    if (!gameState.gameOver && !gameState.isPaused) {
      const speed = calculateSpeed(gameState.score);
      gameLoopRef.current = setInterval(updateGame, speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameOver, gameState.isPaused, gameState.score, updateGame]);

  const handleDirectionChange = useCallback((newDirection: Direction) => {
    if (isValidDirection(gameState.direction, newDirection)) {
      nextDirectionRef.current = newDirection;
    }
  }, [gameState.direction]);

  const handlePause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const handleReset = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    const newGame = initializeGame();
    newGame.highScore = gameState.highScore;
    setGameState(newGame);
    nextDirectionRef.current = Direction.UP;
  }, [gameState.highScore]);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setGameSpeed(newSpeed);
  }, []);

  const handleBoardSizeChange = useCallback((newSize: number) => {
    setBoardSize(newSize);
    // Reset game with new board size
    handleReset();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.headerRow}>
        <TouchableOpacity 
          style={styles.settingsButton} 
          onPress={() => setShowSettings(true)}
        >
          <Text style={styles.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <ScoreDisplay 
        score={gameState.score}
        highScore={gameState.highScore}
        gameOver={gameState.gameOver}
      />
      
      <View style={styles.gameContainer}>
        <GameBoard 
          snake={gameState.snake}
          food={gameState.food}
        />
      </View>
      
      <GameControls
        onDirectionChange={handleDirectionChange}
        onPause={handlePause}
        onReset={handleReset}
        isPaused={gameState.isPaused}
        gameOver={gameState.gameOver}
      />

      <GameSettings
        visible={showSettings}
        onClose={() => setShowSettings(false)}
        onSpeedChange={handleSpeedChange}
        onBoardSizeChange={handleBoardSizeChange}
        currentSpeed={gameSpeed}
        currentBoardSize={boardSize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A252F',
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  settingsButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
  },
  settingsButtonText: {
    fontSize: 20,
  },
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});