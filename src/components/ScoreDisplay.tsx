import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GAME_CONFIG } from '../utils/constants';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
  gameOver: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  score, 
  highScore, 
  gameOver 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreRow}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
        </View>
        
        <View style={styles.scoreItem}>
          <Text style={styles.scoreLabel}>High Score</Text>
          <Text style={styles.scoreValue}>{highScore}</Text>
        </View>
      </View>
      
      {gameOver && (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          {score === highScore && score > 0 && (
            <Text style={styles.newRecordText}>New High Score! 🎉</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  scoreItem: {
    alignItems: 'center',
    minWidth: 120,
  },
  scoreLabel: {
    fontSize: 14,
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 5,
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 24,
    color: GAME_CONFIG.COLORS.TEXT,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameOverContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  gameOverText: {
    fontSize: 28,
    color: '#E74C3C',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  newRecordText: {
    fontSize: 16,
    color: '#F39C12',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});