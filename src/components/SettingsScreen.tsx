import { useState } from 'react';
import type { Mode, Operation, Settings } from '../core/types';

const OPERATIONS: { value: Operation; label: string }[] = [
  { value: 'add', label: 'Liitmine (+)' },
  { value: 'sub', label: 'Lahutamine (−)' },
  { value: 'mul', label: 'Korrutamine (×)' },
  { value: 'div', label: 'Jagamine (÷)' },
];

const DIFFICULTIES = [100, 500, 1000, 10000, 100000];
const COUNT_OPTIONS = [10, 20, 30];
const TIMED_OPTIONS = [
  { seconds: 60, label: '1 min' },
  { seconds: 180, label: '3 min' },
  { seconds: 300, label: '5 min' },
];

interface Props {
  onStart: (settings: Settings) => void;
  initialSettings: Settings | null;
}

export function SettingsScreen({ onStart, initialSettings }: Props) {
  const [ops, setOps] = useState<Operation[]>(initialSettings?.ops ?? ['add', 'sub', 'mul', 'div']);
  const [max, setMax] = useState(initialSettings?.max ?? 100);
  const [modeType, setModeType] = useState<Mode['type']>(initialSettings?.mode.type ?? 'count');
  const [count, setCount] = useState(
    initialSettings?.mode.type === 'count' ? initialSettings.mode.count : 10,
  );
  const [seconds, setSeconds] = useState(
    initialSettings?.mode.type === 'timed' ? initialSettings.mode.seconds : 60,
  );
  const [showOpsError, setShowOpsError] = useState(false);

  function toggleOp(op: Operation) {
    setOps((prev) => (prev.includes(op) ? prev.filter((o) => o !== op) : [...prev, op]));
  }

  function handleStart() {
    if (ops.length === 0) {
      setShowOpsError(true);
      return;
    }
    setShowOpsError(false);
    const mode: Mode = modeType === 'count' ? { type: 'count', count } : { type: 'timed', seconds };
    onStart({ ops, max, mode });
  }

  return (
    <section>
      <h1>Seadista harjutus</h1>

      <div className="form-field">
        <label className="form-label">Tehted</label>
        <div className="op-grid">
          {OPERATIONS.map((o) => (
            <label className="checkbox-row" key={o.value}>
              <input
                className="checkbox"
                type="checkbox"
                checked={ops.includes(o.value)}
                onChange={() => toggleOp(o.value)}
              />
              {o.label}
            </label>
          ))}
        </div>
        {showOpsError && (
          <span className="form-help" style={{ color: 'var(--color-danger)' }}>
            Vali vähemalt üks tehe.
          </span>
        )}
      </div>

      <div className="form-field">
        <label className="form-label">Raskusaste (suurim tulemus / arv tehtes)</label>
        <div className="op-grid">
          {DIFFICULTIES.map((d) => (
            <label className="radio-card" key={d}>
              <input
                type="radio"
                name="difficulty"
                checked={max === d}
                onChange={() => setMax(d)}
              />
              <span className="radio-card__box">{d.toLocaleString('et-EE')}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">Harjutuse tüüp</label>
        <div className="op-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <label className="radio-card">
            <input
              type="radio"
              name="modeType"
              checked={modeType === 'count'}
              onChange={() => setModeType('count')}
            />
            <span className="radio-card__box">Fikseeritud tehete arv</span>
          </label>
          <label className="radio-card">
            <input
              type="radio"
              name="modeType"
              checked={modeType === 'timed'}
              onChange={() => setModeType('timed')}
            />
            <span className="radio-card__box">Ajastatud</span>
          </label>
        </div>
      </div>

      {modeType === 'count' ? (
        <div className="form-field">
          <label className="form-label">Tehete arv</label>
          <div className="op-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {COUNT_OPTIONS.map((c) => (
              <label className="radio-card" key={c}>
                <input
                  type="radio"
                  name="countValue"
                  checked={count === c}
                  onChange={() => setCount(c)}
                />
                <span className="radio-card__box">{c}</span>
              </label>
            ))}
          </div>
        </div>
      ) : (
        <div className="form-field">
          <label className="form-label">Kestus</label>
          <div className="op-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {TIMED_OPTIONS.map((t) => (
              <label className="radio-card" key={t.seconds}>
                <input
                  type="radio"
                  name="timedValue"
                  checked={seconds === t.seconds}
                  onChange={() => setSeconds(t.seconds)}
                />
                <span className="radio-card__box">{t.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn--primary btn--lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} onClick={handleStart}>
        Alusta harjutust
      </button>
    </section>
  );
}
