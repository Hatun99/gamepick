import { C } from '../ui.js';
import GameCard from '../components/GameCard.jsx';

// تُستخدم في مسار النتائج المباشر وفي صفحة المشاركة معاً
export default function Results({ games, summary, onRestart, restartLabel = 'جرّب مرة ثانية' }) {
  return (
    <section style={{ maxWidth: 1040, margin: '0 auto', padding: 'clamp(20px, 5vw, 48px) 0 0' }}>
      <h1
        style={{
          margin: 0, fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 700, letterSpacing: '-.02em',
          background: 'linear-gradient(180deg, #fff, #b6a4ff)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent'
        }}
      >
        ترشيحاتك الخمسة
      </h1>

      {summary && (
        <p dir="rtl" style={{ margin: '12px 0 0', fontSize: 'clamp(13px, 3vw, 15px)', lineHeight: 1.7, color: C.textSoft }}>
          {summary}
        </p>
      )}

      <div style={{ marginTop: 26, display: 'grid', gap: 18 }}>
        {games.map((g) => (
          <GameCard key={g.rawg_id} game={g} />
        ))}
      </div>

      <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onRestart}
          style={{
            minHeight: 50, padding: '0 30px', borderRadius: 999,
            border: '1px solid rgba(255,255,255,.26)',
            background: 'linear-gradient(140deg, ' + C.accent + ', ' + C.accent2 + ')',
            color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 16px 40px rgba(110,80,255,.42)'
          }}
        >
          {restartLabel}
        </button>
      </div>
    </section>
  );
}
