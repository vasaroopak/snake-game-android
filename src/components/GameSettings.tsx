import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { GAME_CONFIG } from '../utils/constants';

interface GameSettingsProps {
  visible: boolean;
  onClose: () => void;
  onSpeedChange: (speed: number) => void;
  onBoardSizeChange: (size: number) => void;
  currentSpeed: number;
  currentBoardSize: number;
}

export const GameSettings: React.FC<GameSettingsProps> = ({
  visible,
  onClose,
  onSpeedChange,
  onBoardSizeChange,
  currentSpeed,
  currentBoardSize,
}) => {
  const speedOptions = [
    { label: 'Slow', value: 200 },
    { label: 'Normal', value: 150 },
    { label: 'Fast', value: 100 },
    { label: 'Very Fast', value: 70 },
  ];

  const boardSizeOptions = [
    { label: 'Small (15x15)', value: 15 },
    { label: 'Normal (20x20)', value: 20 },
    { label: 'Large (25x25)', value: 25 },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Game Settings</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Game Speed</Text>
            {speedOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  currentSpeed === option.value && styles.selectedOption,
                ]}
                onPress={() => onSpeedChange(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentSpeed === option.value && styles.selectedOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Board Size</Text>
            {boardSizeOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  currentBoardSize === option.value && styles.selectedOption,
                ]}
                onPress={() => onBoardSizeChange(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    currentBoardSize === option.value && styles.selectedOptionText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxWidth: 350,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GAME_CONFIG.COLORS.TEXT,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: GAME_CONFIG.COLORS.TEXT,
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#34495E',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
  },
  optionText: {
    color: GAME_CONFIG.COLORS.TEXT,
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: GAME_CONFIG.COLORS.BUTTON,
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: GAME_CONFIG.COLORS.BUTTON_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});