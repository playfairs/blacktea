import { InputBox } from './InputBox';
import { Prompt } from './Prompt';
import { Results } from './Results';
import { Score } from './Score';
import { Timer } from './Timer';

interface GameProps {
  prompt: string;
  timeLeft: number;
  score: number;
  round: number;
  usedWords: string[];
  feedback: string;
  onSubmit: (value: string) => void;
  onRestart: () => void;
  disabled: boolean;
}

export function Game({
  prompt,
  timeLeft,
  score,
  round,
  usedWords,
  feedback,
  onSubmit,
  onRestart,
  disabled,
}: GameProps) {
  return (
    <section className="game-card">
      <div className="game-head">
        <div>
          <p className="eyebrow">Competitive word play</p>
          <h1>Blacktea</h1>
        </div>
        <button className="ghost-button" onClick={onRestart} type="button">
          Restart
        </button>
      </div>

      <div className="stats-row">
        <Prompt prompt={prompt} />
        <Timer timeLeft={timeLeft} />
        <Score score={score} round={round} />
      </div>

      <InputBox onSubmit={onSubmit} disabled={disabled} />
      <Results feedback={feedback} usedWords={usedWords} />
    </section>
  );
}
