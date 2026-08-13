// EN dictionary — must mirror the exact shape of `es.ts` (enforced by the
// `Dictionary` type import below). Industry terms and section names that the
// creative industry already uses in English in the Spanish copy itself
// (Brand Systems, Design Principles, Timeline, Gallery, Impact…) are kept
// in English on both sides on purpose — translating them would read as
// less natural to the target audience, not more.

import type { Dictionary } from "./es";

export const en: Dictionary = {
  common: {
    breadcrumbHome: "Home",
    ctaBuildTogether: "Let's build something together",
    close: "Close",
    scroll: "Scroll",
  },

  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/studio", label: "About us" },
      { href: "/work", label: "Our work" },
      { href: "/contact", label: "Get in touch" },
    ],
  },

  footer: {
    message: "Let's build something that could only exist with you.",
    groups: {
      studio: "Studio",
      work: "Work",
    },
    legal: "We don't sell design, we build identity.",
  },

  home: {
    hero: {
      eyebrow: "Hey, we're Tangerine",
      title: "We make good ideas come to life.",
      subtitle:
        "We're a creative studio that turns ideas into brands, products, and experiences that connect with people.",
      body: "We like working up close, exploring possibilities, and caring about every detail, to make things we actually want to share with the world.",
      primaryCta: "See what we do",
      secondaryCta: "Tell us your idea",
    },
    ticker: {
      items: ["Think", "Create", "Test", "Explore", "Imagine", "Connect", "Experiment", "Discover"],
    },
    whatWeCreate: {
      eyebrow: "What we do",
      title: "What can we create together?",
      body: "Right now, we work across these kinds of projects, without boxing ourselves into them forever.",
      categories: [
        {
          slug: "brands",
          title: "Brands",
          description: "Identity, strategy, and communication.",
        },
        {
          slug: "digital-products",
          title: "Digital products",
          description: "UX/UI, websites, and digital experiences.",
        },
        {
          slug: "content",
          title: "Content",
          description: "Ideas, campaigns, and content that connect.",
        },
        {
          slug: "strategy",
          title: "Strategy",
          description: "We find opportunities and give them shape.",
        },
        {
          slug: "experiences",
          title: "Experiences",
          description: "We create moments people remember.",
        },
      ],
      unknown: {
        title: "Things we don't have a name for yet.",
        description: "Because some of the best ideas start exactly like that.",
      },
    },
    whyExists: {
      eyebrow: "Why we do this",
      title: "We believe everyone has something creative inside. It rarely gets the space it needs.",
      body: "For us, that starts with curiosity: trying things, talking them through, getting them wrong, and trying again. Technology can help us create faster, but the sensitivity and judgment behind it are still deeply human. That's how we work on every project, and how we want to keep building whatever comes next.",
    },
    philosophy: {
      eyebrow: "Philosophy",
      title: "Constraints don't limit, they reveal.",
      body: "A real limit, looked at head-on instead of avoided, almost always hides the best possible answer. Six beliefs hold up that idea.",
      ariaLabel: "Tangerine Studio's beliefs",
      cardLabel: "Belief",
      beliefs: [
        { id: "creativity-learned", text: "Creativity is learned." },
        { id: "identity-over-trend", text: "Identity is worth more than trend." },
        { id: "curiosity-innovation", text: "Curiosity comes before innovation." },
        { id: "process-matters", text: "Process matters as much as outcome." },
        { id: "fear-of-mistakes", text: "The fear of being wrong costs more than the mistake itself." },
        { id: "true-over-perfect", text: "Nobody remembers what's perfect; they remember what's true." },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "One way of thinking, applied step by step to every project.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Before you write to us, this might save you a step.",
      items: [
        {
          id: "project-types",
          question: "What kind of projects do you take on?",
          answer:
            "From complete brand systems to digital products and experiences: Brand Systems, Digital Experiences, Product Design, Creative Direction, Content Systems, Growth and Automation are the seven ways we apply the same way of thinking to a different problem.",
        },
        {
          id: "company-size",
          question: "Do you work with startups or with large companies?",
          answer:
            "Both. We're not looking for a specific company size, but for a real identity behind it to work with: size changes the scope of the project, not the criteria we bring to it.",
        },
        {
          id: "tools",
          question: "What tools do you use?",
          answer:
            "Whichever fit each project best: we prioritize the outcome over attachment to any one tool. What stays constant is the criteria: research before proposing, document every decision, and leave you with a system your team can sustain without depending on us.",
        },
        {
          id: "duration",
          question: "How long does a project take?",
          answer:
            "It depends directly on scope: a complete brand system doesn't take as long as a one-off piece. Before we start, we define a real timeline for that specific project, not a generic estimate.",
        },
        {
          id: "pricing",
          question: "How does pricing and quoting work?",
          answer:
            "Every quote is built after understanding your project, not before. That's why we don't have a fixed published rate. Write to us through the contact form with context on what you need, and from there we coordinate the conversation that defines scope and proposal.",
        },
      ],
    },
    closing: {
      title: "The possibility of building something no one else could have built in that exact way.",
      ctaWork: "See the work",
      ctaContact: "Contact",
    },
  },

  studio: {
    intro: {
      kicker: "About us",
      title: "Two people who noticed something no one else seemed bothered by.",
      imageAlt: "Natalia García and Emy Dorado, founders of Tangerine Studio",
    },
    origin: {
      kicker: "Origin",
      imageAlt: "Natalia García and Emy Dorado, founders of Tangerine Studio",
      intro:
        "Natalia García and Emy Dorado met in college, studying Interactive Media Design. Between projects, deadlines, and countless conversations about design, they started noticing something they both shared: they cared about much more than things simply looking good. They wanted to understand why things existed, who they were made for, and what they could spark in people.",
      emphasis: "That's where Tangerine came from.",
      paragraphs: [
        "We started with a fairly simple intuition: we believe creativity is a capacity that can be developed, and that in a world where it's increasingly easy to produce things with artificial intelligence, tools, and templates, the human side of things matters even more. Curiosity, sensitivity, ideas, conversations, and the time we put into building something still carry enormous value.",
        "That's why we want to build Tangerine around creativity and around people. Today we work alongside brands and organizations to turn ideas into experiences, identities, and solutions that make sense for the people who live with them. We're also building a community around creativity, sharing what we learn, our processes, our questions, and the everyday work behind what we do.",
        "We don't know exactly how far Tangerine will go, and we like it that way. We want to keep exploring new ways to create, learn, and share, from projects for other people to products, content, education, and any idea that lets us bring creativity closer to more people.",
        "Because for us, creativity isn't just a tool for making better things. It's a way of looking at the world, asking questions, and finding new possibilities.",
      ],
    },
    manifesto: {
      kicker: "Manifesto",
      lead: "Creating is still one of the most human things we do.",
      body: [
        "We're surrounded by tools that can do more, faster, and better every day. But creating has never been just about producing something that works. It's also about observing, asking questions, trying things, getting them wrong, connecting ideas, and finding something that didn't exist before.",
        "At Tangerine we believe creativity isn't a talent some people are simply born with. It's a capacity all of us can develop when we have the space to explore, the curiosity to question, and the time to do things with intention.",
        "That's why we like working close to people. Listening to their ideas, understanding what they want to build, and discovering possibilities together that they might not have imagined yet.",
      ],
      emphasis: [
        "Because doing something well matters.",
        "But doing something that makes sense, that connects, and that could only have come from that process, matters a lot more.",
      ],
      closing:
        "Tangerine exists to keep creating with curiosity, with humanity, and with the drive to make things worth sharing.",
    },
    values: {
      kicker: "Values",
      title: "What guides every decision, big or small.",
      ariaLabel: "Tangerine Studio's values",
      items: [
        { id: "honesty", name: "Honesty", meaning: "Saying what you think, even when it's hard, the moment it needs saying." },
        { id: "curiosity", name: "Curiosity", meaning: "The genuine drive to understand something before having an opinion about it." },
        { id: "empathy", name: "Empathy", meaning: "Designing for a real person, not an abstract audience or your own taste." },
        { id: "care", name: "Care", meaning: "The attention put into every decision, no matter how many get made at once." },
        { id: "courage", name: "Courage", meaning: "Holding on to an idea of your own even when the safe option would be easier to defend." },
        { id: "community", name: "Community", meaning: "Understanding that no result that matters gets built completely alone." },
      ],
    },
  },

  process: {
    steps: [
      {
        slug: "discover",
        title: "We discover before we design",
        description: "We understand the real problem before proposing a single screen: who lives it, why it exists, what's already been tried.",
      },
      {
        slug: "design",
        title: "We design with intention",
        description: "Every visual decision answers to a concrete reason. If we can't explain it, we don't use it.",
      },
      {
        slug: "build",
        title: "We build in collaboration",
        description: "The work moves forward alongside whoever's going to live with it later, not in isolation until the end.",
      },
      {
        slug: "test",
        title: "We test with users",
        description: "Before calling anything finished, we put it in front of real people and adjust based on what we see.",
      },
      {
        slug: "iterate",
        title: "We iterate continuously",
        description: "No first version is the final one. We improve with what we learn along the way.",
      },
      {
        slug: "deliver",
        title: "We deliver systems, not screens",
        description: "What we leave behind keeps working without us: rules and criteria, not a closed file.",
      },
    ],
  },

  contact: {
    hero: {
      kicker: "Get in touch",
      breadcrumbCurrent: "Contact",
      title: "Let's build something with judgment.",
      body: "Before proposing a solution, we want to understand your project. Tell us what you're building and we'll get back to you with next steps, not a generic form response.",
      cta: "Fill out the form",
    },
    sidebar: {
      responseTimeTitle: "Response time",
      responseTimeBody: "We respond to every message within 24 business hours.",
      responseTimeBadge: "< 24 business hours",
      processTitle: "Our process",
      whyTitle: "Why Tangerine",
      steps: [
        { title: "Initial conversation", description: "We listen to the project before proposing anything." },
        { title: "Tailored proposal", description: "Scope, timeline and budget, clear and in writing." },
        { title: "Kickoff", description: "We start with the full team, not a single designer." },
        { title: "Delivery and follow-up", description: "Visible progress, no surprises at the end." },
      ],
      benefits: [
        { title: "One team, start to finish", icon: "users" },
        { title: "Clear process, no surprises", icon: "shield" },
        { title: "Design with judgment, not just aesthetics", icon: "lightbulb" },
      ],
    },
    form: {
      sectionBasic: "Basic information",
      nameLabel: "Name",
      namePlaceholder: "Your full name",
      nameError: "Tell us your name.",
      companyLabel: "Company",
      companyPlaceholder: "Name of your company or project",
      companyError: "This field is required.",
      emailLabel: "Email",
      emailPlaceholder: "Name@email.com",
      emailErrorRequired: "We need an email to reply to you.",
      emailErrorInvalid: "That email doesn't look valid.",
      phoneLabel: "Phone",
      phonePlaceholder: "+1 555 0123 4567",
      phoneDescription: "Optional, useful if you'd rather we message you on WhatsApp.",
      websiteLabel: "Website",
      websitePlaceholder: "https://yourcompany.com",
      websiteDescription: "Optional.",
      linkedinLabel: "LinkedIn",
      linkedinPlaceholder: "https://linkedin.com/in/you",
      linkedinDescription: "Optional, helps us get to know you before the first call.",
      sectionProject: "Your project",
      projectTypeLabel: "What type of project is it?",
      projectTypeError: "Pick the option closest to it.",
      sectionBudget: "Budget and timeline",
      budgetLabel: "Estimated budget",
      budgetTooltipAriaLabel: "Why we ask this",
      budgetTooltip: "It helps us propose the right scope from the start.",
      budgetError: "Pick the closest range, it can be adjusted later.",
      timelineLabel: "Estimated timeline",
      sectionMore: "Tell us more",
      messageLabel: "Tell us about your project",
      messagePlaceholder: "What problem are you trying to solve? What exists today, if anything does?",
      messageError: "Tell us even a little, that's enough to get started.",
      referralLabel: "How did you hear about us?",
      referralPlaceholder: "Choose an option",
      acceptLabel: "I agree to be contacted by Tangerine Studio to discuss this project.",
      acceptError: "We need your consent before we can write to you.",
      submitCta: "Let's take the first step",
      submitError: "We couldn't send your message. Try again in a moment.",
      disclaimerNoCommitment: "No commitment: the first conversation is always free.",
      successThanksNamed: (name: string) => `Thanks, ${name}.`,
      successThanksGeneric: "Thanks for writing to us.",
      successBody: "We've received your message. We'll read it carefully and get back to you within 24 business hours with next steps.",
      successCta: "Send another message",
      projectTypeOptions: [
        { value: "branding", label: "Branding & identity", icon: "palette" },
        { value: "landing", label: "Landing page", icon: "layout" },
        { value: "product", label: "Digital product", icon: "smartphone" },
        { value: "design-system", label: "Design system", icon: "component" },
        { value: "ecommerce", label: "E-commerce", icon: "cart" },
        { value: "ux-ui", label: "UX / UI", icon: "pen" },
        { value: "other", label: "Other", icon: "sparkles" },
      ],
      budgetOptions: [
        { value: "1-3m", label: "< $500 – $1,000 USD", description: "Narrow project, defined scope." },
        { value: "3-8m", label: "$1,000 – $2,000 USD", description: "The most common range for a full project." },
        { value: "8-15m", label: "$2,000 – $5,000 USD", description: "Broad scope, several deliverables." },
        { value: "15m-plus", label: "> $5,000 USD", description: "Full-scale or long-term project." },
        { value: "not-sure", label: "Not sure yet", description: "We can define it together on the first call." },
      ],
      timelineOptions: [
        { value: "asap", label: "As soon as possible" },
        { value: "1-month", label: "Within the next month" },
        { value: "2-3-months", label: "In 2–3 months" },
        { value: "flexible", label: "I'm flexible on timing" },
      ],
      referralOptions: [
        { value: "instagram", label: "Instagram" },
        { value: "linkedin", label: "LinkedIn" },
        { value: "referral", label: "Someone's recommendation" },
        { value: "search", label: "Google / search" },
        { value: "portfolio", label: "Another studio or portfolio" },
        { value: "event", label: "An event or talk" },
        { value: "other", label: "Other" },
      ],
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How long does a project take?",
          answer:
            "It depends on scope: a landing page can take 2–3 weeks; a complete design system, several months. In the initial proposal we define a real timeline, not a generic estimate.",
        },
        {
          question: "How do you work?",
          answer:
            "In short cycles with visible deliveries: we never disappear for several weeks and come back with an unexpected result. Every stage has a review point before moving to the next.",
        },
        {
          question: "How does payment work?",
          answer:
            "A deposit to get started and the rest split into milestones tied to concrete deliverables: never 100% upfront, never 100% at the end.",
        },
        {
          question: "Do you work internationally?",
          answer:
            "Yes, we work remotely with clients across different time zones, coordinating sync hours that work for both teams.",
        },
      ],
    },
  },

  portfolio: {
    breadcrumbHome: "Home",
    gallery: {
      searchPlaceholder: "Search projects…",
      allLabel: "All",
      emptyTitle: "No project matches.",
      emptyDescription: "Try a different term, or clear the active category filter.",
      clearFiltersLabel: "Clear filters",
      viewCaseStudyLabel: "View Case Study",
    },
    featured: {
      exploreProjectLabel: "Explore Project",
    },
    timeline: {
      kicker: "Timeline",
      title: "Projects by year",
    },
  },

  caseStudy: {
    breadcrumbHome: "Home",
    breadcrumbWork: "Work",
    servicesLabel: "Services",
    durationLabel: "Duration",
    visitProjectCta: "Visit the project",
    objectives: { eyebrow: "Objectives", title: "What this project had to achieve" },
    process: { eyebrow: "How we work", title: "Process" },
    research: { eyebrow: "Research", title: "What we found" },
    principles: { eyebrow: "Design Principles", title: "The principles that guided every decision" },
    visualIdentity: { eyebrow: "Visual Identity", title: "The visual system" },
    gallery: { eyebrow: "Gallery", title: "The work, at real resolution" },
    mockups: {
      eyebrow: "Applications",
      title: "The system, in real context",
      labels: { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile", branding: "Card", merch: "Merch", packaging: "Packaging" },
    },
    components: { eyebrow: "Components", title: "The same pieces, in production" },
    beforeAfter: { eyebrow: "Before / After", title: "What changed" },
    impact: { eyebrow: "Impact", title: "The result, in numbers" },
    learnings: { eyebrow: "Learnings", title: "What we learned" },
    liveSiteEyebrow: "Live production site",
    liveSiteCta: "Explore the live site",
    nextProjectCta: "See more",
  },

  notFound: {
    title: "This page got lost. We've already found the way.",
    body: "The link might be broken, or maybe you were looking for something that doesn't exist yet. In the meantime, there's plenty to explore around here.",
    mascotAriaLabel: "Tangerine Studio's mascot, click for a little hello",
    mascotAlt: "Tangerine Studio's mascot",
    ctas: {
      home: "Back to home",
      work: "See the work",
      studio: "Meet the studio",
    },
  },
};
