interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="timer-card" aria-label={`Time remaining ${timeLeft} seconds`}>
      <span className="timer-label">Time</span>
      <strong className="timer-value">{timeLeft}s</strong>
    </div>
  );
}
