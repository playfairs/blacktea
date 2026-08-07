export type DifficultyMode = 'easy' | 'medium' | 'hard';
export type GameStatus = 'ready' | 'playing' | 'review' | 'gameover';

export interface GameState {
  round: number;
  prompt: string;
  timeLeft: number;
  usedWords: string[];
  possibleWords: string[];
  wordsThisRound: number;
  lives: number;
  mode: DifficultyMode;
  score: number;
  status: GameStatus;
  feedback: string;
}

export interface SubmissionResult {
  accepted: boolean;
  word: string;
  reason: string;
}
