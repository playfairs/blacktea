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

  let promptIndex = 0;

  for (const letter of normalizedWord) {
    if (promptIndex < normalizedPrompt.length && letter === normalizedPrompt[promptIndex]) {
      promptIndex += 1;
    }

    if (promptIndex === normalizedPrompt.length) {
      return true;
    }
  }

  return false;
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
      reason: 'That word was already used in this round.',
    };
  }

  if (normalizedWord.length <= normalizeWord(prompt).length) {
    return {
      accepted: false,
      word: normalizedWord,
      reason: 'Words must be longer than the prompt.',
    };
  }

  if (!dictionary.includes(normalizedWord)) {
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
