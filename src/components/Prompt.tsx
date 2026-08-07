interface PromptProps {
  prompt: string;
}

export function Prompt({ prompt }: PromptProps) {
  return (
    <div className="prompt-card" aria-live="polite">
      <p className="prompt-label">Prompt</p>
      <h2 className="prompt-value">{prompt || '—'}</h2>
    </div>
  );
}
