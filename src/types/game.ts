export type GameStatus = 'ready' | 'playing';

export interface GameState {
  round: number;
  prompt: string;
  timeLeft: number;
  usedWords: string[];
  score: number;
  status: GameStatus;
  feedback: string;
}

export interface SubmissionResult {
  accepted: boolean;
  word: string;
  reason: string;
}
