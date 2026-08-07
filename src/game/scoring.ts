export function scoreWord(word: string, prompt: string): number {
  const base = word.length - prompt.length + 2;
  return Math.max(3, base);
}
