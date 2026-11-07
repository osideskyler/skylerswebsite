export type ProjectMedia = {
  type: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  caption: string;
  placeholder: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type FeaturedProject = {
  slug: string;
  eyebrow: string;
  title: string;
  oneLiner: string;
  summary: string;
  role: string;
  timeline: string;
  impact: string[];
  tech: string[];
  problem: string;
  solution: string;
  outcomes: string[];
  media: ProjectMedia[];
  links?: ProjectLink[];
};

export type SecondaryProject = {
  title: string;
  year?: string;
  description: string;
  tags: string[];
  image?: {
    src: string;
    alt: string;
  };
  links?: ProjectLink[];
};

export type ExperienceItem = {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Snapshot = {
  title: string;
  subtitle: string;
  imageSrc?: string;
};

export type ResumeHighlightIcon =
  | "badgePercent"
  | "briefcaseBusiness"
  | "headset"
  | "trophy"
  | "clock3"
  | "layoutDashboard"
  | "megaphone"
  | "users"
  | "languages"
  | "sparkles"
  | "presentation";

export type ResumeHighlightCard = {
  label: string;
  value: string;
  detail: string;
  icon: ResumeHighlightIcon;
};

export const siteMeta = {
  name: "Skyler Smith",
  role: "Information Systems Student",
  headline: "Building AI-driven products with a business lens.",
  intro:
    "I design and ship software that solves real operational problems, communicates value clearly, and feels polished enough to stand in front of customers, teammates, and recruiters.",
  email: "osideskyler@gmail.com",
  phone: "(760) 978-7799",
  linkedin: "https://www.linkedin.com/in/skyler-smith1",
  resume: "/resume/skyler-smith-resume-2026.pdf",
  // Drop your headshot in public/images/ and set the path here, e.g. "/images/skyler.jpg"
  photo: "/images/about/skylerbeach.JPG",
};

export const rotatingResumeCards: ResumeHighlightCard[] = [
  {
    label: "Pattern",
    value: "300+",
    detail: "Governed the rollout of Claude skills and 50+ team plugins across the enterprise.",
    icon: "sparkles",
  },
  {
    label: "Pattern",
    value: "50+",
    detail: "Led AI enablement workshops on cost optimization, plus biweekly advanced sessions.",
    icon: "presentation",
  },
  {
    label: "Trust Scores",
    value: "98%",
    detail: "Cut verification cost per user in the Trust Scores platform.",
    icon: "badgePercent",
  },
  {
    label: "Redo",
    value: "$180k/mo",
    detail: "Acted as SME for a claims dashboard pipeline at Redo.",
    icon: "briefcaseBusiness",
  },
  {
    label: "Redo",
    value: "500+",
    detail: "Resolved technical issues with perfect CSAT.",
    icon: "headset",
  },
  {
    label: "BYU ",
    value: "1st Place",
    detail: "Won BYU's IS Core INTEX competition.",
    icon: "trophy",
  },
  {
    label: "Trust Labs",
    value: "10 Sec",
    detail: "Helped engineer a fast verification flow that kept user friction low.",
    icon: "clock3",
  },
  {
    label: "Redo",
    value: "1 App",
    detail: "Developed a claims dashboard web app for analytics and process automation.",
    icon: "layoutDashboard",
  },
  {
    label: "RV Fun Center & BallBoyz",
    value: "50%",
    detail: "Cut cost per result while improving lead quality in freelance campaigns.",
    icon: "megaphone",
  },
  {
    label: "Mission Service",
    value: "20+",
    detail: "Mentored volunteers through weekly coaching and leadership development.",
    icon: "users",
  },
  {
    label: "Spanish Fluency",
    value: "2 Years",
    detail: "Built communication skills through full-time service work in Mexico City.",
    icon: "languages",
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "trust-scores-app",
    eyebrow: "Flagship Project",
    title: "Trust Scores App",
    oneLiner:
      "A review verification platform designed to make identity checks fast, affordable, and enterprise-ready.",
    summary:
      "Built as a product engineering project in a BYU research lab, Trust Scores combines facial recognition, OAuth sign-in, and a scalable Go and AWS backend to prove that the person leaving a review is real, without making them jump through hoops. I also built Thread Lab, a full demo storefront that shows the verified-review widget working inside a realistic shopping experience.",
    role: "Product Engineer",
    timeline: "Jun 2025 - Oct 2025",
    impact: [
      "Reduced verification cost per user by 98%.",
      "Created a verification experience that takes roughly 10 seconds.",
      "Turned a professor's research goals into a production-minded system with an SDK direction for enterprise scale.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Go", "AWS", "Supabase", "OAuth", "Facial Recognition"],
    problem:
      "Online reviews drive buying decisions, but anyone can post one. Most identity verification tools either add too much friction for a quick review or cost too much per user to run at the volume a review platform needs.",
    solution:
      "I helped engineer a lightweight full-stack flow: reviewers sign in with OAuth, complete a short face check, and earn a verified badge that shows up directly on the review. The backend was built in Go on AWS with Supabase for data, and the widget was packaged so a store could drop it in. To show it in context, I built Thread Lab, a Next.js 15 storefront with product listings, filters, a persistent cart, checkout, and a full reviews system where verified reviews stand out.",
    outcomes: [
      "Delivered a verification flow fast enough that it feels like part of writing a review, not a separate chore.",
      "Cut the per-user cost of verification by 98% compared to the original approach.",
      "Built a demo storefront that let the lab show partners how verified reviews look and behave on a real store.",
      "Designed the system with an SDK-oriented direction so it could scale to enterprise customers.",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/trust-scores/reviewwidget.png",
        alt: "Trust Scores review widget with verified badge",
        caption:
          "The review widget highlights verified reviewers with a clear badge and hover details, ready to drop into any storefront.",
        placeholder: "Review widget hero image",
      },
      {
        type: "image",
        src: "/images/projects/trust-scores/trustlabsfaceverification.png",
        alt: "Trust Scores face verification flow",
        caption:
          "The face verification step: a short guided capture that confirms a real person in about 10 seconds.",
        placeholder: "Face verification flow image",
      },
      {
        type: "image",
        src: "/images/projects/trust-scores/trustlabshomepage.png",
        alt: "Trust Scores marketing homepage",
        caption:
          "Marketing homepage that explains how Trust Scores brings identity verification to online reviews.",
        placeholder: "Marketing homepage image",
      },
    ],
  },
  {
    slug: "barges-of-the-jaredites",
    eyebrow: "Interactive 3D",
    title: "The Barges of the Jaredites",
    oneLiner:
      "An explorable 3D world in the browser that retells Ether 2-6: walk the seashore, follow the story, and launch eight barges into the storm.",
    summary:
      "A personal build that turns a scripture account into a place you can stand in. The seashore of Moriancumer is generated in three.js with a working camp, flocks, an animated ocean, and weather. A 16-chapter story mode moves the camera through the account, steps into close-up scenes, and pairs each chapter with the verse it comes from.",
    role: "Solo Designer & Developer",
    timeline: "Sep 2026 - Nov 2026",
    impact: [
      "A 16-chapter guided story with close-up scenes, plus free orbit, first-person walking, and a cinematic tour.",
      "Procedural terrain, ocean, sky, and textures generated from one seeded random stream, with Blender-scripted models.",
      "Automatic quality tiers and a frame-time test harness keep it smooth on laptops and phones.",
    ],
    tech: ["three.js", "JavaScript", "Vite", "Blender (Python)", "Web Audio", "Playwright", "Vercel"],
    problem:
      "Stories like the barges in Ether are hard to picture from text alone: eight vessels \"tight like unto a dish,\" sixteen stones touched to give light, and a crossing through a furious wind. I wanted a way for someone to stand on that shore and watch it unfold.",
    solution:
      "I built a real-time scene in three.js. The terrain, waves, clouds, vegetation, camp life, and procedural textures all come from a single seeded random stream, so the world is consistent on every visit. The barges and people are modeled from Blender scripts, a time-of-day and storm system drives lighting, rain, lightning, and sound, and the story mode scripts camera moves, barge launches, and scene changes for each chapter.",
    outcomes: [
      "Shipped publicly on Vercel with analytics, share previews, and a no-setup, open-in-the-browser experience.",
      "Built a Playwright performance harness that measures real frame times for each quality level and a throttled phone profile.",
      "Iterated through several release versions focused on natural motion, walk-in story scenes, recorded music, and first-visit UX.",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/barges/explore-shoreline.jpg",
        alt: "3D view of the seashore with barges on cradles, a camp, and sea stacks offshore",
        caption:
          "Explore mode: the shoreline camp with barges on their cradles, flocks on the hillside, and Mount Shelem in the clouds.",
        placeholder: "Explore mode screenshot",
      },
      {
        type: "image",
        src: "/images/projects/barges/journey-map.jpg",
        alt: "Illustrated journey map from the tower to the promised land",
        caption:
          "The journey map opens the story: 16 chapters tracing the route from the tower to the great deep and the promised land.",
        placeholder: "Journey map screenshot",
      },
      {
        type: "image",
        src: "/images/projects/barges/dusk-launch.jpg",
        alt: "Barges glowing with lit stones on the beach at dusk",
        caption:
          "At dusk the stones light the barges and the water around them. Time of day and the storm can be changed at any point.",
        placeholder: "Dusk scene",
      },
    ],
    links: [{ label: "Launch the experience", href: "https://brotherofjared.vercel.app" }],
  },
  {
    slug: "sunrise-intex-ii",
    eyebrow: "Competition Project",
    title: "Sunrise (INTEX II)",
    oneLiner:
      "A case management and fundraising platform for a nonprofit that runs safehouses for girls recovering from abuse and trafficking.",
    summary:
      "For BYU's INTEX II, our team built Sunrise: a public site that tells the organization's story and takes donations, a donor portal, and a staff admin portal for managing residents, case notes, home visits, intervention plans, donors, and social media. Four machine learning services feed risk and wellbeing signals into the dashboard. I built much of the admin portal and the .NET API endpoints behind it.",
    role: "Full-Stack Developer",
    timeline: "Apr 2026",
    impact: [
      "Built the admin command center: key metrics, residents who need attention, upcoming events, safehouse capacity, recent donations, and ML wellbeing signals on one screen.",
      "Wrote .NET API endpoints and data entities across residents, donors, donations, and case records.",
      "Shipped on Azure with a React frontend, .NET API, PostgreSQL, and four Python ML services.",
    ],
    tech: ["React", "TypeScript", "Vite", "shadcn/ui", ".NET", "PostgreSQL", "Azure", "FastAPI ML Services"],
    problem:
      "The organization runs several safehouses with limited staff. Case workers needed to see which girls were struggling or ready for reintegration, leaders needed to know which donors were at risk of lapsing, and none of it could expose sensitive details about minors.",
    solution:
      "We split the system into a React frontend, a .NET API on PostgreSQL, and separate Python services for donor health, resident wellbeing, social media, and public impact. On the admin side I built the dashboard and admin pages: metric cards, a needs-attention list, an upcoming events feed, per-safehouse capacity and incident cards, a recent donations table, and a wellbeing grid that color-codes health, education, engagement, and incident risk for each resident using IDs instead of names.",
    outcomes: [
      "Gave staff one place to start the day instead of switching between spreadsheets and forms.",
      "Turned ML outputs into simple green, yellow, and red signals that non-technical staff can act on.",
      "Kept resident data de-identified across the dashboard and the public impact pages.",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/sunrise/admin-dashboard.jpg",
        alt: "Sunrise admin dashboard with metrics, flagged residents, events, safehouses, donations, and wellbeing signals",
        caption:
          "The admin dashboard I built, running locally with sample data: metrics, flagged residents, upcoming events, safehouse capacity, donations, and ML wellbeing signals.",
        placeholder: "Admin dashboard",
      },
      {
        type: "image",
        src: "/images/projects/sunrise/public-home.jpg",
        alt: "Sunrise public homepage reading Rebuilding lives. Restoring hope.",
        caption: "The public homepage, which leads visitors to donate or see the organization's impact.",
        placeholder: "Public homepage",
      },
    ],
    links: [{ label: "View source", href: "https://github.com/ryanabaldwin/Sunrise" }],
  },
  {
    slug: "redo-claims-dashboard",
    eyebrow: "Industry Work",
    title: "Redo Claims Dashboard",
    oneLiner:
      "ClaimTracker, an internal analytics and automation app for a shipping-claims pipeline worth roughly $180k a month.",
    summary:
      "At Redo, a returns and package-protection platform for Shopify brands, I built ClaimTracker: an internal web app that pulls claims data from Snowflake and gives the team one place to track claims, carrier submissions, batches, and documents, while I served as the subject matter expert for the pipeline.",
    role: "Product Specialist",
    timeline: "Oct 2025 - Apr 2026",
    impact: [
      "Supported a claims pipeline tied to roughly $180k in monthly value.",
      "Resolved 500+ technical issues with perfect CSAT.",
      "Turned user feedback into 30+ product enhancements and helped secure 20+ five-star Shopify reviews.",
    ],
    tech: ["Snowflake", "Analytics", "Process Automation", "Internal Tools", "Product Ops"],
    problem:
      "Shipping claims move through many hands: merchants, carriers, and internal reviewers. The team had no single view of where claims stood, how much had been recovered, or which carriers and claim types were costing the most, and a lot of the follow-up work was manual.",
    solution:
      "I built ClaimTracker around the data the team already had in Snowflake. It has an analytics view with totals for submitted, recovered, and pending value, carrier win rates, and breakdowns by status and type, plus pages for working individual claims, grouping them into carrier batches, and keeping supporting documents together. Filters for date, carrier, status, type, reason, and source make it easy to find bottlenecks.",
    outcomes: [
      "Gave operations a live picture of claim value, recovery, and carrier win rate instead of spreadsheet snapshots.",
      "Made it easier to spot stalled claims and missing documents before they cost money.",
      "Tightened the feedback loop between users, account management, and engineering.",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/redo/IMG_2390.jpeg",
        alt: "ClaimTracker claims analytics dashboard",
        caption:
          "ClaimTracker's analytics view: Snowflake-backed totals, carrier win rate, and claims broken down by status and type (figures obscured).",
        placeholder: "Redo dashboard screenshot",
      },
    ],
  },
  {
    slug: "ella-rises-intex",
    eyebrow: "Competition Project",
    title: "Ella Rises INTEX Project",
    oneLiner:
      "A first-place nonprofit platform with a management dashboard and an AI assistant that answers questions straight from the database.",
    summary:
      "For BYU's IS Core INTEX competition, our team built a full web platform for Ella Rises, a nonprofit that runs STEAM and leadership programs for young women. It includes a public site, a participant portal, an admin dashboard for events, surveys, donations, and milestones, and a custom AI assistant I built that turns plain-English questions into safe, read-only database queries.",
    role: "Full-Stack Developer",
    timeline: "Dec 2025",
    impact: [
      "Won 1st Place in the BYU IS Core INTEX competition.",
      "Built an AI assistant that lets nonprofit leaders ask questions of their data in plain English.",
      "Shipped a deployed, role-based app with separate admin and participant experiences.",
    ],
    tech: ["Node.js", "Express", "PostgreSQL", "Knex", "EJS", "LLM API", "Role-Based Auth"],
    problem:
      "Ella Rises tracks participants, events, surveys, donations, and milestones, but staff had no fast way to turn that data into answers. Every question meant digging through spreadsheets or waiting on someone technical.",
    solution:
      "We built a Node.js and Express app on PostgreSQL with a public site, a participant portal, and an admin dashboard. I built the AI assistant: it reads the database schema, writes a SQL query for the user's question, validates that the query is strictly read-only before running it, and explains the results in plain language. I also worked on the data model, HTTPS deployment, and the mobile navigation.",
    outcomes: [
      "Delivered a polished, competition-ready product that judges ranked first.",
      "Showed that AI can safely sit on top of real organizational data with guardrails like read-only query validation.",
      "Proved strong communication and product storytelling under a one-week deadline.",
    ],
    media: [
      {
        type: "image",
        src: "/images/projects/ella-rises/elladashboard.png",
        alt: "Ella Rises management dashboard",
        caption:
          "The management dashboard surfaces donation trends, survey scores, and key milestones at a glance.",
        placeholder: "Competition dashboard slot",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/ellaaiassistant.png",
        alt: "Ella Rises AI assistant screen",
        caption:
          "The AI assistant turns plain-English questions into validated, read-only SQL and explains the results.",
        placeholder: "AI assistant screen",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/homepageEllarises.png",
        alt: "Ella Rises public site homepage",
        caption:
          "Public homepage that introduces Ella Rises and connects visitors to programs and impact stories.",
        placeholder: "Homepage image",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/programs.jpg",
        alt: "Ella Rises programs page with Ballet Folklorico, Mariachi, STEAM, and Summit tabs",
        caption: "The programs page, with tabs for each program and its ages, schedule, and audition details.",
        placeholder: "Programs page",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/get-involved.jpg",
        alt: "Ella Rises get involved page with volunteer, donate, and partner options",
        caption: "Get Involved routes visitors to volunteering, donating, or partnering with the organization.",
        placeholder: "Get involved page",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/myteam.jpeg",
        alt: "Ella Rises INTEX team photo",
        caption: "Our team at the BYU IS Core INTEX competition.",
        placeholder: "Team photo image",
      },
      {
        type: "image",
        src: "/images/projects/ella-rises/1stplaceteam.jpeg",
        alt: "Ella Rises first place award photo",
        caption: "Celebrating the first-place finish.",
        placeholder: "First-place award image",
      },
    ],
    links: [
      { label: "View source", href: "https://github.com/elsieevans/ella-rises-nonprofit" },
    ],
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    title: "TCP Handshake",
    year: "2026",
    description:
      "A retro terminal-style website for my DJ duo, with a boot-up animation, keyboard navigation, a live countdown to the next party, and ASCII-art event flyers generated from images by a Python script I wrote.",
    tags: ["HTML / CSS / JS", "Python", "Creative Coding"],
    image: {
      src: "/images/projects/tcp-handshake/terminal-home.jpg",
      alt: "TCP Handshake terminal-style homepage with green ASCII logo",
    },
    links: [{ label: "Visit site", href: "https://tcphandshake.skylersmith.me" }],
  },
  {
    title: "Hermes School OS",
    year: "2026",
    description:
      "A personal AI agent running on a Raspberry Pi that syncs assignments from Learning Suite and Canvas into a Markdown knowledge base, flags uncertain due dates instead of guessing, and builds a daily Must / Should / Could plan that fits the time I actually have.",
    tags: ["AI Agents", "Python", "Automation"],
  },
  {
    title: "VibeVoice",
    year: "2026",
    description:
      "A native macOS push-to-talk dictation app. Hold a key, speak, and cleaned-up text appears in whatever field is focused. Built in Swift with a waveform overlay, Whisper transcription, and an LLM cleanup pass, all in about 15 MB of memory.",
    tags: ["Swift", "macOS", "Speech-to-Text", "LLM"],
  },
  {
    title: "Late-Delivery Prediction Pipeline",
    year: "2026",
    description:
      "An end-to-end ML pipeline that rebuilds a warehouse table, retrains a late-delivery model, and scores open orders on a daily GitHub Actions schedule, writing predictions back to Supabase for a web app to use.",
    tags: ["Python", "scikit-learn", "Supabase", "GitHub Actions"],
    links: [{ label: "View source", href: "https://github.com/osideskyler/shoppipeline" }],
  },
  {
    title: "Desert Ridge Contracting",
    year: "2025",
    description:
      "A website and lead manager for a remodeling contractor: a public site that captures project inquiries and a login-protected admin dashboard for reviewing and updating leads.",
    tags: ["Express", "EJS", "Supabase", "Client Work"],
  },
  {
    title: "AI Facebook Marketplace Agent",
    year: "2025",
    description:
      "Upseller, a hackathon project (Honorable Mention) that handles inbound buyer messages for Marketplace sellers: it sorts messages, spots scams, negotiates within the seller's limits, proposes meetup times, and sends calendar invites, with a review mode that drafts replies before anything is sent.",
    tags: ["AI Agents", "TypeScript", "Scheduling", "Hackathon"],
    links: [{ label: "View source", href: "https://github.com/jakenef/marketplace-seller-ai" }],
  },
  {
    title: "AI Powered Discussion Board",
    year: "2025",
    description:
      "A discussion board for a BYU analytics class where students post R code and errors and get an instant AI answer with syntax-highlighted code, plus topics, search, voting, and admin tools to pin and resolve posts.",
    tags: ["Python", "Flask", "Gemini API", "SQLite"],
    links: [{ label: "View source", href: "https://github.com/osideskyler/byu-discussion-board" }],
  },
  {
    title: "BYU QIB Club Website",
    year: "2025",
    description:
      "Launched a React and Vercel site that improved visibility for the club's events and member resources.",
    tags: ["React", "Vercel", "Web Design"],
  },
  {
    title: "Ski Resort Parking Automation",
    description:
      "Applied systems thinking to a real operational pain point with automation and flow optimization.",
    tags: ["Automation", "Operations", "Systems"],
  },
  {
    title: "OpenClaw Bot",
    description:
      "A personal build focused on experimentation, automation, and technical curiosity.",
    tags: ["Personal Project", "Automation", "Builder Mindset"],
  },
  {
    title: "HADES QR Prototype",
    description:
      "Built a 3D-printed QR-based prototype through the Northrop Grumman HIP mentorship experience.",
    tags: ["Prototype", "Hardware", "Mentorship"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: "AI Enablement & Automation Intern",
    organization: "Pattern",
    location: "Lehi, UT",
    dates: "Apr 2026 - Present",
    bullets: [
      "Spearheaded enterprise AI enablement, leading biweekly advanced sessions for 20+ reps and 50+ workshops on cost optimization.",
      "Mapped team workflows with managers and architected custom MCP servers to streamline enterprise data access.",
      "Governed the rollout of 50+ team plugins and 300+ Claude skills, consulting cross-functional teams to automate manual processes.",
    ],
  },
  {
    title: "Product Specialist",
    organization: "Redo",
    location: "Draper, UT",
    dates: "Oct 2025 - Apr 2026",
    bullets: [
      "Built a claims dashboard web app for internal analytics and process automation, acting as SME for a $180k/mo pipeline.",
      "Resolved 500+ technical issues with perfect CSAT and translated feedback into 30+ enhancements.",
      "Secured 20+ five-star Shopify reviews toward a 5.0 overall rating, partnering with account management and engineering on retention.",
    ],
  },
  {
    title: "Product Engineer - Trust Scores App",
    organization: "Brigham Young University",
    location: "Provo, UT",
    dates: "Jun 2025 - Oct 2025",
    bullets: [
      "Engineered a 10-second verification process that reduced cost per user by 98%.",
      "Built a full-stack online review verification platform with facial recognition.",
      "Designed for future enterprise use with a scalable system direction.",
    ],
  },
  {
    title: "Freelance Digital Marketing Specialist",
    organization: "RV Fun Center and BallBoyz Soap",
    location: "Remote / Lehi, UT",
    dates: "May 2025 - Jul 2025",
    bullets: [
      "Designed Meta ad campaigns that cut cost per result by 50% while improving lead quality (150+ leads).",
      "Revamped landing pages and SEO to support broader product offerings and improve AI-search visibility.",
      "Delivered a high volume of diverse ad creatives to maximize campaign efficiency through a bid cap strategy.",
    ],
  },
  {
    title: "Rental Sales Coordinator",
    organization: "RV Fun Center",
    location: "Oceanside, CA",
    dates: "Jun 2024 - Aug 2024",
    bullets: [
      "Trained an AI chatbot on FAQs using Podium and prompt engineering to support customers 24/7.",
      "Generated $15K+ in revenue by converting inbound calls into bookings and upselling add-ons.",
      "Improved lead engagement with customized follow-up sequences and daily check-ins.",
    ],
  },
  {
    title: "Volunteer Representative - Spanish Fluency",
    organization: "The Church of Jesus Christ of Latter-day Saints",
    location: "Mexico City, MX",
    dates: "Jun 2022 - Jun 2024",
    bullets: [
      "Trained and mentored 20+ volunteers through weekly sessions and 1:1 coaching.",
      "Taught life skills and principles in Spanish.",
      "Developed resilience, communication, and service-first leadership.",
    ],
  },
];

