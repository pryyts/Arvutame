import type { Settings } from '../core/types';

interface Props {
  settings: Settings;
  correct: number;
  wrong: number;
  elapsedMs: number;
  onRestart: () => void;
}

function formatClock(totalMs: number): string {
  const totalSeconds = Math.round(totalMs / 1000);
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function StatCard({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="card stat-card">
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  );
}

export function ResultsScreen({ settings, correct, wrong, elapsedMs, onRestart }: Props) {
  const total = correct + wrong;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <section>
      <h1>Tulemus</h1>
      <div className="stats-grid">
        <StatCard value={correct} label="Õigeid vastuseid" />
        <StatCard value={`${percent}%`} label="Täpsus" />
        {settings.mode.type === 'count' ? (
          <StatCard value={formatClock(elapsedMs)} label="Kulunud aeg" />
        ) : (
          <StatCard value={total} label="Tehteid kokku" />
        )}
      </div>
      <button className="btn btn--primary btn--lg" style={{ width: '100%' }} onClick={onRestart}>
        Uus harjutus
      </button>
    </section>
  );
}
