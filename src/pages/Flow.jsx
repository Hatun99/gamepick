import { useState } from 'react';
import Shell from '../components/Shell.jsx';
import Home from './Home.jsx';
import Quiz from './Quiz.jsx';
import Loading from './Loading.jsx';
import Results from './Results.jsx';
import StateScreen from './StateScreen.jsx';
import { STEPS, summarize } from '../data/quiz.js';
import { recommend } from '../lib/api.js';

const EMPTY = { platforms: [], genres: [], mood: null, style: null, time: null, era: null };

export default function Flow() {
  const [screen, setScreen] = useState('home');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function toggle(q, value) {
    setAnswers((prev) => {
      if (!q.multi) return { ...prev, [q.id]: prev[q.id] === value ? null : value };
      const current = Array.isArray(prev[q.id]) ? prev[q.id].slice() : [];
      const at = current.indexOf(value);
      if (at >= 0) current.splice(at, 1);
      else if (current.length < (q.max || 99)) current.push(value);
      return { ...prev, [q.id]: current };
    });
  }

  async function submit() {
    setScreen('loading');
    setError(null);
    try {
      const data = await recommend(answers);
      setResult(data);
      setScreen('results');
    } catch (e) {
      setError(e);
      setScreen(e.status === 404 ? 'empty' : 'error');
    }
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else submit();
  }

  function back() {
    if (step === 0) setScreen('home');
    else setStep(step - 1);
  }

  function restart() {
    setAnswers(EMPTY);
    setStep(0);
    setResult(null);
    setError(null);
    setScreen('quiz');
  }

  return (
    <Shell>
      {screen === 'home' && (
        <Home onStart={() => { setStep(0); setScreen('quiz'); }} />
      )}

      {screen === 'quiz' && (
        <Quiz step={step} answers={answers} onToggle={toggle} onNext={next} onBack={back} />
      )}

      {screen === 'loading' && <Loading />}

      {screen === 'results' && result && (
        <Results
          games={result.games}
          summary={summarize(answers)}
          onRestart={restart}
        />
      )}

      {screen === 'empty' && (
        <StateScreen
          title="ما لقينا ألعاباً مطابقة"
          body="اختياراتك ضيّقة شوي. وسّعها بإضافة نوع أو منصة، وبنعيد البحث."
          cta="وسّع اختياراتك"
          onAction={() => { setStep(0); setScreen('quiz'); }}
        />
      )}

      {screen === 'error' && (
        <StateScreen
          title="صار خلل غير متوقع"
          body={error?.message || 'ما قدرنا نجيب الترشيحات هذي المرة. حاول مرة أخرى بعد قليل.'}
          cta="حاول مرة أخرى"
          onAction={submit}
        />
      )}
    </Shell>
  );
}
