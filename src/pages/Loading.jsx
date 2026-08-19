import { useEffect, useState } from 'react';
import { shimmer } from '../ui.js';
import { LOADING_TEXTS } from '../data/quiz.js';

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % LOADING_TEXTS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(24px, 6vw, 56px) 0 0' }} aria-live="polite" aria-busy="true">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span
          aria-hidden
          style={{
            width: 34, height: 34, borderRadius: 12,
            background: 'linear-gradient(150deg, #b28cff, #4d7dff)',
            boxShadow: '0 0 26px rgba(150,110,255,.8)',
            animation: 'gp-pulse 1.8s ease-in-out infinite'
          }}
        />
        <div>
          <div style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 600 }}>{LOADING_TEXTS[index]}</div>
          <div style={{ marginTop: 4, fontSize: 13, color: '#928bbb' }}>تستغرق العملية بين 8 و15 ثانية</div>
        </div>
      </div>

      <div style={{ marginTop: 26, display: 'grid', gap: 14 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16,
              padding: 16, borderRadius: 22, border: '1px solid rgba(160,140,255,.14)', background: 'rgba(22,17,45,.5)'
            }}
          >
            <div style={{ height: 118, borderRadius: 14, ...shimmer }} />
            <div style={{ display: 'grid', gap: 10, alignContent: 'center' }}>
              <div style={{ height: 16, width: '62%', borderRadius: 8, ...shimmer }} />
              <div style={{ height: 26, borderRadius: 8, ...shimmer }} />
              <div style={{ height: 26, width: '80%', borderRadius: 8, ...shimmer }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
