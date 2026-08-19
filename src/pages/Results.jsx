import { useState } from 'react';
import { C } from '../ui.js';
import GameCard from '../components/GameCard.jsx';

// تُستخدم في مسار النتائج المباشر وفي صفحة المشاركة معاً
export default function Results({ games, summary, sessionId, onVote, onRestart, restartLabel = 'جرّب مرة ثانية' }) {
  const [votes, setVotes] = useState({});
  const [copied, setCopied] = useState(false);

  const shareUrl = sessionId ? window.location.origin + '/r/' + sessionId : window.location.href;

  function handleVote(game, value) {
    const next = votes[game.rawg_id] === value ? null : value;
    setVotes((v) => ({ ...v, [game.rawg_id]: next }));
    if (next && onVote) onVote(game.rawg_id, next);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('انسخ الرابط يدوياً:', shareUrl);
    }
  }

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
          <GameCard
            key={g.rawg_id}
            game={g}
            vote={votes[g.rawg_id]}
            onVote={(value) => handleVote(g, value)}
          />
        ))}
      </div>

      <div style={{ marginTop: 26, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={copyLink}
          style={{
            minHeight: 50, padding: '0 26px', borderRadius: 999,
            border: '1px solid rgba(180,165,255,.28)', background: 'rgba(255,255,255,.05)',
            color: '#d5cdff', fontSize: 15, cursor: 'pointer'
          }}
        >
          {copied ? 'تم نسخ الرابط' : 'انسخ رابط النتيجة'}
        </button>
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
