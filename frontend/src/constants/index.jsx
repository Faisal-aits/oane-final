// ── Navigation ─────────────────────────────────────────────
export const NAV_LINKS = [
  { id: 'about',    label: 'About'    },
  { id: 'services', label: 'Services' },
  { id: 'work',     label: 'Work'     },
  { id: 'journal',  label: 'Journal'  },
  { id: 'contact',  label: 'Contact', isButton: true },
];

// ── Philosophy Principles ───────────────────────────────────
export const PHILOSOPHY_PRINCIPLES = [
  {
    number: '01',
    title:  'Light Follows Architecture',
    body:   "We begin with the architect's intent, not the product catalogue. The space defines what the light needs to do. Every decision follows from the architecture — never the other way around.",
  },
  {
    number: '02',
    title:  'Experience Over Spectacle',
    body:   "We design light that rewards attention, not demands it. The best lighting is the kind you feel — warmth in a lobby, intimacy in a restaurant, calm in a corridor — without ever noticing why.",
  },
  {
    number: '03',
    title:  'Function Before Decoration',
    body:   "The lighting must work before it can be beautiful. Spatial hierarchy, task performance, material response, circadian comfort — these come first. The aesthetic follows from the function, not the other way around.",
  },
  {
    number: '04',
    title:  'Clarity Over Complexity',
    body:   "The simplest solution that serves the architecture is usually the right one. We don't add layers of complexity to justify our involvement. We add clarity to what the space already wants to be.",
  },
  {
    number: '05',
    title:  'Design Before Product',
    body:   "The fixture is the last decision, not the first. We specify products only after the design intent is established, the layers are defined, and the spatial hierarchy is clear. The right product emerges from the right design — never the reverse.",
  },
];

// ── Services ────────────────────────────────────────────────
export const SERVICES = [
  {
    title: 'Concept Development',
    body:  "We translate the architect's spatial intent into a lighting language. From initial concept through to mood studies, reference imagery, and narrative direction — establishing what the light needs to achieve before a single fixture enters the conversation.",
  },
  {
    title: 'Detailed Lighting Design',
    body:  "Comprehensive lighting layouts, fixture schedules, specification documents, and control strategies. Every fitting is selected to serve the design intent. We coordinate with the full project team to ensure the design is buildable, compliant, and on budget.",
  },
  {
    title: 'Specification & Procurement Support',
    body:  "Product-agnostic specification based on performance, not brand loyalty. We evaluate fixtures on optical quality, colour rendering, beam control, and value. When budgets shift, we adapt specifications without compromising the design intent.",
  },
  {
    title: 'On-Site Focusing & Commissioning',
    body:  "The moment the design becomes real. We attend site during installation and focusing to ensure every fixture is aimed, dimmed, and balanced exactly as designed. This is the most critical phase — and the one most projects skip.",
  },
  {
    title: 'Lighting Masterplanning',
    body:  "For large-scale developments, campuses, and urban projects. A unified lighting strategy across multiple buildings, landscapes, and public spaces — ensuring consistency of atmosphere and experience across the entire site.",
  },
  {
    title: 'Daylight Integration',
    body:  "Natural and artificial light are not separate systems. We model daylight behaviour across seasons and hours, then design the artificial lighting to complement, not compete with, the sun. In the UAE, where sunlight is the dominant condition, this is not optional — it is fundamental.",
  },
];

// ── Process Phases ──────────────────────────────────────────
export const PROCESS_PHASES = [
  {
    number: '01',
    title:  'Listen',
    body:   "We study the architecture. The materials. The spatial intent. We meet with the architect, the interior designer, and the engineering team to understand what the space wants to be. No preconceptions. No default solutions.",
  },
  {
    number: '02',
    title:  'Design',
    body:   "Concept development through to detailed design. Mood studies. Lighting layouts. Layer strategies. We define the spatial hierarchy — where light creates focus, where shadow adds depth, how the space transforms from day to night.",
  },
  {
    number: '03',
    title:  'Specify',
    body:   "Product-agnostic fixture selection. We specify based on optical performance, colour rendering, and design fit — not brand preference. We produce detailed specification documents and coordinate with the MEP engineer.",
  },
  {
    number: '04',
    title:  'Focus',
    body:   "On-site commissioning and focusing. We attend site to ensure every fixture is aimed, dimmed, and balanced exactly as designed. This is where the drawing becomes real. It is the most important day on any lighting project.",
  },
];

// ── Sectors ─────────────────────────────────────────────────
export const SECTORS = [
  'Hospitality & Hotels',
  'Restaurants & F&B',
  'Commercial Offices',
  'Residential',
  'Retail',
  'Cultural & Public Spaces',
  'Facades & Landscapes',
  'Masterplanning',
];

// ── Journal Articles ────────────────────────────────────────
export const JOURNAL_ARTICLES = [
  {
    title:   'Why Every Project Team Needs a Lighting Designer',
    excerpt: "Exploring the role of dedicated lighting design in the UAE's built environment.",
    date:    'April 2026',
    tag:     'Practice',
  },
  {
    title:   'The Five Layers of Architectural Lighting',
    excerpt: 'Ambient. Task. Accent. Decorative. Natural. What each layer does and why they matter together.',
    date:    'March 2026',
    tag:     'Design',
  },
  {
    title:   'How Light Changes the Way Materials Feel',
    excerpt: "Concrete, marble, wood, brass — every material responds differently to light. Here's why it matters.",
    date:    'February 2026',
    tag:     'Craft',
  },
];

// ── Contact Details ─────────────────────────────────────────
export const CONTACT_DETAILS = [
  { label: 'Email',     value: 'hello@onae.ae',                href: 'mailto:hello@onae.ae' },
  { label: 'Phone',     value: '+971 — — — — — —',             href: 'tel:+971000000000' },
  { label: 'Location',  value: 'Dubai, United Arab Emirates',   href: null },
  { label: 'Instagram', value: '@onae.light',                   href: 'https://instagram.com/onae.light' },
  { label: 'LinkedIn',  value: 'ONAÈ Lighting Design',          href: 'https://linkedin.com' },
];

// ── Project Type Options (contact form) ─────────────────────
export const PROJECT_TYPES = [
  'Hospitality',
  'Commercial',
  'Residential',
  'F&B',
  'Cultural',
  'Masterplanning',
  'Other',
];