export const education = {
  school: "Brigham Young University - Marriott School of Business",
  degree: "B.S. Information Systems, Minor in Computer Science",
  graduation: "Apr 2027",
  highlights: [
    "GPA 3.73",
    "Dean's List (2024-2025)",
    "1st Place BYU IS Core INTEX Competition",
    "Vice President of Student Experience, BYU Developers Club",
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Build Stack",
    items: ["React", "TypeScript", "Python", "SQL", "C#", "AWS", "Supabase", "Go"],
  },
  {
    title: "AI and Automation",
    items: [
      "Claude Code / Cowork",
      "MCP Servers",
      "Claude Skills & Plugins",
      "n8n",
      "Cursor",
      "LLM APIs",
      "Agentic Workflows",
      "Prompt Design",
    ],
  },
  {
    title: "Product and Business",
    items: ["Scrum", "Analytics", "Tableau", "Excel", "Meta Ads", "Shopify"],
  },
];

export const snapshots: Snapshot[] = [
  { title: "Surfing", subtitle: "Pacific mornings and reset time." },
  { title: "Snowboarding", subtitle: "Fast lines, cold air, mountain days." },
  { title: "Electric Guitar", subtitle: "Creative outlet when code is closed." },
  { title: "Dirt Bikes", subtitle: "Adrenaline, mechanics, and the outdoors." },
  { title: "MTB", subtitle: "A favorite way to move and explore." },
  { title: "BYU Life", subtitle: "Builders, clubs, projects, and momentum." },
];

export const interests = [
  {
    title: "Outdoors",
    description:
      "Surfing, snowboarding, mountain biking, and dirt biking keep me energized and influence the visual texture I like in design.",
  },
  {
    title: "Creative Tech",
    description:
      "I enjoy experimenting with AI tools, side projects, and interfaces that feel both useful and memorable.",
  },
  {
    title: "People and Communication",
    description:
      "Spanish fluency, customer-facing work, and mentoring have shaped how I build products for real users instead of abstract personas.",
  },
];
