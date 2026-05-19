const brewBondImage = new URL("../../images/Brew-Bond-cafe.webp", import.meta.url).href;
const beautyImage = new URL("../../images/Beauty-products-site.webp", import.meta.url).href;
const photographerImage = new URL("../../images/photographer-site.webp", import.meta.url).href;
const southlightImage = new URL("../../images/Southlight-Studio-site.webp", import.meta.url).href;
const designSpacesImage = new URL(
  "../../images/DesignSpaces-Realestate.site.webp",
  import.meta.url,
).href;
const novaImage = new URL("../../images/nova.site.webp", import.meta.url).href;
const studentManagementDashboardImage = new URL(
  "../../images/student-management-dashboard.png",
  import.meta.url,
).href;
const studentManagementProfileImage = new URL(
  "../../images/student-management-profile.png",
  import.meta.url,
).href;

export const profile = {
  name: "Bjorn Tanamal",
  shortName: "Bjorn",
  role: "Webflow / Front-end Developer",
  headline: "Building the future, one line of code at a time",
  availability: "Available for Work",
  email: "bjorntanamalgrtr@gmail.com",
  location: "Valencia City, Bukidnon, PH",
  cvPath: "/Bjorn-Tanamal-CV.txt",
  // Add a profile image URL or imported asset here when ready.
  avatarUrl: "",
};

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/Beeejooorn" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bjorn-tanamal/" },
  { label: "Instagram", href: "https://www.instagram.com/beejoorn.dev_web/" },
];

export const skills = [
  "Webflow",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Figma",
  "Responsive UI",
  "CMS Structure",
  "Performance QA",
];

export const capabilities = [
  {
    title: "Webflow builds",
    description: "Responsive, editor-friendly pages built from clean design direction.",
  },
  {
    title: "Front-end polish",
    description: "Interactions, accessibility checks, and fast-loading interface details.",
  },
  {
    title: "CMS systems",
    description: "Collections, templates, content structure, and scalable page patterns.",
  },
];

export const aboutDetails = {
  intro:
    "I build clean, reliable websites for clients and teams who need polished front-end work without messy structure behind it.",
  paragraphs: [
    "My focus is the logic behind the design: responsive layouts, clear spacing systems, reusable sections, and front-end code that is easy to maintain after launch.",
    "I work with Webflow, HTML, CSS, JavaScript, React, Tailwind CSS, and Figma. I care about fast pages, clean handoff, and websites that feel premium without getting bloated.",
  ],
  highlights: ["Clean code", "Responsive structure", "Webflow builds", "Performance-minded QA"],
};

export const aboutPage = {
  headline: "I'm Bjorn, a Webflow and front-end developer building clean, responsive websites.",
  introduction:
    "I create portfolio, landing page, and small business websites for clients who need a polished online presence. My work focuses on clear layout, strong spacing, smooth responsive behavior, and practical handoff so the site is easy to maintain after launch.",
  quickFacts: ["Valencia City, Bukidnon", "Webflow and front-end", "Client-ready handoff"],
  journey: [
    {
      period: "2025 - Present",
      title: "Webflow & Front-end Developer",
      detail:
        "Building responsive websites and portfolio projects with a focus on structure, polish, and client-ready delivery.",
    },
    {
      period: "2024 - 2025",
      title: "Website Designer / Developer",
      detail:
        "Developed self-directed website concepts while improving UI layout, spacing, accessibility checks, and front-end code organization.",
    },
  ],
};

export const experience = [
  {
    title: "Webflow & Front-end Developer",
    place: "Project-based portfolio and client builds",
    period: "2025 - Present",
    detail: "Building responsive marketing sites, studio portfolios, landing pages, and Webflow experiences.",
  },
  {
    title: "Website Designer / Developer",
    place: "Self-directed launch projects",
    period: "2024 - 2025",
    detail: "Focused on clean UI, solid structure, responsive layouts, and maintainable front-end code.",
  },
];

export const testimonials = [
  {
    name: "Harry Jay Ortega",
    role: "Founder, Southlight Studios",
    image: "",
    quote:
      "Bjorn took my ideas and turned them into a professional digital space that perfectly represents our brand.",
  },
  {
    name: "Mika Reyes",
    role: "Small Business Owner",
    image: "",
    quote:
      "The site felt clean, fast, and easy to understand. Bjorn made the layout simple without making it look plain.",
  },
  {
    name: "Daniel Cruz",
    role: "Creative Director",
    image: "",
    quote:
      "Bjorn pays attention to spacing, responsiveness, and the small details that make a website feel finished.",
  },
  {
    name: "Alyssa Tan",
    role: "Marketing Lead",
    image: "",
    quote:
      "Working with Bjorn was smooth. He translated the design direction into a polished page that worked well on mobile.",
  },
  {
    name: "Jonas Lim",
    role: "Startup Founder",
    image: "",
    quote:
      "The handoff was clear and the structure was easy to update. That made the final website much easier to manage.",
  },
  {
    name: "Kei Santos",
    role: "Web Designer",
    image: "",
    quote:
      "Bjorn understands how to keep a design intact while making the build practical, responsive, and clean.",
  },
];

