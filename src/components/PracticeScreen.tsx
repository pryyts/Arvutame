import { useEffect, useRef } from 'react';
import type { Problem, Settings } from '../core/types';

interface Props {
  settings: Settings;
  problem: Problem;
  index: number;
  timeLeft: number;
  isWrong: boolean;
  correctHint: string;
  inputDisabled: boolean;
  onSubmit: (raw: string) => void;
  onCancel: () => void;
}

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function PracticeScreen({
  settings,
  problem,
  index,
  timeLeft,
  isWrong,
  correctHint,
  inputDisabled,
  onSubmit,
  onCancel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (!inputDisabled) {
      inputRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset/refocus when the problem itself changes, not on every disabled toggle
  }, [problem]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && inputRef.current) {
      const raw = inputRef.current.value;
      onSubmit(raw);
      inputRef.current.value = '';
    }
  }

  return (
    <section>
      <div className="practice-meta">
        {settings.mode.type === 'count' ? (
          <span className="badge badge--primary">
            Tehe {index + 1}/{settings.mode.count}
          </span>
        ) : (
          <span className="badge">{formatClock(timeLeft)}</span>
        )}
        <button className="btn btn--ghost btn--sm" onClick={onCancel}>
          Katkesta
        </button>
      </div>

      <div className="problem-display">
        {problem.a} {problem.opSymbol} {problem.b} =
      </div>

      <input
        ref={inputRef}
        className={`input answer-input${isWrong ? ' is-wrong' : ''}`}
        type="number"
        autoComplete="off"
        placeholder="?"
        disabled={inputDisabled}
        onKeyDown={handleKeyDown}
      />
      <div className="correct-answer-hint">{correctHint}</div>
    </section>
  );
}
