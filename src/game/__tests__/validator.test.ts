import { describe, expect, it } from 'vitest';
import { findPossibleWords, validateSubmission } from '../validator';

describe('validateSubmission', () => {
  const dictionary = ['close', 'lost', 'loser', 'floss', 'glorious', 'slosh'];

  it('accepts words that contain the prompt as an ordered subsequence', () => {
    const result = validateSubmission({
      word: 'close',
      prompt: 'LOS',
      usedWords: [],
      dictionary,
    });

    expect(result.accepted).toBe(true);
  });

  it('rejects duplicates before other checks', () => {
    const result = validateSubmission({
      word: 'close',
      prompt: 'LOS',
      usedWords: ['close'],
      dictionary,
    });

    expect(result.accepted).toBe(false);
    expect(result.reason).toContain('already used');
  });

  it('accepts words that contain the prompt letters in order with contiguous prompt letters', () => {
    const result = validateSubmission({
      word: 'slosh',
      prompt: 'LOS',
      usedWords: [],
      dictionary,
    });

    expect(result.accepted).toBe(true);
  });

  it('rejects words that do not contain the prompt as a contiguous sequence', () => {
    const result = validateSubmission({
      word: 'abelicea',
      prompt: 'ele',
      usedWords: [],
      dictionary: ['abelicea'],
    });

    expect(result.accepted).toBe(false);
    expect(result.reason).toContain('letters must appear in order');
  });

  it('accepts words in the dictionary regardless of casing', () => {
    const result = validateSubmission({
      word: 'Close',
      prompt: 'LOS',
      usedWords: [],
      dictionary: ['CLOSE', 'Lost'],
    });

    expect(result.accepted).toBe(true);
  });

  it('randomizes the order of possible review words before returning them', () => {
    const dictionary = ['apple', 'ample', 'maple', 'pearl'];
    const prompt = 'ple';
    const originalRandom = Math.random;
    const values = [0.2, 0.8, 0.4];
    let i = 0;
    Math.random = () => values[i++] ?? 0;

    const possibleWords = findPossibleWords(prompt, dictionary, []);

    Math.random = originalRandom;

    expect(possibleWords).toEqual(['maple', 'ample', 'apple']);
  });
});
