import { primaryBtn } from '../ui.js';

export default function Home({ onStart }) {
  return (
    <section style={{ maxWidth: 880, margin: '0 auto', padding: 'clamp(36px, 9vw, 96px) 0 0', textAlign: 'center' }}>
      <h1
        style={{
          margin: '26px 0 0', fontSize: 'clamp(38px, 8.5vw, 82px)', lineHeight: 1.08, fontWeight: 700,
          letterSpacing: '-.02em',
          background: 'linear-gradient(180deg, #ffffff 18%, #bda7ff 62%, #7f92ff 100%)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', textWrap: 'balance'
        }}
      >
        لعبتك القادمة<br />مُختارة لك أنت
      </h1>

      <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center' }}>
        <button type="button" onClick={onStart} style={primaryBtn}>ابدأ</button>
      </div>
    </section>
  );
}
