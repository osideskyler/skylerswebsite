export type ProjectMedia = {
  type: "image" | "video";
  src?: string;
  poster?: string;
  alt: string;
  caption: string;
  placeholder: string;
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
};

export type SecondaryProject = {
  title: string;
  description: string;
  tags: string[];
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

const githubPagesBasePath =
  process.env.GITHUB_PAGES === "true" ? "/skylerswebsite" : "";

function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    return `${githubPagesBasePath}/${path}`;
  }

  return `${githubPagesBasePath}${path}`;
}

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
  photo: withBasePath("/images/about/skylerbeach.JPG"),
};

export const heroHighlights = [
  {
    label: "Cost Reduction",
    value: "98%",
    detail: "Cut verification cost per user in the Trust Scores platform.",
  },
  {
    label: "Owned Pipeline",
    value: "$180k/mo",
    detail: "Acted as SME for a claims dashboard workflow at Redo.",
  },
  {
    label: "Customer Support",
    value: "500+",
    detail: "Resolved technical issues with perfect CSAT.",
  },
  {
    label: "Competition Win",
    value: "1st Place",
    detail: "Won BYU's IS Core INTEX competition.",
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
      "Built as a product engineering project at BYU, Trust Scores combined facial recognition, verification flows, and scalable architecture to validate online reviews without creating heavy user friction.",
    role: "Product Engineer",
    timeline: "Jun 2025 - Oct 2025",
    impact: [
      "Reduced verification cost per user by 98%.",
      "Created a verification experience that took roughly 10 seconds.",
      "Translated research goals into a production-minded system with room to scale.",
    ],
    tech: ["React", "Go", "AWS", "Supabase", "OAuth", "Facial Recognition"],
    problem:
      "Review platforms need trust, but most verification systems either create too much friction or cost too much to run at scale.",
    solution:
      "I helped engineer a lightweight full-stack verification flow that balanced identity confidence, speed, and enterprise viability.",
    outcomes: [
      "Built a modern web experience around identity verification.",
      "Designed for future enterprise use with a scalable SDK-oriented direction.",
      "Focused on reducing friction so verification felt fast rather than burdensome.",
    ],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/trust-scores/reviewwidget.png"),
        alt: "Trust Scores review widget with verified badge",
        caption:
          "The Trust Scores review widget highlights verified reviewers with a clear badge and hover details.",
        placeholder: "Review widget hero image",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/trust-scores/trustlabshomepage.png"),
        alt: "Trust Scores marketing homepage",
        caption:
          "Marketing homepage that explains how Trust Scores brings trust and verification to online reviews.",
        placeholder: "Marketing homepage image",
      },
      {
        type: "image",
        src: withBasePath(
          "/images/projects/trust-scores/trustlabsfaceverification.png",
        ),
        alt: "Trust Scores face verification flow",
        caption:
          "The face verification flow that keeps identity checks fast while staying production-ready.",
        placeholder: "Face verification flow image",
      },
      {
        type: "video",
        alt: "Trust Scores demo video",
        caption: "Drop in your best product walkthrough or verification flow demo.",
        placeholder: "Product demo video slot",
      },
    ],
  },
  {
    slug: "redo-claims-dashboard",
    eyebrow: "Current Work",
    title: "Redo Claims Dashboard",
    oneLiner:
      "An internal analytics and automation dashboard supporting a high-value claims pipeline.",
    summary:
      "At Redo, I developed a dashboard that supported internal analytics, operational visibility, and process automation while serving as the subject matter expert for a meaningful revenue pipeline.",
    role: "Product Specialist",
    timeline: "Oct 2025 - Present",
    impact: [
      "Supported a process tied to roughly $180k in monthly pipeline value.",
      "Resolved 500+ technical issues with perfect CSAT.",
      "Turned user feedback into 30+ product enhancements.",
    ],
    tech: ["Analytics", "Process Automation", "Internal Tools", "Product Ops"],
    problem:
      "Internal teams needed clearer visibility into claims operations and better ways to turn recurring tasks into reliable workflows.",
    solution:
      "I built a dashboard-centered workflow that made analytics more accessible, surfaced operational bottlenecks, and improved the path from issue discovery to product improvements.",
    outcomes: [
      "Created an internal tool with real business relevance, not just a classroom prototype.",
      "Improved feedback loops between users, account management, and engineering.",
      "Helped strengthen retention with more responsive product support and improvements.",
    ],
    media: [
      {
        type: "image",
        alt: "Redo claims dashboard screenshot",
        caption: "Use a screenshot with charting, filters, or workflow views.",
        placeholder: "Dashboard screenshot slot",
      },
      {
        type: "video",
        alt: "Redo workflow demo",
        caption: "A short narrated clip would be perfect here.",
        placeholder: "Internal tool walkthrough slot",
      },
    ],
  },
  {
    slug: "ella-rises-intex",
    eyebrow: "Competition Project",
    title: "Ella Rises INTEX Project",
    oneLiner:
      "A first-place data and AI experience built to help a nonprofit surface meaningful insights.",
    summary:
      "For BYU's IS Core INTEX competition, I helped build a management dashboard and custom AI agent that turned organizational data into clearer, more actionable insights.",
    role: "Student Team Builder",
    timeline: "2025",
    impact: [
      "Won 1st Place in the BYU IS Core INTEX competition.",
      "Combined dashboard thinking with AI-assisted insight delivery.",
      "Focused on actionable information rather than just displaying raw data.",
    ],
    tech: ["Dashboards", "AI Agent", "Data Visualization", "Information Systems"],
    problem:
      "Organizations often have plenty of data but no fast way to turn it into decisions that leaders can actually use.",
    solution:
      "We designed a dashboard and AI-supported insight workflow that surfaced signals, patterns, and storylines decision makers could act on quickly.",
    outcomes: [
      "Delivered a polished competition-ready product experience.",
      "Showcased the ability to combine business context with technical implementation.",
      "Proved strong communication and product storytelling under deadline pressure.",
    ],
    media: [
      {
        type: "image",
        src: withBasePath("/images/projects/ella-rises/elladashboard.png"),
        alt: "Ella Rises management dashboard",
        caption:
          "The Ella Rises management dashboard surfaces donation trends, survey scores, and key milestones at a glance.",
        placeholder: "Competition dashboard slot",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ella-rises/homepageEllarises.png"),
        alt: "Ella Rises public site homepage",
        caption:
          "Public-facing homepage experience that introduces Ella Rises and connects visitors to impact stories.",
        placeholder: "Homepage image",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ella-rises/ellaaiassistant.png"),
        alt: "Ella Rises AI assistant screen",
        caption:
          "Custom AI assistant view that turns data into conversational insights for nonprofit leaders.",
        placeholder: "AI assistant screen",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ella-rises/myteam.jpeg"),
        alt: "Ella Rises INTEX team photo",
        caption:
          "Team photo from the BYU IS Core INTEX competition where the Ella Rises project took first place.",
        placeholder: "Team photo image",
      },
      {
        type: "image",
        src: withBasePath("/images/projects/ella-rises/1stplaceteam.jpeg"),
        alt: "Ella Rises first place award photo",
        caption: "Celebrating the first-place finish for the Ella Rises INTEX project.",
        placeholder: "First-place award image",
      },
      {
        type: "video",
        alt: "Ella Rises presentation clip",
        caption: "A short clip from the presentation or demo would work well.",
        placeholder: "Presentation video slot",
      },
    ],
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    title: "AI Powered Discussion Board",
    description:
      "Explored AI-assisted collaboration and conversation design through a discussion-centered product concept.",
    tags: ["AI", "Product Thinking", "UX"],
  },
  {
    title: "Ski Resort Parking Automation",
    description:
      "Applied systems thinking to a real operational pain point with automation and flow optimization.",
    tags: ["Automation", "Operations", "Systems"],
  },
  {
    title: "AI Facebook Marketplace Agent",
    description:
      "Built a workflow that automated buyer communication and calendar scheduling, earning hackathon recognition.",
    tags: ["LLM Workflows", "Scheduling", "Hackathon"],
  },
  {
    title: "BYU QIB Club Website",
    description:
      "Launched a React and Vercel site that improved visibility for events and member resources.",
    tags: ["React", "Vercel", "Web Design"],
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
    title: "Product Specialist",
    organization: "Redo",
    location: "Draper, UT",
    dates: "Oct 2025 - Present",
    bullets: [
      "Developed a claims dashboard web app for analytics and process automation.",
      "Acted as SME for a workflow supporting roughly $180k per month in pipeline value.",
      "Resolved 500+ technical issues with perfect CSAT and translated feedback into 30+ enhancements.",
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
      "Cut cost per result by 50% while improving lead quality.",
      "Revamped landing pages and SEO to improve discoverability.",
      "Delivered high-volume creative testing to increase campaign efficiency.",
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
    items: ["React", "TypeScript", "Python", "SQL", "AWS", "Supabase", "Go"],
  },
  {
    title: "AI and Automation",
    items: [
      "Cursor",
      "Claude Code / Cowork",
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
