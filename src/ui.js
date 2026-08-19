// نظام التصميم المستخرج من البروتوتايب — مصدر واحد للألوان والأشكال
export const C = {
  bg: '#05030d',
  text: '#efeaff',
  textSoft: '#a49cd0',
  textMute: '#8d86b4',
  textDim: '#928bbb',
  accent: '#8f6bff',
  accent2: '#4f7bff',
  line: 'rgba(160,140,255,.2)',
  lineSoft: 'rgba(180,165,255,.24)',
  good: '#9ef0c9'
};

export const mono = "'Space Grotesk', sans-serif";

export const pageBg =
  'radial-gradient(1100px 700px at 78% -6%, #2e1a6e 0%, rgba(46,26,110,0) 62%),' +
  'radial-gradient(900px 620px at 12% 8%, #14275f 0%, rgba(20,39,95,0) 58%),' +
  'radial-gradient(1200px 900px at 50% 108%, #3a1d7a 0%, rgba(58,29,122,0) 60%),' +
  C.bg;

export const glassCard = {
  borderRadius: 26,
  border: `1px solid ${C.line}`,
  background: 'linear-gradient(160deg, rgba(120,95,220,.15), rgba(20,16,42,.72))',
  backdropFilter: 'blur(14px)',
  boxShadow: '0 30px 70px rgba(30,14,80,.5), inset 0 1px 0 rgba(255,255,255,.14)'
};

export const panel = {
  padding: 'clamp(18px, 4vw, 28px)',
  borderRadius: 22,
  border: '1px solid rgba(160,140,255,.18)',
  background: 'linear-gradient(165deg, rgba(120,95,220,.16), rgba(22,17,45,.6))',
  backdropFilter: 'blur(12px)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12)'
};

export const primaryBtn = {
  minHeight: 54,
  padding: '0 42px',
  border: '1px solid rgba(255,255,255,.28)',
  borderRadius: 999,
  background: `linear-gradient(140deg, ${C.accent}, ${C.accent2})`,
  color: '#fff',
  fontSize: 17,
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 18px 46px rgba(110,80,255,.5), inset 0 1px 0 rgba(255,255,255,.35)'
};

export const ghostBtn = {
  minHeight: 48,
  padding: '0 22px',
  borderRadius: 999,
  border: '1px solid rgba(180,165,255,.25)',
  background: 'rgba(255,255,255,.04)',
  color: '#c6bff0',
  fontSize: 15,
  cursor: 'pointer'
};

export const shimmer = {
  background:
    'linear-gradient(90deg, rgba(255,255,255,.05) 25%, rgba(170,150,255,.16) 45%, rgba(255,255,255,.05) 65%)',
  backgroundSize: '200% 100%',
  animation: 'gp-shimmer 1.6s linear infinite'
};

export function orbStyle(pos, color, glow = 0.75) {
  return {
    position: 'absolute',
    width: 'clamp(280px, 46vw, 620px)',
    height: 'clamp(280px, 46vw, 620px)',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(90px)',
    opacity: glow,
    background: `radial-gradient(50% 50% at 50% 50%, ${color}, transparent 70%)`,
    ...pos
  };
}
