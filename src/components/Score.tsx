interface ScoreProps {
  score: number;
  round: number;
  lives: number;
  highScore: number;
}

export function Score({ score, round, lives, highScore }: ScoreProps) {
  return (
    <div className="score-card">
      <span>Round {round}</span>
      <strong>{score} pts</strong>
      <span className="lives-label">Lives: {lives}</span>
      <span className="high-score-label">Best: {highScore} pts</span>
    </div>
  );
}
