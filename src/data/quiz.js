// الأسئلة كما في التصميم. لكل خيار تسمية عربية للعرض وقيمة إنجليزية ترسل للـ API.
export const STEPS = [
  [
    {
      id: 'platforms',
      title: 'على أي جهاز تلعب؟',
      multi: true,
      max: 4,
      hint: 'اختر واحداً على الأقل',
      options: [
        { label: 'PC', value: 'pc' },
        { label: 'PlayStation', value: 'playstation' },
        { label: 'Xbox', value: 'xbox' },
        { label: 'Nintendo Switch', value: 'switch' }
      ]
    },
    {
      id: 'genres',
      title: 'أي أنواع تفضّل؟',
      multi: true,
      max: 3,
      hint: 'حتى 3 اختيارات',
      options: [
        { label: 'أكشن', value: 'action' },
        { label: 'مغامرة', value: 'adventure' },
        { label: 'RPG', value: 'rpg' },
        { label: 'إطلاق نار', value: 'shooter' },
        { label: 'استراتيجية', value: 'strategy' },
        { label: 'رياضة', value: 'sports' },
        { label: 'سباق', value: 'racing' },
        { label: 'ألغاز', value: 'puzzle' },
        { label: 'رعب', value: 'horror' }
      ]
    }
  ],
  [
    {
      id: 'mood',
      title: 'أي جو تفضّل؟',
      multi: false,
      hint: 'اختيار واحد',
      options: [
        { label: 'هادئ ومريح', value: 'calm' },
        { label: 'متوازن', value: 'balanced' },
        { label: 'سريع ومكثّف', value: 'intense' },
        { label: 'تحدٍّ صعب', value: 'hard' }
      ]
    },
    {
      id: 'style',
      title: 'كيف تحب تلعب؟',
      multi: false,
      hint: 'اختيار واحد',
      options: [
        { label: 'فردي', value: 'solo' },
        { label: 'تعاوني', value: 'coop' },
        { label: 'تنافسي أونلاين', value: 'competitive' }
      ]
    }
  ],
  [
    {
      id: 'time',
      title: 'كم وقتك للّعب؟',
      multi: false,
      hint: 'اختيار واحد',
      options: [
        { label: 'جلسات قصيرة', value: 'short' },
        { label: 'متوسط', value: 'medium' },
        { label: 'عالم مفتوح طويل', value: 'long' }
      ]
    },
    {
      id: 'era',
      title: 'تفضّل ألعاب...',
      multi: false,
      hint: 'اختيار واحد',
      options: [
        { label: 'كلاسيكيات مضمونة', value: 'classic' },
        { label: 'حديثة (آخر 3 سنوات)', value: 'modern' },
        { label: 'لا يفرق', value: 'any' }
      ]
    }
  ]
];

export const ALL_QUESTIONS = STEPS.flat();

const LABELS = {};
for (const q of ALL_QUESTIONS) for (const o of q.options) LABELS[q.id + ':' + o.value] = o.label;

export function labelOf(questionId, value) {
  return LABELS[questionId + ':' + value] || value;
}

// جملة تلخّص اختيارات المستخدم أعلى صفحة النتائج
export function summarize(answers) {
  const parts = [
    (answers.platforms || []).map(v => labelOf('platforms', v)).join(' و '),
    (answers.genres || []).map(v => labelOf('genres', v)).join(' و '),
    answers.mood && 'جو ' + labelOf('mood', answers.mood),
    answers.style && 'لعب ' + labelOf('style', answers.style),
    answers.time && labelOf('time', answers.time),
    answers.era && labelOf('era', answers.era)
  ].filter(Boolean);
  return parts.join(' · ');
}

export const LOADING_TEXTS = [
  'نحلّل تفضيلاتك…',
  'نبحث في آلاف الألعاب…',
  'نقارن الأجواء وأسلوب اللعب…',
  'نكتب أسباب الترشيح…'
];
