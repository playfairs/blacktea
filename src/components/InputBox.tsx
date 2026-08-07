import { useEffect, useRef, useState } from 'react';

interface InputBoxProps {
  onSubmit: (value: string) => void;
  disabled: boolean;
}

export function InputBox({ onSubmit, disabled }: InputBoxProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    onSubmit(trimmedValue);
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Type a word"
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
        disabled={disabled}
      />
      <button className="button button-primary" type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
}
