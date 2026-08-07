import type { GameState } from '../types/game';
import { ROUND_DURATION, validateSubmission } from './validator';
import { generatePrompt } from './generator';
import { scoreWord } from './scoring';

export function createInitialGameState(): GameState {
  return {
    round: 0,
    prompt: '',
    timeLeft: ROUND_DURATION,
    usedWords: [],
    score: 0,
    status: 'ready',
    feedback: 'Press start to begin.',
  };
}

export function createRoundState(previousState: GameState, dictionary: string[]): GameState {
  return {
    ...previousState,
    round: previousState.round + 1,
    prompt: generatePrompt(dictionary, [previousState.prompt]),
    timeLeft: ROUND_DURATION,
    usedWords: [],
    status: 'playing',
    feedback: 'Find a word that fits the prompt.',
  };
}

export function submitWordToGame(
  currentState: GameState,
  word: string,
  dictionary: string[],
): { nextState: GameState; result: ReturnType<typeof validateSubmission> } {
  const result = validateSubmission({
    word,
    prompt: currentState.prompt,
    usedWords: currentState.usedWords,
    dictionary,
  });

  if (!result.accepted) {
    return {
      nextState: {
        ...currentState,
        feedback: result.reason,
      },
      result,
    };
  }

  return {
    nextState: {
      ...currentState,
      usedWords: [...currentState.usedWords, result.word],
      score: currentState.score + scoreWord(result.word, currentState.prompt),
      feedback: `${result.word} accepted.`,
    },
    result,
  };
}
