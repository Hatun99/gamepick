import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Shell from '../components/Shell.jsx';
import Loading from './Loading.jsx';
import Results from './Results.jsx';
import StateScreen from './StateScreen.jsx';
import { fetchSession, sendVote } from '../lib/api.js';

// صفحة النتيجة المشتركة — تُقرأ مباشرة من قاعدة البيانات بدون تسجيل دخول
export default function Share() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let alive = true;
    fetchSession(sessionId)
      .then((rows) => {
        if (!alive) return;
        if (!rows) { setStatus('missing'); return; }
        setGames(rows);
        setStatus('ready');
      })
      .catch(() => alive && setStatus('error'));
    return () => { alive = false; };
  }, [sessionId]);

  return (
    <Shell>
      {status === 'loading' && <Loading />}

      {status === 'ready' && (
        <Results
          games={games}
          sessionId={sessionId}
          onVote={(gameId, vote) => sendVote(sessionId, gameId, vote)}
          onRestart={() => navigate('/')}
          restartLabel="جرّب أنت أيضاً"
        />
      )}

      {status === 'missing' && (
        <StateScreen
          title="هذي النتيجة غير موجودة"
          body="الرابط قد يكون ناقصاً أو النتيجة حُذفت. جرّب تسوي ترشيحاتك الخاصة."
          cta="ابدأ من جديد"
          onAction={() => navigate('/')}
        />
      )}

      {status === 'error' && (
        <StateScreen
          title="تعذّر تحميل النتيجة"
          body="فيه خلل مؤقت في الاتصال. حاول تحديث الصفحة."
          cta="ابدأ من جديد"
          onAction={() => navigate('/')}
        />
      )}
    </Shell>
  );
}
