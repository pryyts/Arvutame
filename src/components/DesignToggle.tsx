import { useEffect, useState } from 'react';

type Design = 'warm-human' | 'kasvurada';
type Theme = 'light' | 'dark';

export function DesignToggle() {
  const [design, setDesign] = useState<Design>('warm-human');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (design === 'kasvurada') {
      document.documentElement.setAttribute('data-design', 'kasvurada');
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-design');
      document.documentElement.removeAttribute('data-theme');
    }
  }, [design, theme]);

  return (
    <div className="design-toggle row">
      <button
        className="btn btn--outline btn--sm"
        onClick={() => setDesign((d) => (d === 'warm-human' ? 'kasvurada' : 'warm-human'))}
      >
        {design === 'warm-human' ? 'Proovi Kasvurada disaini' : 'Tagasi Warm & Human juurde'}
      </button>
      {design === 'kasvurada' && (
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? '☀️ Hele' : '🌙 Tume'}
        </button>
      )}
    </div>
  );
}