export const projects = [
  {
    id: "student-management-system",
    title: "Student Management System | Academic Portal",
    shortTitle: "Student Management System",
    status: "Local Project",
    category: "Management System",
    image: studentManagementDashboardImage,
    screenshots: [
      {
        image: studentManagementDashboardImage,
        label: "Dashboard overview",
      },
      {
        image: studentManagementProfileImage,
        label: "Admin profile and account management",
      },
    ],
    liveUrl: "",
    sourceUrl: "",
    stack: ["PHP", "MySQL", "HTML", "CSS",],
    layout: "feature",
    featured: true,
    description:
      "A localhost academic portal for managing student records, enrollment activity, admin accounts, and system summaries from one workspace.",
    features: [
      "Dashboard overview for student records, courses, year levels, and recent entries",
      "Admin profile area with account details, protected password updates, and admin management",
      "Sidebar-based workspace for registration, enrollment, student lists, and profile workflows",
      "Database-connected structure built for academic record management",
    ],
  },
  {
    id: "nova",
    title: "Nova | SaaS Workflow Platform",
    shortTitle: "Nova",
    status: "Live",
    category: "SaaS Website",
    image: novaImage,
    liveUrl: "https://beeejooorn.github.io/Nova/",
    sourceUrl: "",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
    layout: "tall",
    featured: true,
    description:
      "A high-performance command center built to streamline team workflows and data into one powerful platform.",
    features: [
      "Dashboard-inspired interface for workflow clarity",
      "Responsive page sections for desktop and mobile",
      "Clean visual hierarchy for SaaS product storytelling",
      "Polished front-end interactions using vanilla JavaScript",
    ],
  },
  {
    id: "southlight",
    title: "Southlight | Photography & Videography Portfolio",
    shortTitle: "Southlight",
    status: "Live",
    category: "Webflow Portfolio",
    image: southlightImage,
    liveUrl: "https://southlight-portfolio.webflow.io/",
    sourceUrl: "",
    stack: ["Webflow", "Figma"],
    layout: "tall",
    featured: false,
    description:
      "A media-focused website built for Harry's studio with a structured layout for browsing photo and video projects.",
    features: [
      "Webflow implementation for a creative studio",
      "Portfolio-first information architecture",
      "Clear project browsing for potential clients",
      "Client-ready handoff structure",
    ],
  },
  {
    id: "brew-bond",
    title: "Brew & Bond | Fully Developed Website",
    shortTitle: "Brew & Bond",
    status: "Live",
    category: "Cafe Website",
    image: brewBondImage,
    liveUrl: "https://beeejooorn.github.io/Brew-Bond-Cafe/",
    sourceUrl: "",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
    layout: "compact",
    description:
      "A modern, responsive landing page for a local coffee shop with a clean UI and simple navigation.",
    features: [
      "Responsive landing page build",
      "Menu and brand sections designed for quick scanning",
      "Warm cafe-focused visual direction",
      "Client-friendly structure for future updates",
    ],
  },
  {
    id: "designspaces",
    title: "DesignSpaces | Real Estate Website",
    shortTitle: "DesignSpaces",
    status: "Live",
    category: "Real Estate Website",
    image: designSpacesImage,
    liveUrl: "https://beeejooorn.github.io/design-spaces/",
    sourceUrl: "",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
    layout: "compact",
    description:
      "A real estate platform concept built to make property browsing feel faster, calmer, and easier to understand.",
    features: [
      "Property-focused layout and browsing flow",
      "Responsive cards and section rhythm",
      "Clean conversion path for inquiries",
      "Performance-minded front-end structure",
    ],
  },
  {
    id: "photographer",
    title: "Photographer Portfolio | Fully Developed Website",
    shortTitle: "Photographer Portfolio",
    status: "Live",
    category: "Portfolio Website",
    image: photographerImage,
    liveUrl: "https://beeejooorn.github.io/Photographer-portfolio-001/",
    sourceUrl: "",
    stack: ["HTML", "CSS", "JavaScript", "Figma"],
    layout: "compact",
    description:
      "A high-performance portfolio built to showcase professional photography while keeping gallery browsing fast.",
    features: [
      "Image-heavy portfolio presentation",
      "Responsive gallery handling",
      "Fast browsing for visual work",
      "Minimal structure that lets the photography lead",
    ],
  },
  {
    id: "skin-health",
    title: "Skin Health | Beauty Landing Page",
    shortTitle: "Skin Health",
    status: "Web Design",
    category: "Beauty Landing Page",
    image: beautyImage,
    liveUrl: "",
    sourceUrl: "",
    stack: ["Webflow", "Figma"],
    layout: "compact",
    description:
      "A clean landing page concept designed to build product trust and make the benefits easy to understand.",
    features: [
      "Product-focused landing page structure",
      "Trust-building content hierarchy",
      "Simple navigation and benefit-led sections",
      "Designed for a future Webflow build",
    ],
  },
];
