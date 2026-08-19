import { C } from '../ui.js';

// شاشة موحّدة للحالات الاستثنائية: لا نتائج / خطأ / تجاوز الحد
export default function StateScreen({ title, body, cta, onAction }) {
  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(50px, 12vw, 130px) 0 0', textAlign: 'center' }}>
      <div
        style={{
          display: 'inline-grid', placeItems: 'center', width: 66, height: 66, borderRadius: 22,
          border: '1px solid rgba(178,140,255,.34)',
          background: 'linear-gradient(150deg, rgba(140,110,255,.28), rgba(30,22,60,.5))',
          boxShadow: '0 0 46px rgba(140,110,255,.35)'
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d6caff" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16h.01" />
        </svg>
      </div>

      <h1 style={{ margin: '24px 0 0', fontSize: 'clamp(24px, 5.5vw, 34px)', fontWeight: 700 }}>{title}</h1>
      <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.75, color: C.textSoft }}>{body}</p>

      {cta && (
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onAction}
            style={{
              minHeight: 52, padding: '0 32px', borderRadius: 999,
              border: '1px solid rgba(255,255,255,.26)',
              background: 'linear-gradient(140deg, ' + C.accent + ', ' + C.accent2 + ')',
              color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 16px 42px rgba(110,80,255,.45)'
            }}
          >
            {cta}
          </button>
        </div>
      )}
    </section>
  );
}
