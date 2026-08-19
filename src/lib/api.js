import { supabase, SUPABASE_URL } from './supabase.js';

// توحيد شكل المتجر: قد يصل نصاً أو كائناً فيه رابط
function normalizeStores(stores) {
  return (stores || []).map(s =>
    typeof s === 'string' ? { name: s, url: null } : { name: s?.name ?? '', url: s?.url ?? null }
  ).filter(s => s.name);
}

function normalizeGame(g) {
  return { ...g, stores: normalizeStores(g.stores) };
}

// استدعاء الـ Edge Function التي تشغّل سير عمل n8n
export async function recommend(answers) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers)
  });

  let data = null;
  try { data = await res.json(); } catch { /* رد غير صالح */ }

  if (!res.ok) {
    const err = new Error(data?.error || 'تعذر الاتصال بالخادم');
    err.status = res.status;
    throw err;
  }

  return { ...data, games: (data.games || []).map(normalizeGame) };
}

// قراءة نتيجة محفوظة لصفحة المشاركة
export async function fetchSession(sessionId) {
  const { data, error } = await supabase
    .from('recommendations')
    .select('rank, game, reason_ar, match_score')
    .eq('session_id', sessionId)
    .order('rank', { ascending: true });

  if (error) throw new Error('تعذر تحميل النتيجة');
  if (!data || data.length === 0) return null;

  return data.map(row => normalizeGame({
    ...row.game,
    rank: row.rank,
    reason_ar: row.reason_ar,
    match_score: row.match_score
  }));
}

// حفظ تصويت المستخدم على لعبة
export async function sendVote(sessionId, rawgGameId, vote) {
  if (!sessionId) return;
  const { error } = await supabase
    .from('feedback')
    .insert({ session_id: sessionId, rawg_game_id: rawgGameId, vote });
  if (error) console.warn('تعذر حفظ التصويت', error.message);
}
