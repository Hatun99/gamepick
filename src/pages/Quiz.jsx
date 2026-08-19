import { C, mono, panel, ghostBtn } from '../ui.js';
import { STEPS, ALL_QUESTIONS } from '../data/quiz.js';

function optionStyle(picked, dimmed) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 9, minHeight: 46,
    padding: '0 16px', borderRadius: 14, cursor: 'pointer', fontSize: 15,
    fontFamily: 'inherit', transition: 'transform .15s ease, box-shadow .2s ease',
    border: picked ? '1px solid rgba(200,180,255,.85)' : '1px solid rgba(180,165,255,.2)',
    background: picked
      ? 'linear-gradient(140deg, rgba(143,107,255,.55), rgba(79,123,255,.42))'
      : 'rgba(255,255,255,.045)',
    color: picked ? '#fff' : (dimmed ? '#7d769f' : '#cdc6ee'),
    fontWeight: picked ? 600 : 400,
    boxShadow: picked ? '0 12px 30px rgba(120,90,255,.42), inset 0 1px 0 rgba(255,255,255,.35)' : 'none'
  };
}

function markStyle(picked) {
  return {
    width: 16, height: 16, borderRadius: 5, flex: '0 0 auto',
    border: picked ? '1px solid #fff' : '1px solid rgba(180,165,255,.35)',
    background: picked ? '#fff' : 'transparent',
    boxShadow: picked ? 'inset 0 0 0 3px rgba(143,107,255,.9)' : 'none'
  };
}

function isAnswered(answers, q) {
  const v = answers[q.id];
  return q.multi ? Array.isArray(v) && v.length > 0 : Boolean(v);
}

export default function Quiz({ step, answers, onToggle, onNext, onBack }) {
  const questions = STEPS[step];
  const answeredCount = ALL_QUESTIONS.filter((q) => isAnswered(answers, q)).length;
  const stepReady = questions.every((q) => isAnswered(answers, q));
  const isLast = step === STEPS.length - 1;

  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(20px, 5vw, 48px) 0 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, fontSize: 14, color: C.textSoft }}>
        <span>الخطوة {step + 1} من {STEPS.length}</span>
        <span style={{ fontFamily: mono }}>{answeredCount}/{ALL_QUESTIONS.length}</span>
      </div>

      <div style={{ marginTop: 12, height: 8, borderRadius: 99, background: 'rgba(255,255,255,.09)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%', width: ((step + 1) / STEPS.length) * 100 + '%', borderRadius: 99,
            background: 'linear-gradient(90deg, #4f7bff, ' + C.accent + ')',
            boxShadow: '0 0 18px rgba(143,107,255,.8)', transition: 'width .35s ease'
          }}
        />
      </div>

      <div style={{ marginTop: 30, display: 'grid', gap: 22 }}>
        {questions.map((q) => {
          const current = answers[q.id];
          const count = Array.isArray(current) ? current.length : 0;
          const atLimit = q.multi && q.max && count >= q.max;
          const hint = q.multi && q.max === 3
            ? (count >= 3 ? 'وصلت للحد: 3 من 3' : count + ' من 3')
            : q.hint;

          return (
            <div key={q.id} style={panel}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 600 }}>{q.title}</h2>
                <span style={{ fontSize: 12, color: atLimit ? '#ffcf8a' : C.textMute }}>{hint}</span>
              </div>

              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {q.options.map((o) => {
                  const picked = q.multi
                    ? Array.isArray(current) && current.includes(o.value)
                    : current === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => onToggle(q, o.value)}
                      aria-pressed={picked}
                      style={optionStyle(picked, atLimit && !picked)}
                    >
                      <span aria-hidden style={markStyle(picked)} />
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={onNext}
          disabled={!stepReady}
          style={{
            minHeight: 50, padding: '0 30px', borderRadius: 999, fontSize: 16, fontWeight: 600,
            fontFamily: 'inherit', cursor: stepReady ? 'pointer' : 'not-allowed',
            border: '1px solid rgba(255,255,255,.26)', color: '#fff', opacity: stepReady ? 1 : 0.4,
            background: 'linear-gradient(140deg, ' + C.accent + ', ' + C.accent2 + ')',
            boxShadow: stepReady ? '0 16px 40px rgba(110,80,255,.45)' : 'none'
          }}
        >
          {isLast ? 'اعرض الترشيحات' : 'التالي'}
        </button>
        <button type="button" onClick={onBack} style={ghostBtn}>رجوع</button>
      </div>
    </section>
  );
}
