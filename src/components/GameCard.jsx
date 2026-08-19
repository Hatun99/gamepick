import { C, mono, glassCard } from '../ui.js';

function voteStyle(active, tone) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44,
    padding: '0 16px', borderRadius: 999, cursor: 'pointer', fontSize: 14,
    fontFamily: 'inherit', fontWeight: active ? 600 : 400,
    border: active ? '1px solid rgba(255,255,255,.65)' : '1px solid rgba(180,165,255,.22)',
    background: active ? (tone === 'up' ? 'rgba(80,200,150,.24)' : 'rgba(255,120,140,.2)') : 'rgba(255,255,255,.04)',
    color: active ? (tone === 'up' ? '#a9f2ce' : '#ffb8c4') : '#bdb5e2'
  };
}

const chipStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 7, minHeight: 36,
  padding: '0 13px', borderRadius: 999, border: '1px solid ' + C.lineSoft,
  background: 'rgba(255,255,255,.05)', fontSize: 13, color: '#ccc4f2'
};

const ArrowUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="8" cy="8" r="6" /><path d="M8 11V5" /><path d="m5.4 7.6L8 5l2.6 2.6" />
  </svg>
);

const ArrowDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="8" cy="8" r="6" /><path d="M8 5v6" /><path d="m5.4 8.4L8 11l2.6-2.6" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden>
    <path d="M9 3h4v4" /><path d="M13 3 7.5 8.5" /><path d="M12 10v3H3V4h3" />
  </svg>
);

export default function GameCard({ game, vote, onVote }) {
  const year = game.released ? String(game.released).slice(0, 4) : null;
  const score = Number(game.match_score) || 0;

  return (
    <article style={{ ...glassCard, position: 'relative', overflow: 'hidden' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: -60, insetInlineStart: -40, width: 220, height: 160,
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(150,120,255,.4), transparent 70%)',
          filter: 'blur(24px)', pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'relative', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(16px, 3vw, 26px)', padding: 'clamp(16px, 3.2vw, 24px)'
        }}
      >
        <div>
          <div
            style={{
              position: 'relative', aspectRatio: '16 / 9', borderRadius: 16, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,.14)', backgroundColor: '#16112c',
              backgroundImage: 'repeating-linear-gradient(115deg, rgba(150,125,255,.16) 0 10px, rgba(150,125,255,0) 10px 22px)',
              display: 'grid', placeItems: 'center'
            }}
          >
            {game.image ? (
              <img
                src={game.image}
                alt={game.name}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.12em', color: 'rgba(200,190,255,.55)' }}>
                لا توجد صورة
              </span>
            )}
            <span
              style={{
                position: 'absolute', top: 10, insetInlineStart: 10, display: 'grid', placeItems: 'center',
                width: 38, height: 38, borderRadius: 12, background: 'rgba(10,7,26,.7)',
                border: '1px solid rgba(178,140,255,.4)', backdropFilter: 'blur(8px)',
                fontFamily: mono, fontSize: 17, fontWeight: 600, color: '#d9cdff'
              }}
            >
              {game.rank}
            </span>
          </div>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
            <h2 dir="ltr" style={{ margin: 0, fontFamily: mono, fontSize: 'clamp(19px, 3.6vw, 24px)', fontWeight: 600, letterSpacing: '-.01em', color: '#fff' }}>
              {game.name}
            </h2>
            {year && <span style={{ fontFamily: mono, fontSize: 14, color: C.textMute }}>{year}</span>}
          </div>

          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', fontSize: 13 }}>
            {game.metacritic != null && (
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 11px', borderRadius: 10,
                  border: '1px solid rgba(140,230,190,.3)', background: 'rgba(70,200,150,.12)', color: C.good
                }}
              >
                ميتاكريتيك <b style={{ fontFamily: mono }}>{game.metacritic}</b>
              </span>
            )}
            <span dir="rtl" style={{ color: C.textMute }}>{(game.platforms || []).join('، ')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ margin: 0, fontSize: 'clamp(17px, 3.6vw, 21px)', lineHeight: 1.7, fontWeight: 500, color: '#f3efff', textWrap: 'pretty' }}>
            {game.reason_ar}
          </p>

          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: 12, color: '#9a93c4' }}>
              <span>درجة التوافق</span>
              <span style={{ fontFamily: mono, fontSize: 15, color: '#d6caff' }}>{score}</span>
            </div>
            <div style={{ marginTop: 7, height: 6, borderRadius: 99, background: 'rgba(255,255,255,.09)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%', width: score + '%', borderRadius: 99,
                  background: 'linear-gradient(90deg, #4f7bff, #b28cff)',
                  boxShadow: '0 0 14px rgba(160,120,255,.75)'
                }}
              />
            </div>
          </div>

          {game.stores && game.stores.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {game.stores.map((st) =>
                st.url ? (
                  <a key={st.name} href={st.url} target="_blank" rel="noreferrer noopener" style={{ ...chipStyle, textDecoration: 'none' }}>
                    <ExternalIcon />
                    {st.name}
                  </a>
                ) : (
                  <span key={st.name} style={chipStyle}>{st.name}</span>
                )
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
            <button type="button" onClick={() => onVote(1)} aria-pressed={vote === 1} style={voteStyle(vote === 1, 'up')}>
              <ArrowUp /> تناسبني
            </button>
            <button type="button" onClick={() => onVote(-1)} aria-pressed={vote === -1} style={voteStyle(vote === -1, 'down')}>
              <ArrowDown /> لا تناسبني
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
