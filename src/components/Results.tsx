interface ResultsProps {
  feedback: string;
  usedWords: string[];
}

export function Results({ feedback, usedWords }: ResultsProps) {
  return (
    <div className="results-card">
      <p className="feedback">{feedback}</p>
      <div className="used-words">
        <p className="used-words-title">Used words</p>
        {usedWords.length === 0 ? (
          <p className="used-words-empty">None yet.</p>
        ) : (
          <ul>
            {usedWords.map((word) => (
              <li key={word}>{word}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
