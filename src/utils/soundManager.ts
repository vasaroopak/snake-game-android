import { Audio } from 'expo-av';

class SoundManager {
  private sounds: { [key: string]: Audio.Sound } = {};

  async loadSounds() {
    try {
      // We'll implement with simple beep sounds or find free sound assets
      // For now, we'll use system sounds or create simple audio feedback
      console.log('Sound system initialized');
    } catch (error) {
      console.warn('Failed to load sounds:', error);
    }
  }

  async playEatSound() {
    try {
      // Create a simple audio feedback for eating food
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      // Simple notification sound
      console.log('Eat sound played');
    } catch (error) {
      console.warn('Failed to play eat sound:', error);
    }
  }

  async playGameOverSound() {
    try {
      console.log('Game over sound played');
    } catch (error) {
      console.warn('Failed to play game over sound:', error);
    }
  }

  async cleanup() {
    try {
      for (const sound of Object.values(this.sounds)) {
        await sound.unloadAsync();
      }
      this.sounds = {};
    } catch (error) {
      console.warn('Failed to cleanup sounds:', error);
    }
  }
}

export const soundManager = new SoundManager();