import type { GameStatus } from '../types/game';

interface ResultsProps {
  usedWords: string[];
  possibleWords: string[];
  status: GameStatus;
}

export function Results({ usedWords, possibleWords, status }: ResultsProps) {
  return (
    <div className="results-card">
      <div className="results-header">
        <p className="used-words-title">Guessed words</p>
        <span>{usedWords.length}</span>
      </div>
      {usedWords.length === 0 ? (
        <p className="used-words-empty">No guesses yet.</p>
      ) : (
        <ul className="used-words-list">
          {usedWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      )}

      {status === 'review' && (
        <div className="possible-words">
          <div className="divider" />
          <div className="results-header">
            <p className="used-words-title">Possible words</p>
            <span>{possibleWords.length}</span>
          </div>
          {possibleWords.length === 0 ? (
            <p className="used-words-empty">No possible words available.</p>
          ) : (
            <ul className="used-words-list">
              {possibleWords.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
