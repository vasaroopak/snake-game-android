import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Direction } from '../types';
import { GAME_CONFIG } from '../utils/constants';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  onReset: () => void;
  isPaused: boolean;
  gameOver: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onDirectionChange,
  onPause,
  onReset,
  isPaused,
  gameOver,
}) => {
  return (
    <View style={styles.container}>
      {/* Direction Controls */}
      <View style={styles.directionalPad}>
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => onDirectionChange(Direction.UP)}
            disabled={gameOver}
          >
            <Text style={styles.directionText}>▲</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.middleRow}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => onDirectionChange(Direction.LEFT)}
            disabled={gameOver}
          >
            <Text style={styles.directionText}>◄</Text>
          </TouchableOpacity>
          
          <View style={styles.centerSpace} />
          
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => onDirectionChange(Direction.RIGHT)}
            disabled={gameOver}
          >
            <Text style={styles.directionText}>►</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => onDirectionChange(Direction.DOWN)}
            disabled={gameOver}
          >
            <Text style={styles.directionText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Game Controls */}
      <View style={styles.gameControls}>
        <TouchableOpacity
          style={[styles.controlButton, gameOver && styles.disabledButton]}
          onPress={onPause}
          disabled={gameOver}
        >
          <Text style={styles.controlButtonText}>
            {isPaused ? 'Resume' : 'Pause'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onReset}
        >
          <Text style={styles.controlButtonText}>
            {gameOver ? 'New Game' : 'Reset'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  directionalPad: {
    marginBottom: 20,
  },
  topRow: {
    alignItems: 'center',
    marginBottom: 5,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bottomRow: {
    alignItems: 'center',
  },
  centerSpace: {
    width: 60,
  },
  directionButton: {
    width: 60,
    height: 60,
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
  },
  directionText: {
    fontSize: 24,
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontWeight: 'bold',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#7F8C8D',
  },
  controlButtonText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});