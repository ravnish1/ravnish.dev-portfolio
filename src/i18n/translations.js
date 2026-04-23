/* ═══════════════════════════════════════════════════════════════════
   i18n TRANSLATIONS — ravnish.dev
   Flat key-value pairs for every user-visible string.
   ═══════════════════════════════════════════════════════════════════ */

export const LANGUAGES = [
  { code: 'en', label: 'English',   flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', label: 'हिन्दी',     flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', label: 'Español',   flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'Français',  flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪', dir: 'ltr' },
  { code: 'ja', label: '日本語',     flag: '🇯🇵', dir: 'ltr' },
  { code: 'ko', label: '한국어',     flag: '🇰🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية',   flag: '🇸🇦', dir: 'rtl' },
  { code: 'zh', label: '中文',       flag: '🇨🇳', dir: 'ltr' },
  { code: 'pt', label: 'Português', flag: '🇧🇷', dir: 'ltr' },
]

const translations = {
  /* ───────────────────── ENGLISH ─────────────────────── */
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',

    // Home
    'home.eyebrow': 'Building What Matters \u00a0·\u00a0 Open to Opportunities',
    'home.title': 'I BUILD',
    'home.tagline': "I can do whatever you need, as long as I'm learning something or getting paid well enough for my time, preferably both.",
    'home.cta.projects': 'View Projects →',
    'home.cta.contact': 'Get in Touch',
    'home.stats.projects': 'Projects',
    'home.stats.technologies': 'Technologies',
    'home.stats.certs': 'Certs',
    'home.stats.hackathons': 'Hackathons',
    'home.techLabel': 'Hands-on Experience with',

    // Projects
    'projects.title': 'Projects',
    'projects.viewAll': 'View All on GitHub →',
    'projects.liveSite': 'Live Site',
    'projects.github': 'GitHub',

    // Blogs
    'blogs.label': 'Writing',
    'blogs.title': 'Blog',
    'blogs.desc': 'Thoughts on technology, development, and AI.',
    'blogs.followMedium': 'Follow on Medium →',

    // Contact
    'contact.label': 'Contact',
    'contact.heading': "Let's build\nsomething.",
    'contact.sub': 'Open to interesting projects, collaborations, and conversations. Whether you have a project in mind or just want to say hi — my inbox is always open.',
    'contact.cta': 'Send an Email →',
    'contact.findMe': 'Find me online',
    'contact.location': 'New Delhi, India · Available for opportunities',

    // Language switcher
    'lang.label': 'Language',
    'lang.search': 'Search language',
  },

  /* ───────────────────── HINDI ─────────────────────── */
  hi: {
    'nav.home': 'होम',
    'nav.projects': 'प्रोजेक्ट्स',
    'nav.blog': 'ब्लॉग',
    'nav.contact': 'संपर्क',
    'nav.resume': 'रिज़्यूमे',

    'home.eyebrow': 'जो मायने रखता है वो बनाना \u00a0·\u00a0 अवसरों के लिए तैयार',
    'home.title': 'मैं बनाता हूँ',
    'home.tagline': 'मैं वो कर सकता हूँ जो आपको चाहिए, बस कुछ नया सीखने को मिले या अच्छा मुआवज़ा — दोनों हों तो और भी अच्छा।',
    'home.cta.projects': 'प्रोजेक्ट्स देखें →',
    'home.cta.contact': 'संपर्क करें',
    'home.stats.projects': 'प्रोजेक्ट्स',
    'home.stats.technologies': 'टेक्नोलॉजीज़',
    'home.stats.certs': 'सर्टिफिकेट',
    'home.stats.hackathons': 'हैकथॉन',
    'home.techLabel': 'अनुभव इनके साथ',

    'projects.title': 'प्रोजेक्ट्स',
    'projects.viewAll': 'GitHub पर सब देखें →',
    'projects.liveSite': 'लाइव साइट',
    'projects.github': 'GitHub',

    'blogs.label': 'लेखन',
    'blogs.title': 'ब्लॉग',
    'blogs.desc': 'टेक्नोलॉजी, डेवलपमेंट और AI पर विचार।',
    'blogs.followMedium': 'Medium पर फ़ॉलो करें →',

    'contact.label': 'संपर्क',
    'contact.heading': 'कुछ बनाते\nहैं।',
    'contact.sub': 'दिलचस्प प्रोजेक्ट्स, सहयोग और बातचीत के लिए तैयार। चाहे कोई प्रोजेक्ट हो या बस हैलो कहना हो — मेरा इनबॉक्स हमेशा खुला है।',
    'contact.cta': 'ईमेल भेजें →',
    'contact.findMe': 'मुझे ऑनलाइन खोजें',
    'contact.location': 'नई दिल्ली, भारत · अवसरों के लिए उपलब्ध',

    'lang.label': 'भाषा',
    'lang.search': 'भाषा खोजें',
  },

  /* ───────────────────── SPANISH ─────────────────────── */
  es: {
    'nav.home': 'Inicio',
    'nav.projects': 'Proyectos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',
    'nav.resume': 'CV',

    'home.eyebrow': 'Construyendo lo que importa \u00a0·\u00a0 Abierto a oportunidades',
    'home.title': 'YO CREO',
    'home.tagline': 'Puedo hacer lo que necesites, siempre que esté aprendiendo algo o me paguen bien — preferiblemente ambos.',
    'home.cta.projects': 'Ver Proyectos →',
    'home.cta.contact': 'Contactar',
    'home.stats.projects': 'Proyectos',
    'home.stats.technologies': 'Tecnologías',
    'home.stats.certs': 'Certs',
    'home.stats.hackathons': 'Hackathons',
    'home.techLabel': 'Experiencia práctica con',

    'projects.title': 'Proyectos',
    'projects.viewAll': 'Ver todo en GitHub →',
    'projects.liveSite': 'Sitio en vivo',
    'projects.github': 'GitHub',

    'blogs.label': 'Escritura',
    'blogs.title': 'Blog',
    'blogs.desc': 'Reflexiones sobre tecnología, desarrollo e IA.',
    'blogs.followMedium': 'Seguir en Medium →',

    'contact.label': 'Contacto',
    'contact.heading': 'Construyamos\nalgo.',
    'contact.sub': 'Abierto a proyectos interesantes, colaboraciones y conversaciones. Ya sea que tengas un proyecto o solo quieras saludar — mi bandeja está siempre abierta.',
    'contact.cta': 'Enviar un email →',
    'contact.findMe': 'Encuéntrame en línea',
    'contact.location': 'Nueva Delhi, India · Disponible para oportunidades',

    'lang.label': 'Idioma',
    'lang.search': 'Buscar idioma',
  },

  /* ───────────────────── FRENCH ─────────────────────── */
  fr: {
    'nav.home': 'Accueil',
    'nav.projects': 'Projets',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.resume': 'CV',

    'home.eyebrow': 'Construire ce qui compte \u00a0·\u00a0 Ouvert aux opportunités',
    'home.title': 'JE CRÉE',
    'home.tagline': "Je peux faire ce dont vous avez besoin, tant que j'apprends quelque chose ou que je suis bien payé — de préférence les deux.",
    'home.cta.projects': 'Voir les Projets →',
    'home.cta.contact': 'Me Contacter',
    'home.stats.projects': 'Projets',
    'home.stats.technologies': 'Technologies',
    'home.stats.certs': 'Certifs',
    'home.stats.hackathons': 'Hackathons',
    'home.techLabel': 'Expérience pratique avec',

    'projects.title': 'Projets',
    'projects.viewAll': 'Tout voir sur GitHub →',
    'projects.liveSite': 'Site en ligne',
    'projects.github': 'GitHub',

    'blogs.label': 'Écriture',
    'blogs.title': 'Blog',
    'blogs.desc': 'Réflexions sur la technologie, le développement et l\'IA.',
    'blogs.followMedium': 'Suivre sur Medium →',

    'contact.label': 'Contact',
    'contact.heading': 'Construisons\nquelque chose.',
    'contact.sub': 'Ouvert aux projets intéressants, collaborations et conversations. Que vous ayez un projet ou juste envie de dire bonjour — ma boîte est toujours ouverte.',
    'contact.cta': 'Envoyer un email →',
    'contact.findMe': 'Me trouver en ligne',
    'contact.location': 'New Delhi, Inde · Disponible pour des opportunités',

    'lang.label': 'Langue',
    'lang.search': 'Rechercher une langue',
  },

  /* ───────────────────── GERMAN ─────────────────────── */
  de: {
    'nav.home': 'Start',
    'nav.projects': 'Projekte',
    'nav.blog': 'Blog',
    'nav.contact': 'Kontakt',
    'nav.resume': 'Lebenslauf',

    'home.eyebrow': 'Baue was zählt \u00a0·\u00a0 Offen für Chancen',
    'home.title': 'ICH BAUE',
    'home.tagline': 'Ich kann alles machen, was du brauchst, solange ich etwas lerne oder gut genug bezahlt werde — am liebsten beides.',
    'home.cta.projects': 'Projekte ansehen →',
    'home.cta.contact': 'Kontakt aufnehmen',
    'home.stats.projects': 'Projekte',
    'home.stats.technologies': 'Technologien',
    'home.stats.certs': 'Zertifikate',
    'home.stats.hackathons': 'Hackathons',
    'home.techLabel': 'Praktische Erfahrung mit',

    'projects.title': 'Projekte',
    'projects.viewAll': 'Alles auf GitHub ansehen →',
    'projects.liveSite': 'Live-Seite',
    'projects.github': 'GitHub',

    'blogs.label': 'Schreiben',
    'blogs.title': 'Blog',
    'blogs.desc': 'Gedanken über Technologie, Entwicklung und KI.',
    'blogs.followMedium': 'Auf Medium folgen →',

    'contact.label': 'Kontakt',
    'contact.heading': 'Lass uns etwas\nbauen.',
    'contact.sub': 'Offen für interessante Projekte, Zusammenarbeit und Gespräche. Ob du ein Projekt hast oder einfach Hallo sagen willst — mein Postfach ist immer offen.',
    'contact.cta': 'E-Mail senden →',
    'contact.findMe': 'Finde mich online',
    'contact.location': 'Neu-Delhi, Indien · Verfügbar für Chancen',

    'lang.label': 'Sprache',
    'lang.search': 'Sprache suchen',
  },

  /* ───────────────────── JAPANESE ─────────────────────── */
  ja: {
    'nav.home': 'ホーム',
    'nav.projects': 'プロジェクト',
    'nav.blog': 'ブログ',
    'nav.contact': 'お問い合わせ',
    'nav.resume': '履歴書',

    'home.eyebrow': '大切なものを作る \u00a0·\u00a0 機会を求めて',
    'home.title': '私は作る',
    'home.tagline': '何でもできます。学びがあるか、十分な報酬があれば — できれば両方。',
    'home.cta.projects': 'プロジェクトを見る →',
    'home.cta.contact': 'お問い合わせ',
    'home.stats.projects': 'プロジェクト',
    'home.stats.technologies': '技術',
    'home.stats.certs': '資格',
    'home.stats.hackathons': 'ハッカソン',
    'home.techLabel': '実務経験',

    'projects.title': 'プロジェクト',
    'projects.viewAll': 'GitHubですべて見る →',
    'projects.liveSite': 'ライブサイト',
    'projects.github': 'GitHub',

    'blogs.label': '執筆',
    'blogs.title': 'ブログ',
    'blogs.desc': 'テクノロジー、開発、AIについての考え。',
    'blogs.followMedium': 'Mediumでフォロー →',

    'contact.label': 'お問い合わせ',
    'contact.heading': '何かを\n作りましょう。',
    'contact.sub': '面白いプロジェクト、コラボレーション、会話に対してオープンです。プロジェクトがあっても、挨拶だけでも — いつでもお待ちしています。',
    'contact.cta': 'メールを送る →',
    'contact.findMe': 'オンラインで見つける',
    'contact.location': 'ニューデリー、インド · 機会を求めています',

    'lang.label': '言語',
    'lang.search': '言語を検索',
  },

  /* ───────────────────── KOREAN ─────────────────────── */
  ko: {
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.blog': '블로그',
    'nav.contact': '연락처',
    'nav.resume': '이력서',

    'home.eyebrow': '중요한 것을 만들다 \u00a0·\u00a0 기회를 찾고 있습니다',
    'home.title': '나는 만든다',
    'home.tagline': '필요한 건 뭐든 할 수 있어요. 뭔가 배우거나 충분한 보상이 있다면 — 둘 다면 더 좋고요.',
    'home.cta.projects': '프로젝트 보기 →',
    'home.cta.contact': '연락하기',
    'home.stats.projects': '프로젝트',
    'home.stats.technologies': '기술',
    'home.stats.certs': '자격증',
    'home.stats.hackathons': '해커톤',
    'home.techLabel': '실무 경험',

    'projects.title': '프로젝트',
    'projects.viewAll': 'GitHub에서 모두 보기 →',
    'projects.liveSite': '라이브 사이트',
    'projects.github': 'GitHub',

    'blogs.label': '글쓰기',
    'blogs.title': '블로그',
    'blogs.desc': '기술, 개발, AI에 대한 생각.',
    'blogs.followMedium': 'Medium 팔로우 →',

    'contact.label': '연락처',
    'contact.heading': '함께 만들어\n봅시다.',
    'contact.sub': '흥미로운 프로젝트, 협업, 대화에 열려 있습니다. 프로젝트가 있든 인사만 하고 싶든 — 언제든 환영합니다.',
    'contact.cta': '이메일 보내기 →',
    'contact.findMe': '온라인에서 찾기',
    'contact.location': '뉴델리, 인도 · 기회를 찾고 있습니다',

    'lang.label': '언어',
    'lang.search': '언어 검색',
  },

  /* ───────────────────── ARABIC ─────────────────────── */
  ar: {
    'nav.home': 'الرئيسية',
    'nav.projects': 'المشاريع',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بي',
    'nav.resume': 'السيرة الذاتية',

    'home.eyebrow': 'بناء ما يهم \u00a0·\u00a0 مفتوح للفرص',
    'home.title': 'أنا أبني',
    'home.tagline': 'يمكنني فعل ما تحتاجه، طالما أتعلم شيئاً أو أحصل على أجر جيد — ويفضل كلاهما.',
    'home.cta.projects': 'عرض المشاريع →',
    'home.cta.contact': 'تواصل معي',
    'home.stats.projects': 'مشاريع',
    'home.stats.technologies': 'تقنيات',
    'home.stats.certs': 'شهادات',
    'home.stats.hackathons': 'هاكاثون',
    'home.techLabel': 'خبرة عملية مع',

    'projects.title': 'المشاريع',
    'projects.viewAll': 'عرض الكل على GitHub →',
    'projects.liveSite': 'موقع مباشر',
    'projects.github': 'GitHub',

    'blogs.label': 'الكتابة',
    'blogs.title': 'المدونة',
    'blogs.desc': 'أفكار حول التكنولوجيا والتطوير والذكاء الاصطناعي.',
    'blogs.followMedium': 'تابع على Medium →',

    'contact.label': 'اتصل بي',
    'contact.heading': 'لنبنِ\nشيئاً.',
    'contact.sub': 'مفتوح للمشاريع المثيرة والتعاون والمحادثات. سواء كان لديك مشروع أو تريد فقط إلقاء التحية — صندوق بريدي مفتوح دائماً.',
    'contact.cta': 'أرسل بريداً →',
    'contact.findMe': 'اعثر عليّ عبر الإنترنت',
    'contact.location': 'نيودلهي، الهند · متاح للفرص',

    'lang.label': 'اللغة',
    'lang.search': 'بحث عن لغة',
  },

  /* ───────────────────── CHINESE ─────────────────────── */
  zh: {
    'nav.home': '首页',
    'nav.projects': '项目',
    'nav.blog': '博客',
    'nav.contact': '联系我',
    'nav.resume': '简历',

    'home.eyebrow': '构建重要的东西 \u00a0·\u00a0 开放寻求机会',
    'home.title': '我来构建',
    'home.tagline': '我可以做你需要的一切，只要能学到东西或者得到足够好的报酬——最好两者兼得。',
    'home.cta.projects': '查看项目 →',
    'home.cta.contact': '联系我',
    'home.stats.projects': '项目',
    'home.stats.technologies': '技术栈',
    'home.stats.certs': '证书',
    'home.stats.hackathons': '黑客松',
    'home.techLabel': '实战经验',

    'projects.title': '项目',
    'projects.viewAll': '在GitHub查看全部 →',
    'projects.liveSite': '在线站点',
    'projects.github': 'GitHub',

    'blogs.label': '写作',
    'blogs.title': '博客',
    'blogs.desc': '关于技术、开发和AI的思考。',
    'blogs.followMedium': '在Medium关注 →',

    'contact.label': '联系我',
    'contact.heading': '一起来\n创造。',
    'contact.sub': '对有趣的项目、合作和交流持开放态度。无论你有项目想法还是只是想打个招呼——我的邮箱随时欢迎。',
    'contact.cta': '发送邮件 →',
    'contact.findMe': '在线找到我',
    'contact.location': '新德里，印度 · 可接受机会',

    'lang.label': '语言',
    'lang.search': '搜索语言',
  },

  /* ───────────────────── PORTUGUESE ─────────────────────── */
  pt: {
    'nav.home': 'Início',
    'nav.projects': 'Projetos',
    'nav.blog': 'Blog',
    'nav.contact': 'Contato',
    'nav.resume': 'Currículo',

    'home.eyebrow': 'Construindo o que importa \u00a0·\u00a0 Aberto a oportunidades',
    'home.title': 'EU CONSTRUO',
    'home.tagline': 'Posso fazer o que você precisar, desde que eu esteja aprendendo algo ou sendo bem pago — de preferência ambos.',
    'home.cta.projects': 'Ver Projetos →',
    'home.cta.contact': 'Entre em Contato',
    'home.stats.projects': 'Projetos',
    'home.stats.technologies': 'Tecnologias',
    'home.stats.certs': 'Certificados',
    'home.stats.hackathons': 'Hackathons',
    'home.techLabel': 'Experiência prática com',

    'projects.title': 'Projetos',
    'projects.viewAll': 'Ver tudo no GitHub →',
    'projects.liveSite': 'Site ao vivo',
    'projects.github': 'GitHub',

    'blogs.label': 'Escrita',
    'blogs.title': 'Blog',
    'blogs.desc': 'Pensamentos sobre tecnologia, desenvolvimento e IA.',
    'blogs.followMedium': 'Seguir no Medium →',

    'contact.label': 'Contato',
    'contact.heading': 'Vamos construir\nalgo.',
    'contact.sub': 'Aberto a projetos interessantes, colaborações e conversas. Seja um projeto ou só um olá — minha caixa de entrada está sempre aberta.',
    'contact.cta': 'Enviar um email →',
    'contact.findMe': 'Me encontre online',
    'contact.location': 'Nova Deli, Índia · Disponível para oportunidades',

    'lang.label': 'Idioma',
    'lang.search': 'Buscar idioma',
  },
}

export default translations
