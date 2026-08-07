import { containsOrderedSubsequence } from './validator';

function choosePromptFromWord(word: string): string {
  const letters = Array.from(word.toLowerCase());

  for (let index = 0; index <= letters.length - 3; index += 1) {
    const prompt = letters.slice(index, index + 3).join('');
    if (prompt.length === 3) {
      return prompt;
    }
  }

  return letters.slice(0, 3).join('');
}

export function generatePrompt(dictionary: string[], previousPrompts: string[] = []): string {
  const candidateWords = dictionary.filter((word) => word.length >= 4);

  if (candidateWords.length === 0) {
    throw new Error('No prompts are available from the current dictionary.');
  }

  const shuffledWords = [...candidateWords].sort(() => Math.random() - 0.5);

  for (const word of shuffledWords) {
    const prompt = choosePromptFromWord(word);
    const isPossible = dictionary.some((entry) => entry.length > prompt.length && containsOrderedSubsequence(entry, prompt));

    if (isPossible && !previousPrompts.includes(prompt)) {
      return prompt.toUpperCase();
    }
  }

  return choosePromptFromWord(shuffledWords[0]).toUpperCase();
}
