export default {
  nav: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    cta: 'Start a project',
    links: [
      { id: 'work', label: 'Work' },
      { id: 'services', label: 'Services' },
      { id: 'process', label: 'Process' },
      { id: 'originals', label: 'Originals' },
      { id: 'lab', label: 'Lab' },
      { id: 'contact', label: 'Contact' },
    ],
  },

  hero: {
    eyebrow: 'Marketing & content studio',
    titleLead: 'We turn ideas',
    titleAccent: 'into worlds.',
    lede: 'Oneiria is a marketing agency and content creation studio. We shape strategy, identity, film and campaigns into brand worlds people actually want to spend time in.',
    primary: 'Start a project',
    secondary: 'See our work',
    scroll: 'Scroll to explore',
  },

  ticker: {
    label: 'What we make',
    items: [
      'Brand strategy',
      'Film production',
      'Campaign concepts',
      'Visual identity',
      'Social content',
      'Motion design',
      'Art direction',
      'Content systems',
      'Post-production',
      'Naming & messaging',
    ],
  },

  intro: {
    eyebrow: 'Who we are',
    statement: 'Ideas are infinite. We give them form.',
    body: [
      'Oneiria was built around a simple belief: a good idea deserves more than a good slide. It deserves a world — a tone, a look, a rhythm and a reason to exist that holds together everywhere it shows up.',
      'We work as one team across strategy and production, so the thought that wins the room is the same thought that ends up on screen, on the feed and on the shelf.',
    ],
    points: [
      { k: '01', v: 'Strategy first', d: 'Every project starts with the question behind the brief.' },
      { k: '02', v: 'Made in-house', d: 'Direction, design and post under one roof.' },
      { k: '03', v: 'Human directed', d: 'Technology accelerates the work; people own it.' },
    ],
  },

  services: {
    eyebrow: 'Services',
    title: 'Five ways we build your world.',
    lede: 'Take one, take all of them — they are designed to compound.',
    items: [
      {
        no: '01',
        title: 'Brand strategy & positioning',
        blurb:
          'We find the sharpest version of your story and the audience it belongs to, then write the messaging architecture your whole team can reuse.',
        tags: ['Positioning', 'Naming', 'Messaging', 'Audience research'],
      },
      {
        no: '02',
        title: 'Advertising campaigns',
        blurb:
          'Platform ideas built to travel — one thought that survives the jump from film to OOH to a six-second cut without losing its edge.',
        tags: ['Concept development', 'Art direction', 'ATL & digital', 'Rollout systems'],
      },
      {
        no: '03',
        title: 'Content creation & film production',
        blurb:
          'From treatment to final grade: commercials, brand films, documentary, interview and short-form — directed, shot and finished by the same team.',
        tags: ['Direction', 'Production', 'Editing', 'Colour & sound'],
      },
      {
        no: '04',
        title: 'Social & digital content',
        blurb:
          'Always-on content systems: formats, templates, shot lists and cadences your team can actually keep running after we hand them over.',
        tags: ['Content systems', 'Short-form', 'Channel design', 'Templates'],
      },
      {
        no: '05',
        title: 'Design & identity',
        blurb:
          'Logos, type, colour, layout and the rules that keep everything coherent as you grow — delivered as a usable design system, not a PDF nobody opens.',
        tags: ['Visual identity', 'Design systems', 'Motion identity', 'Guidelines'],
      },
    ],
  },

  work: {
    eyebrow: 'Selected work',
    title: 'Worlds we have built.',
    lede: 'Filter by discipline, open a project to see how it was put together.',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'film', label: 'Film' },
      { id: 'campaign', label: 'Campaign' },
      { id: 'social', label: 'Social' },
      { id: 'identity', label: 'Identity' },
      { id: 'motion', label: 'Motion' },
    ],
    open: 'View project',
    empty: 'Nothing in this discipline yet — try another filter.',
    modal: { scope: 'Scope', note: 'Project note', close: 'Close project' },
    items: [
      {
        id: 'set-to-screen',
        title: 'Set to Screen',
        category: 'film',
        discipline: 'Film production',
        badge: 'Concept Study',
        image: 'images/work-production.jpg',
        alt: 'Cinema camera on a dolly under studio lighting',
        summary:
          'A study in how a production house presents its craft: camera, light and crew treated as the product, not the backdrop.',
        body: 'We built a visual language around the physical reality of a shoot — long lenses, hard practicals and a monochrome palette broken only by the brand accent. The intent was a treatment that reads as confident on a projector and still holds together as a single social frame.',
        scope: ['Creative direction', 'Shot list & treatment', 'Colour script', 'Edit structure'],
        note: 'Independent concept work by Oneiria. No client, brand or campaign is implied.',
      },
      {
        id: 'studio-hours',
        title: 'Studio Hours',
        category: 'film',
        discipline: 'Content production',
        badge: 'Creative Exploration',
        image: 'images/work-studio.jpg',
        alt: 'Director chair and lighting rig on a studio stage',
        summary:
          'An always-on format for behind-the-scenes content, designed to be shot in a single session and cut into a month of material.',
        body: 'The idea was efficiency without looking cheap: one stage, three lighting states and a fixed set of segment types. Everything is pre-lit so a small crew can produce interview, B-roll and presenter content in a single day, then assemble it in any order.',
        scope: ['Format design', 'Studio lighting plan', 'Segment templates', 'Editorial rules'],
        note: 'Independent concept work by Oneiria. No client, brand or campaign is implied.',
      },
      {
        id: 'aperture-system',
        title: 'Aperture System',
        category: 'identity',
        discipline: 'Brand identity',
        badge: 'Concept Study',
        image: 'images/work-identity.jpg',
        alt: 'Sketchbook of logo studies beside a glowing aperture mark',
        summary:
          'A complete identity kit: mark, wordmark, colour, type and the spacing rules that keep it intact across every touchpoint.',
        body: 'Starting from hand sketches, the mark was reduced to a single aperture gesture that survives at 16 pixels and at billboard scale. The system ships with clear-space, minimum-size and monochrome rules so it can be applied by anyone without drifting.',
        scope: ['Mark & wordmark', 'Colour & type system', 'Clear-space rules', 'Asset library'],
        note: 'Independent concept work by Oneiria. No client, brand or campaign is implied.',
      },
      {
        id: 'shadows-and-light',
        title: 'Shadows & Light',
        category: 'campaign',
        discipline: 'Campaign art direction',
        badge: 'Speculative Campaign',
        image: 'images/work-campaign.jpg',
        alt: 'Typographic campaign poster in brand colours',
        summary:
          'A typographic campaign platform exploring one line of copy across print, outdoor and motion.',
        body: 'The platform deliberately leans on language rather than imagery, so the same sentence can be typeset for a poster, animated for a bumper and read aloud in a cutdown without being rewritten. We tested the idea at three very different scales to prove it bends without breaking.',
        scope: ['Platform idea', 'Copy system', 'Typography & layout', 'Motion adaptation'],
        note: 'Speculative campaign created by Oneiria for demonstration. No client, brand or campaign is implied.',
      },
      {
        id: 'pocket-worlds',
        title: 'Pocket Worlds',
        category: 'social',
        discipline: 'Social content system',
        badge: 'Creative Exploration',
        image: 'images/work-social.jpg',
        alt: 'Smartphone showing an app icon on a dark desk',
        summary:
          'A mobile-first content kit — hooks, templates and shot patterns — built so a two-person team can post consistently.',
        body: 'Rather than a list of posts, we designed a grammar: how a frame opens, where the logo appears, how captions behave and which three formats repeat each week. Consistency comes from the rules, not from remembering to be consistent.',
        scope: ['Format grammar', 'Template kit', 'Hook library', 'Publishing cadence'],
        note: 'Independent concept work by Oneiria. No client, brand or campaign is implied.',
      },
      {
        id: 'signal-and-sweep',
        title: 'Signal & Sweep',
        category: 'motion',
        discipline: 'Motion & broadcast',
        badge: 'Concept Study',
        image: 'images/work-motion.jpg',
        alt: 'Repeating pattern of aperture marks in brand colours',
        summary:
          'A motion identity built from the aperture mark: transitions, lower thirds and end cards that all move the same way.',
        body: 'One geometric rule — open, sweep, resolve — drives every animation, so a title card and a lower third feel like they came from the same place. The system is delivered as reusable presets rather than one-off renders.',
        scope: ['Motion principles', 'Transition set', 'Lower thirds & end cards', 'Preset library'],
        note: 'Independent concept work by Oneiria. No client, brand or campaign is implied.',
      },
    ],
  },

  process: {
    eyebrow: 'How we work',
    title: 'Five stages, no black boxes.',
    lede: 'You always know which stage we are in, what we need from you and what you get back.',
    steps: [
      {
        no: '01',
        title: 'Idea',
        body: 'We interrogate the brief, the audience and the market until there is a single question worth answering.',
      },
      {
        no: '02',
        title: 'Concept',
        body: 'Two or three routes, fully argued — with references, tone and the first rough shape of the work.',
      },
      {
        no: '03',
        title: 'Production',
        body: 'Design, shoot and build. One team owns the craft from the first frame to the final export.',
      },
      {
        no: '04',
        title: 'Distribution',
        body: 'Every deliverable is prepared in the right format, ratio and length for where it will actually live.',
      },
      {
        no: '05',
        title: 'Audience',
        body: 'We read the response together, keep what worked and feed the learning straight back into the next idea.',
      },
    ],
  },

  why: {
    eyebrow: 'Why Oneiria',
    title: 'Built differently on purpose.',
    points: [
      {
        title: 'Human-directed, always',
        body: 'AI tooling speeds up research, cleanup and first passes. Every idea, frame, word and decision is made and owned by people.',
      },
      {
        title: 'One team, end to end',
        body: 'Strategy, design and production sit together, so the thought that wins approval is the thought that ends up on screen.',
      },
      {
        title: 'Made for remote collaboration',
        body: 'Async-first workflows, clear checkpoints and shared review links — we work with teams across regions and time zones.',
      },
      {
        title: 'Craft you can feel',
        body: 'Typography, grading, sound and pacing get the attention that separates content people scroll past from content people finish.',
      },
    ],
  },

  originals: {
    eyebrow: 'Oneiria Originals',
    title: 'Stories we develop in-house.',
    lede: 'Alongside client work we write, produce and publish our own formats — films, series and experiments that keep the studio sharp.',
    body: 'Originals are where we test ideas at our own risk. They are not a service we sell; they are the studio keeping its hand in, and they frequently become the techniques we bring to client projects later.',
    points: [
      { title: 'Short-form series', body: 'Episodic formats designed from the start to be cut for several platforms.' },
      { title: 'Documentary shorts', body: 'Small crews, long lenses and the patience to wait for the real moment.' },
      { title: 'Studio experiments', body: 'Tests in motion, sound and interactive storytelling with no brief attached.' },
    ],
    cta: 'Ask us what we are making',
  },

  tech: {
    eyebrow: 'Technology & responsible AI',
    title: 'AI is a tool in the room — never the author.',
    lede: 'We use modern tooling where it genuinely improves the work, and we are explicit about where it stops.',
    principles: [
      {
        title: 'People decide',
        body: 'Concepts, scripts, edits and final calls are made by the team. Generated material is never the deliverable on its own.',
      },
      {
        title: 'Disclosure',
        body: 'If AI-assisted tooling meaningfully shaped a deliverable, we say so before it ships — no quiet substitutions.',
      },
      {
        title: 'Rights & consent',
        body: 'We do not imitate living artists, voices or styles without permission, and we keep provenance on anything we generate.',
      },
      {
        title: 'Speed, not shortcuts',
        body: 'We use it to remove drudgery — cleanup, variants, transcription — so more time goes into the parts that need judgement.',
      },
    ],
    note: 'AI supports the process. It does not replace the director, the designer or the writer.',
  },

  lab: {
    eyebrow: 'Oneiria Lab',
    status: 'Future initiative',
    title: 'The experiments we have not launched yet.',
    lede: 'Oneiria Lab is our planned research and experimentation space — a home for new formats, interactive storytelling and the tooling we wish existed.',
    body: 'It is a direction we are building toward rather than a service we sell today. When something leaves the Lab it arrives with the same standards as the rest of the studio.',
    points: [
      { title: 'New formats', body: 'Serialised, spatial and participative ways of telling a brand story.' },
      { title: 'Production tooling', body: 'Small internal tools that remove friction from review, versioning and delivery.' },
      { title: 'Responsible experiments', body: 'Testing emerging technology under consent, with provenance, before it touches client work.' },
    ],
    note: 'Oneiria Lab is a future initiative and is not currently accepting briefs.',
  },

  audiences: {
    eyebrow: 'Who we work with',
    title: 'Teams that need a world, not a deliverable.',
    items: [
      { title: 'Companies & brands', body: 'Launches, repositioning and the ongoing content that keeps a brand present.' },
      { title: 'Institutions & public bodies', body: 'Campaigns that have to be clear, accessible and accountable at scale.' },
      { title: 'Startups & growing businesses', body: 'Identity and content foundations built to survive rapid growth.' },
      { title: 'Agencies & production partners', body: 'White-label direction, production and post for teams that need extra hands.' },
    ],
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions, answered honestly.',
    items: [
      {
        q: 'What kind of projects do you take on?',
        a: 'Brand strategy, identity design, advertising campaigns, film and video production, and social content systems. Most engagements combine two or more of these — for example an identity plus the first campaign that introduces it.',
      },
      {
        q: 'How do you price a project?',
        a: 'By scope, not by menu. After a short discovery conversation we write a proposal that lists deliverables, rounds of revision, timeline and a fixed fee, so there are no surprises later. We do not publish generic price lists because no two projects are the same size.',
      },
      {
        q: 'Do you work remotely?',
        a: 'Yes. We are set up for remote collaboration across regions and time zones, with async updates, shared review links and scheduled checkpoints. Shoots and on-site sessions are planned around whoever needs to be in the room.',
      },
      {
        q: 'Do you use AI in your work?',
        a: 'Selectively, and never as the author. We use assisted tooling for research, cleanup, variants and transcription. Concepts, scripts, edits and final decisions are made by people, and we tell you when tooling materially shaped a deliverable.',
      },
      {
        q: 'How long does a project take?',
        a: 'It depends on scope and on how fast feedback arrives. A focused identity or content sprint can take a few weeks; a campaign with production usually runs longer. Your proposal includes a stage-by-stage schedule before any work begins.',
      },
      {
        q: 'What do you need from us to start?',
        a: 'A clear objective, whoever can approve decisions, and whatever brand material already exists. If the brief is still fuzzy, that is fine — defining it together is normally the first stage of the work.',
      },
      {
        q: 'Can you work with our existing brand guidelines?',
        a: 'Absolutely. We are happy to work strictly inside a supplied system, or to extend one that has gaps. If we produce identity work, it arrives with the rules needed to keep applying it consistently.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: 'Tell us what you want to build.',
    lede: 'A paragraph is plenty to start: what you are making, who it is for and when you need it.',
    labels: {
      name: 'Your name',
      email: 'Email',
      company: 'Company or organisation',
      type: 'Type of project',
      message: 'Project details',
    },
    placeholders: {
      name: 'Jane Doe',
      email: 'jane@company.com',
      company: 'Optional',
      message: 'What are you making, who is it for, and when do you need it?',
    },
    types: {
      'brand-strategy': 'Brand strategy',
      'identity-design': 'Identity design',
      campaign: 'Advertising campaign',
      'film-production': 'Film & video production',
      'social-content': 'Social content system',
      other: 'Something else',
    },
    submit: 'Send enquiry',
    sending: 'Sending…',
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
    tooLong: 'Please keep the message under 4000 characters.',
    success: 'Thanks — your message has been sent. We normally reply within two working days.',
    failure: 'We could not send your message. Please try again in a moment.',
    notConfigured:
      'This form is not connected to a mailbox yet, so nothing will be sent. The site owner can switch it on by setting CONTACT_ENDPOINT in src/config/site.js — see the README for setup instructions.',
    aside: {
      title: 'What helps us reply fast',
      items: [
        'The objective, not just the deliverable',
        'Who needs to approve the work',
        'Any deadline that is fixed',
        'Existing brand material or references',
      ],
    },
    hpLabel: 'Leave this field empty',
  },

  footer: {
    tagline: 'Ideas into Worlds',
    blurb: 'Marketing agency and content creation studio.',
    navLabel: 'Explore',
    contactLabel: 'Contact',
    languageLabel: 'Language',
    disclosure:
      'Concept work shown on this site is labelled as concept study, creative exploration or speculative campaign. Oneiria Lab is a future initiative.',
    rights: 'All rights reserved.',
    toTop: 'Back to top',
  },
}
