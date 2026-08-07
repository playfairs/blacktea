import type { DifficultyMode, GameState } from '../types/game';
import { validateSubmission, findPossibleWords } from './validator';
import { generatePrompt } from './generator';
import { scoreWord } from './scoring';

const MODE_SETTINGS: Record<DifficultyMode, { lives: number; time: number }> = {
  easy: { lives: 5, time: 15 },
  medium: { lives: 3, time: 10 },
  hard: { lives: 1, time: 5 },
};

const MIN_POSSIBLE_WORDS_FOR_PENALTY = 4;

export function getModeSettings(mode: DifficultyMode) {
  return MODE_SETTINGS[mode];
}

export function createInitialGameState(mode: DifficultyMode = 'medium'): GameState {
  const settings = getModeSettings(mode);

  return {
    round: 0,
    prompt: '',
    timeLeft: settings.time,
    usedWords: [],
    possibleWords: [],
    wordsThisRound: 0,
    lives: settings.lives,
    mode,
    score: 0,
    status: 'ready',
    feedback: 'Select a mode and start.',
  };
}

export function createRoundState(
  previousState: GameState,
  dictionary: string[],
  feedback: string = 'Find a word that fits the prompt.',
): GameState {
  const prompt = generatePrompt(dictionary, [previousState.prompt]);
  const possibleWords = findPossibleWords(prompt, dictionary, previousState.usedWords);
  const settings = getModeSettings(previousState.mode);

  return {
    ...previousState,
    round: previousState.round + 1,
    prompt,
    timeLeft: settings.time,
    possibleWords,
    wordsThisRound: 0,
    status: 'playing',
    feedback,
  };
}

export function createReviewState(
  currentState: GameState,
  dictionary: string[],
): GameState {
  const possibleWords = findPossibleWords(currentState.prompt, dictionary, currentState.usedWords);
  const penalty = possibleWords.length >= MIN_POSSIBLE_WORDS_FOR_PENALTY ? 1 : 0;
  const nextLives = Math.max(0, currentState.lives - penalty);
  const nextStatus = nextLives === 0 ? 'gameover' : 'review';

  return {
    ...currentState,
    status: nextStatus,
    timeLeft: 0,
    lives: nextLives,
    possibleWords,
    feedback:
      nextStatus === 'gameover'
        ? 'Game over. You ran out of lives.'
        : possibleWords.length === 0
        ? 'No valid words were available this prompt.'
        : `Missed it. ${Math.min(5, possibleWords.length)} possible words shown.`,
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

  const acceptedState = {
    ...currentState,
    usedWords: [...currentState.usedWords, result.word],
    score: currentState.score + scoreWord(result.word, currentState.prompt),
    wordsThisRound: currentState.wordsThisRound + 1,
  };

  const nextState = createRoundState(acceptedState, dictionary, `${result.word} accepted. New prompt ready.`);

  return {
    nextState,
    result,
  };
}
