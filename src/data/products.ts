export interface ProductFeature {
  num: string
  title: string
  body: string
}

export interface ProductStep {
  num: string
  title: string
  body: string
}

export interface ProductBenefit {
  title: string
  body: string
}

export interface ProductFaq {
  question: string
  answer: string
}

export interface Product {
  slug: string
  num: string
  name: string
  category: string
  url: string
  domain: string
  tagline: string
  summary: string
  problemTitle: string
  problemA: string
  problemB: string
  approachTitle: string
  approach: string
  howTitle: string
  features: ProductFeature[]
  steps: ProductStep[]
  benefits: ProductBenefit[]
  faq: ProductFaq[]
}

export const PRODUCTS: Product[] = [
  {
    slug: 'stacship',
    num: '01',
    name: 'StacShip',
    category: 'Developer Infrastructure',
    url: 'http://stacship.com',
    domain: 'stacship.com',
    tagline: 'Making self-hosted infrastructure simple.',
    summary:
      'Turn any VPS into a modern deployment platform. Connect your server. Connect your repository. Deploy without touching the terminal.',
    problemTitle: 'Self-hosting forces a choice between control and convenience.',
    problemA:
      'Owning your infrastructure means owning provisioning, reverse proxies, TLS renewal, environment variables, log rotation and rollback — a stack of small decisions that has nothing to do with the product you are actually shipping.',
    problemB:
      'Managed platforms remove that work, but they take the server with them: opaque pricing, opaque runtime, and no path back to hardware you control.',
    approachTitle: 'Your server, treated like a platform.',
    approach:
      'StacShip connects over SSH to a machine you already own and turns it into a deployment target with the ergonomics of a managed platform. No agent to babysit, no proprietary runtime, no lock-in — everything it configures is standard, inspectable and yours the day you stop using it.',
    howTitle: 'Three steps to first deploy.',
    features: [
      { num: '01', title: 'One-command server setup', body: 'Point StacShip at a fresh VPS and it prepares the runtime, firewall and proxy layer for you.' },
      { num: '02', title: 'Git-native deploys', body: 'Connect a repository once. Every push to your chosen branch builds and releases automatically.' },
      { num: '03', title: 'Automatic TLS', body: 'Certificates are issued and renewed in the background. Domains attach in a single step.' },
      { num: '04', title: 'Environment management', body: 'Encrypted variables per environment, versioned alongside the deploys that used them.' },
      { num: '05', title: 'Instant rollback', body: 'Previous releases stay warm on disk. Reverting is one action, not a redeploy.' },
      { num: '06', title: 'Logs and health', body: 'Streaming logs, resource usage and container health, without opening a terminal.' }
    ],
    steps: [
      { num: '01', title: 'Connect your server', body: 'Add a VPS with an SSH key. StacShip provisions the runtime and leaves the machine standard.' },
      { num: '02', title: 'Connect your repository', body: 'Choose a repo and branch. Build settings are detected, and you can override any of them.' },
      { num: '03', title: 'Deploy', body: 'Push. StacShip builds, releases and routes traffic — with a rollback always one click away.' }
    ],
    benefits: [
      { title: 'Predictable cost', body: 'Pay for the server you chose, not per seat or per build minute.' },
      { title: 'No lock-in', body: 'Standard containers and config. Remove StacShip and the server keeps running.' },
      { title: 'Fewer moving parts', body: 'One place for deploys, domains, variables and logs.' },
      { title: 'Safe by default', body: 'Every release is versioned and reversible.' }
    ],
    faq: [
      { question: 'Do I need Docker experience?', answer: 'No. StacShip detects common stacks and generates a sane build. If you know Docker, every generated file is visible and editable.' },
      { question: 'Which providers are supported?', answer: 'Any machine you can reach over SSH — Hetzner, DigitalOcean, OVH, AWS, or hardware in your own rack.' },
      { question: 'What happens if StacShip is unavailable?', answer: 'Nothing to your running applications. StacShip is a control plane; your containers run independently on your server.' },
      { question: 'Can I run multiple projects on one server?', answer: 'Yes. Projects are isolated at the container and domain level, with per-project variables and logs.' }
    ]
  },
  {
    slug: 'tablesnap',
    num: '02',
    name: 'TableSnap',
    category: 'Customer Experience',
    url: 'https://tablesnap.dexic.tech/',
    domain: 'tablesnap.dexic.tech',
    tagline: 'Customer stories, captured effortlessly.',
    summary: 'Collect authentic video testimonials through beautifully simple QR experiences.',
    problemTitle: 'The best moment to ask is the hardest moment to reach.',
    problemA:
      'Customers are most enthusiastic while the experience is still in front of them. By the time a request email arrives days later, the feeling — and the reply — is gone.',
    problemB:
      'The tools that do exist ask for accounts, apps and downloads. Every extra step between the moment and the recording costs you the story.',
    approachTitle: 'Zero friction between the moment and the recording.',
    approach:
      'TableSnap turns a scan into a finished testimonial. A guest points their camera at a code, sees a single prompt, records in the browser, and is done in under a minute — no app, no login, no upload screen. What you get back is organised, consented and ready to publish.',
    howTitle: 'From scan to story.',
    features: [
      { num: '01', title: 'Scan to record', body: 'A QR code opens a recorder in the browser. Nothing to install, on any modern phone.' },
      { num: '02', title: 'Guided prompts', body: 'Short on-screen questions help guests say something useful instead of freezing.' },
      { num: '03', title: 'Consent captured', body: 'Usage permission is collected with the recording and stored with it.' },
      { num: '04', title: 'Automatic transcripts', body: 'Every video is transcribed so quotes are searchable and easy to pull.' },
      { num: '05', title: 'Embeddable walls', body: 'Publish a curated set as a lightweight embed that loads fast anywhere.' },
      { num: '06', title: 'Location-aware codes', body: 'Per-table, per-branch or per-campaign codes, all reporting into one library.' }
    ],
    steps: [
      { num: '01', title: 'Create a collection', body: 'Name the moment you want to capture and set one or two prompts.' },
      { num: '02', title: 'Place the code', body: 'Print it for a table, add it to a receipt, or drop it into an email.' },
      { num: '03', title: 'Review and publish', body: 'Approve the recordings you want and embed them in a single line.' }
    ],
    benefits: [
      { title: 'Higher response rate', body: 'Asking in the moment beats asking later, every time.' },
      { title: 'Real voices', body: 'Unscripted video is harder to fake and easier to trust.' },
      { title: 'No app tax', body: 'Guests never leave the browser or create an account.' },
      { title: 'Publish-ready', body: 'Consent, transcript and crop handled before you touch it.' }
    ],
    faq: [
      { question: 'Does the guest need an app?', answer: 'No. Recording happens in the mobile browser using the standard camera permission prompt.' },
      { question: 'Who owns the videos?', answer: 'You do. Recordings can be exported in full at any time, with their transcripts.' },
      { question: 'Can we moderate what goes live?', answer: 'Yes. Nothing is published until you approve it, and published items can be pulled instantly.' },
      { question: 'Does it work offline at the venue?', answer: 'The recorder needs a connection to upload, but it retries in the background if the signal drops.' }
    ]
  },
  {
    slug: 'woofy',
    num: '03',
    name: 'Woofy',
    category: 'Civic Technology',
    url: 'https://woofy.dexic.tech',
    domain: 'woofy.dexic.tech',
    tagline: "Pakistan's #1 Animal Rescue Platform.",
    summary: 'Helping communities rescue, report and support animals through technology.',
    problemTitle: 'Rescue depends on coordination that does not exist.',
    problemA:
      'Someone finds an injured animal and starts calling. Numbers are out of date, groups are on different apps, and the same case is reported five times while nobody is certain anyone is on the way.',
    problemB:
      'Rescuers face the mirror problem: no shared view of what has been reported nearby, who has responded, or which clinic has capacity tonight.',
    approachTitle: 'One shared, local view of every case.',
    approach:
      'Woofy gives a city one map. A report takes seconds and a photo. Nearby verified rescuers and clinics are notified, one of them claims the case, and everyone watching sees the same status until it closes. Support — funds, transport, fostering — attaches to the case rather than floating in a group chat.',
    howTitle: 'How a rescue moves.',
    features: [
      { num: '01', title: 'Report in seconds', body: 'A photo and a pinned location are enough to open a case.' },
      { num: '02', title: 'Nearby dispatch', body: 'Verified rescuers within range are alerted immediately.' },
      { num: '03', title: 'Duplicate merging', body: 'Reports of the same animal are grouped so effort is not wasted.' },
      { num: '04', title: 'Clinic directory', body: 'Partner vets with current availability and treatment history per case.' },
      { num: '05', title: 'Case timeline', body: 'Every update, cost and outcome recorded in one public thread.' },
      { num: '06', title: 'Direct support', body: 'Donations and fostering offers attach to a specific, verifiable case.' }
    ],
    steps: [
      { num: '01', title: 'Report', body: 'Anyone can open a case with a photo, a location and a short note.' },
      { num: '02', title: 'Respond', body: 'Nearby rescuers are notified and one claims the case, ending the guesswork.' },
      { num: '03', title: 'Resolve', body: 'Treatment, cost and outcome are logged, and the case closes publicly.' }
    ],
    benefits: [
      { title: 'Faster response', body: 'Cases reach the closest available rescuer, not a group chat.' },
      { title: 'Less duplicated effort', body: 'One animal, one case, one owner of the response.' },
      { title: 'Accountable giving', body: 'Every rupee is tied to a case with a visible outcome.' },
      { title: 'Local knowledge, kept', body: 'Clinics, feeders and shelters stay on one live map.' }
    ],
    faq: [
      { question: 'Is Woofy free to use?', answer: 'Reporting and responding are free. The platform is funded by partners and by a small share of optional case donations.' },
      { question: 'How are rescuers verified?', answer: 'Rescuers and clinics are reviewed before they can claim cases, and their history stays visible on their profile.' },
      { question: 'Which cities are covered?', answer: 'Coverage is strongest in Karachi, Lahore and Islamabad, and expands as verified responders join a city.' },
      { question: 'Can organisations use it internally?', answer: 'Yes. Shelters can manage intake, capacity and case handovers within the same map.' }
    ]
  }
]

export const FOCUS = [
  'Product Design',
  'Product Engineering',
  'Backend Systems',
  'Cloud Infrastructure',
  'Developer Experience',
  'Long-term Product Thinking'
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug)
}
