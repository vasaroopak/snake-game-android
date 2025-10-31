import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Direction } from '../types';

interface SwipeControlsProps {
  onDirectionChange: (direction: Direction) => void;
  gameOver: boolean;
  children: React.ReactNode;
}

const { width, height } = Dimensions.get('window');

export const SwipeControls: React.FC<SwipeControlsProps> = ({
  onDirectionChange,
  gameOver,
  children,
}) => {
  const handleGesture = (event: any) => {
    if (gameOver) return;

    const { translationX, translationY, state } = event.nativeEvent;

    if (state === State.END) {
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);

      // Minimum swipe distance
      const minSwipeDistance = 30;

      if (absX > minSwipeDistance || absY > minSwipeDistance) {
        if (absX > absY) {
          // Horizontal swipe
          if (translationX > 0) {
            onDirectionChange(Direction.RIGHT);
          } else {
            onDirectionChange(Direction.LEFT);
          }
        } else {
          // Vertical swipe
          if (translationY > 0) {
            onDirectionChange(Direction.DOWN);
          } else {
            onDirectionChange(Direction.UP);
          }
        }
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleGesture}>
      <View style={styles.container}>
        {children}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            Swipe to control the snake
          </Text>
        </View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  instructionsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  instructionsText: {
    color: '#BDC3C7',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
});