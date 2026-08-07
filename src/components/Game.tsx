import { type DifficultyMode, type GameStatus } from '../types/game';
import { InputBox } from './InputBox';
import { Score } from './Score';
import { Timer } from './Timer';

const MODES: DifficultyMode[] = ['easy', 'medium', 'hard'];

interface GameProps {
  status: GameStatus;
  mode: DifficultyMode;
  prompt: string;
  timeLeft: number;
  score: number;
  round: number;
  lives: number;
  highScore: number;
  feedback: string;
  onModeChange: (mode: DifficultyMode) => void;
  onStart: () => void;
  onSubmit: (value: string) => void;
  onRestart: () => void;
  disabled: boolean;
}

export function Game({
  status,
  mode,
  prompt,
  timeLeft,
  score,
  round,
  lives,
  highScore,
  feedback,
  onModeChange,
  onStart,
  onSubmit,
  onRestart,
  disabled,
}: GameProps) {
  const isReady = status === 'ready';
  const isReview = status === 'review';
  const isGameOver = status === 'gameover';
  const promptLetters = isReady ? ['-', '-', '-'] : prompt.split('');

  return (
    <section className="game-card">
      <header className="game-header">
        <div>
          <p className="eyebrow">Competitive word play</p>
          <h1>Blacktea</h1>
          <p className="subtitle">Select a mode, then spell a word that contains the prompt letters.</p>
        </div>
        <div className="header-right">
          <button
            className="button"
            onClick={isReady ? onStart : isReview ? onStart : onRestart}
            type="button"
          >
            {isReady ? 'Start' : isReview ? 'Next' : 'Restart'}
          </button>
        </div>
      </header>

      <div className="mode-row">
        <span className="mode-label">Game mode</span>
        <div className="mode-picker">
          {MODES.map((option) => (
            <button
              key={option}
              type="button"
              className={`mode-button ${option === mode ? 'mode-active' : ''}`}
              onClick={() => onModeChange(option)}
              disabled={!isReady}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="status-row">
        <Score score={score} round={round} lives={lives} highScore={highScore} />
        <Timer timeLeft={isReady || isGameOver ? 0 : timeLeft} />
      </div>

      <div className="prompt-board">
        <div className="prompt-label">Prompt</div>
        <div className="prompt-grid" role="status" aria-live="polite">
          {promptLetters.map((letter, index) => (
            <div key={`${letter}-${index}`} className="prompt-cell">
              {letter}
            </div>
          ))}
        </div>
        <p className="prompt-note">
          {isReady
            ? 'Choose a mode and press start.'
            : isReview
            ? 'Review the missed words, then continue.'
            : isGameOver
            ? 'Game over. Restart to play again.'
            : 'Letters must appear in exact order.'}
        </p>
      </div>

      <div className="input-panel">
        <InputBox onSubmit={onSubmit} disabled={disabled || isGameOver} />
        <p className="feedback">{feedback}</p>
      </div>
    </section>
  );
}
