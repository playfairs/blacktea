import { useCallback, useEffect, useState } from 'react';
import { createInitialGameState, createRoundState, createReviewState, getModeSettings, submitWordToGame } from '../game/engine';
import type { DifficultyMode, GameState } from '../types/game';

const HIGH_SCORE_STORAGE_KEY = 'blackteaHighScore';

const getStoredHighScore = () => {
  if (typeof window === 'undefined') {
    return 0;
  }

  const stored = window.localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
  const parsed = stored ? Number(stored) : 0;
  return Number.isNaN(parsed) ? 0 : parsed;
};

export function useGame(dictionary: string[]) {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());
  const [highScore, setHighScore] = useState<number>(() => getStoredHighScore());

  const setMode = useCallback((mode: DifficultyMode) => {
    setGameState(createInitialGameState(mode));
  }, []);

  const startGame = useCallback(() => {
    setGameState((previousState) => createRoundState(previousState, dictionary));
  }, [dictionary]);

  useEffect(() => {
    if (gameState.status !== 'playing') {
      return;
    }

    if (gameState.timeLeft <= 0) {
      const timer = window.setTimeout(() => {
        setGameState((previousState) => createReviewState(previousState, dictionary));
      }, 200);

      return () => window.clearTimeout(timer);
    }

    const interval = window.setInterval(() => {
      setGameState((previousState) => {
        if (previousState.status !== 'playing') {
          return previousState;
        }

        return {
          ...previousState,
          timeLeft: previousState.timeLeft - 1,
        };
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [dictionary, gameState.status, gameState.timeLeft]);

  const submitWord = useCallback(
    (word: string) => {
      if (gameState.status !== 'playing') {
        return;
      }

      const { nextState } = submitWordToGame(gameState, word, dictionary);
      setGameState(nextState);
    },
    [dictionary, gameState],
  );

  const restartGame = useCallback(() => {
    setGameState((previousState) => createInitialGameState(previousState.mode));
  }, []);

  useEffect(() => {
    setHighScore((previousHighScore) => Math.max(previousHighScore, gameState.score));
  }, [gameState.score]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HIGH_SCORE_STORAGE_KEY, String(highScore));
    }
  }, [highScore]);

  return {
    gameState,
    highScore,
    setMode,
    startGame,
    submitWord,
    restartGame,
  };
}
