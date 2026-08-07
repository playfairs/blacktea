import { useDictionary } from './hooks/useDictionary';
import { useGame } from './hooks/useGame';
import { Game } from './components/Game';

export default function App() {
  const { dictionary, isLoading, error } = useDictionary();
  const { gameState, submitWord, restartGame } = useGame(dictionary);

  if (isLoading) {
    return <main className="app-shell"><div className="app-card"><p>Loading dictionary…</p></div></main>;
  }

  if (error) {
    return <main className="app-shell"><div className="app-card"><p>{error}</p></div></main>;
  }

  return (
    <main className="app-shell">
      <Game
        prompt={gameState.prompt}
        timeLeft={gameState.timeLeft}
        score={gameState.score}
        round={gameState.round}
        usedWords={gameState.usedWords}
        feedback={gameState.feedback}
        onSubmit={submitWord}
        onRestart={restartGame}
        disabled={gameState.status !== 'playing'}
      />
    </main>
  );
}
