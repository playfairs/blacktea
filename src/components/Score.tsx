interface ScoreProps {
  score: number;
  round: number;
}

export function Score({ score, round }: ScoreProps) {
  return (
    <div className="score-card">
      <span>Round {round}</span>
      <strong>{score} pts</strong>
    </div>
  );
}
