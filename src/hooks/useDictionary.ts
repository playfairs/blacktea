import { useEffect, useState } from 'react';

export function useDictionary() {
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    fetch('/words.txt')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load the dictionary.');
        }
        return response.text();
      })
      .then((text) => {
        if (!isActive) {
          return;
        }

        const nextDictionary = text
          .split(/\r?\n/)
          .map((word) => word.trim().toLowerCase())
          .filter(Boolean);

        setDictionary(nextDictionary);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isActive) {
          return;
        }

        setError(err instanceof Error ? err.message : 'Unknown dictionary error.');
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return { dictionary, isLoading, error };
}
