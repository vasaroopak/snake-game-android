import AsyncStorage from '@react-native-async-storage/async-storage';

const HIGH_SCORE_KEY = '@snake_game_high_score';

export const saveHighScore = async (score: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
  } catch (error) {
    console.error('Failed to save high score:', error);
  }
};

export const getHighScore = async (): Promise<number> => {
  try {
    const score = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    return score ? parseInt(score, 10) : 0;
  } catch (error) {
    console.error('Failed to get high score:', error);
    return 0;
  }
};