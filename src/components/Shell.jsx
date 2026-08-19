import { Link } from 'react-router-dom';
import { C, mono, pageBg, orbStyle } from '../ui.js';

// الخلفية والترويسة المشتركة بين كل الشاشات
export default function Shell({ children }) {
  return (
    <div dir="rtl" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: pageBg, color: C.text }}>
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(160,140,255,.075) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(160,140,255,.075) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(80% 60% at 50% 0%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(80% 60% at 50% 0%, #000 0%, transparent 75%)'
        }}
      />
      <div aria-hidden style={orbStyle({ top: '-14%', right: '-10%' }, 'rgba(150,110,255,.55)')} />
      <div aria-hidden style={orbStyle({ bottom: '-22%', left: '-14%' }, 'rgba(70,120,255,.45)')} />

      <header
        style={{
          position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 16, padding: '22px clamp(18px, 5vw, 56px)'
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'inherit' }}>
          <div
            aria-hidden
            style={{
              width: 26, height: 26, borderRadius: 9,
              background: 'linear-gradient(150deg, #b28cff, #4d7dff)',
              boxShadow: '0 0 22px rgba(150,110,255,.75)',
              border: '1px solid rgba(255,255,255,.35)'
            }}
          />
          <span style={{ fontFamily: mono, fontSize: 19, fontWeight: 600, letterSpacing: '-.01em' }}>GamePick</span>
        </Link>
      </header>

      <main style={{ position: 'relative', zIndex: 2, padding: '0 clamp(16px, 4vw, 56px) clamp(56px, 9vw, 120px)' }}>
        {children}
      </main>
    </div>
  );
}
