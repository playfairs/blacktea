import { useCallback, useEffect, useState } from 'react';
import { createInitialGameState, createRoundState, submitWordToGame } from '../game/engine';
import type { GameState } from '../types/game';

export function useGame(dictionary: string[]) {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());

  const startNextRound = useCallback(() => {
    setGameState((previousState) => createRoundState(previousState, dictionary));
  }, [dictionary]);

  useEffect(() => {
    if (dictionary.length === 0 || gameState.status !== 'ready') {
      return;
    }

    startNextRound();
  }, [dictionary, gameState.status, startNextRound]);

  useEffect(() => {
    if (gameState.status !== 'playing') {
      return;
    }

    if (gameState.timeLeft <= 0) {
      const timer = window.setTimeout(() => {
        startNextRound();
      }, 700);

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
  }, [gameState.status, gameState.timeLeft, startNextRound]);

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
    setGameState(createInitialGameState());
  }, []);

  return {
    gameState,
    submitWord,
    restartGame,
  };
}
