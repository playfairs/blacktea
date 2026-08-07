interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="timer-card" aria-label={`Time remaining ${timeLeft} seconds`}>
      <strong className="timer-value">{String(timeLeft).padStart(2, '0')}</strong>
    </div>
  );
}
