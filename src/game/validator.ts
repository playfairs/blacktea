import type { SubmissionResult } from '../types/game';

export const ROUND_DURATION = 10;

export function normalizeWord(word: string): string {
  return word.trim().toLowerCase();
}

export function containsOrderedSubsequence(word: string, prompt: string): boolean {
  const normalizedWord = normalizeWord(word);
  const normalizedPrompt = normalizeWord(prompt);

  if (!normalizedPrompt) {
    return false;
  }

  return normalizedWord.includes(normalizedPrompt);
}

function shuffleArray<T>(items: T[]): T[] {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}

export function findPossibleWords(
  prompt: string,
  dictionary: string[],
  usedWords: string[],
): string[] {
  const normalizedPrompt = normalizeWord(prompt);

  const candidates = dictionary.filter((word) => {
    const normalizedWord = normalizeWord(word);
    return (
      normalizedWord.length > normalizedPrompt.length &&
      !usedWords.includes(normalizedWord) &&
      containsOrderedSubsequence(normalizedWord, normalizedPrompt)
    );
  });

  return shuffleArray(candidates);
}

export function validateSubmission({
  word,
  prompt,
  usedWords,
  dictionary,
}: {
  word: string;
  prompt: string;
  usedWords: string[];
  dictionary: string[];
}): SubmissionResult {
  const normalizedWord = normalizeWord(word);

  if (!normalizedWord) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'Empty submissions are not allowed.',
    };
  }

  if (usedWords.includes(normalizedWord)) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'That word was already used.',
    };
  }

  if (normalizedWord.length <= normalizeWord(prompt).length) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'Words must be longer than the prompt.',
    };
  }

  const isWordInDictionary = dictionary.some(
    (entry) => normalizeWord(entry) === normalizedWord,
  );

  if (!isWordInDictionary) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'That word is not in the dictionary.',
    };
  }

  if (!containsOrderedSubsequence(normalizedWord, prompt)) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'The letters must appear in order.',
    };
  }

  return {
    accepted: true,
    word: normalizedWord,
    reason: 'Accepted.',
  };
}
