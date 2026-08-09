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
  },

  nav: {
    links: [
      { href: "/", label: "Home" },
      { href: "/studio", label: "Studio" },
      { href: "/capabilities", label: "Capabilities" },
      { href: "/work", label: "Work" },
      { href: "/contact", label: "Contact" },
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
      eyebrow: "Tangerine Studio",
      title: "We build brands that couldn't belong to anyone else.",
      subtitle: "Every brand tells a story. Our job is to make someone want to listen to it.",
      primaryCta: "See our work",
      secondaryCta: "Let's build something together",
    },
    whyExists: {
      eyebrow: "Why we exist",
      title:
        "Because the world has, more and more, brands and people that function perfectly and say less and less. That's the whole answer.",
      body: "Tangerine doesn't exist to do branding, or design, or content. Those are, today, the crafts through which something older gets practiced: the conviction that any person or any brand, given the right space and criteria, can recover an identity that belongs to them in a way no other identity could claim.",
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
            "From complete brand systems to digital products and experiences — Brand Systems, Digital Experiences, Product Design, Creative Direction, Content Systems, Growth and Automation are the seven ways we apply the same way of thinking to a different problem.",
        },
        {
          id: "company-size",
          question: "Do you work with startups or with large companies?",
          answer:
            "Both. We're not looking for a specific company size, but for a real identity behind it to work with — size changes the scope of the project, not the criteria we bring to it.",
        },
        {
          id: "tools",
          question: "What tools do you use?",
          answer:
            "Whichever fit each project best — we prioritize the outcome over attachment to any one tool. What stays constant is the criteria: research before proposing, document every decision, and leave you with a system your team can sustain without depending on us.",
        },
        {
          id: "duration",
          question: "How long does a project take?",
          answer:
            "It depends directly on scope — a complete brand system doesn't take as long as a one-off piece. Before we start, we define a real timeline for that specific project, not a generic estimate.",
        },
        {
          id: "pricing",
          question: "How does pricing and quoting work?",
          answer:
            "Every quote is built after understanding your project, not before — that's why we don't have a fixed published rate. Write to us through the contact form with context on what you need, and from there we coordinate the conversation that defines scope and proposal.",
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
      kicker: "Studio",
      title: "Two people who noticed something no one else seemed bothered by.",
      imageAlt: "Natalia García and Emy Dorado, founders of Tangerine Studio",
    },
    origin: {
      kicker: "Origin",
      body1:
        "Natalia García and Emy Dorado noticed this: that the world had filled up with things that were well made and empty. Perfect interfaces with no errors, and no fingerprint. Correct identities, delivered on time, forgotten within a week. An entire craft — their own — starting to be measured by how fast it could produce instead of how true it could be.",
      body2:
        "They didn't found a studio to fix that. They founded a studio because they couldn't find a single place where that discomfort had room to become work. They started with what anyone starts with when they have nothing but an intuition: few resources, no name anyone knew, and the uncomfortable certainty that doing things the way they'd seen them done wasn't an option.",
    },
    manifesto: {
      kicker: "Manifesto",
      lead: "There was a time, for every person who exists, when creating didn't ask permission.",
      body1:
        "Tangerine doesn't believe creativity is a talent reserved for a few. It believes it's a memory shared by everyone, and that the work of a place like this is, above all, helping people remember it.",
      emphasis: "Let's build something that could only exist with you.",
      body2: "This is the exact point where reflection ends and the work begins.",
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

  capabilities: {
    hero: {
      kicker: "Capabilities",
      title: "We don't offer a list of separate services.",
      body: "The kind anyone could hire out one by one without noticing the difference. We offer capabilities: distinct ways of applying the same way of thinking to a different problem.",
      cta: "Let's build something together",
    },
    carousel: {
      kicker: "Seven capabilities",
      title: "The same way of thinking, applied to a different problem every time.",
      ariaLabel: "Tangerine Studio's capabilities",
      cardLabel: "Capability",
      existsBecauseLabel: "Exists because",
      generatesValueLabel: "Generates value",
    },
    list: [
      {
        slug: "brand-systems",
        name: "Brand Systems",
        resolves:
          "Fragmentation: brands that say something different everywhere they show up because they never had a complete identity, only loose pieces made at different moments.",
        existsBecause:
          "An identity can't live in a logo alone: it needs a complete system —verbal, visual, behavioral— that holds up over time without depending on who's applying it that day.",
        generatesValue:
          "By making every new piece of communication start from a clear foundation, instead of being invented from scratch every time.",
      },
      {
        slug: "digital-experiences",
        name: "Digital Experiences",
        resolves: "Any brand's most fragile moment: the first few seconds when someone decides, without fully realizing it, whether to trust or leave.",
        existsBecause: "A well-designed site isn't a storefront, it's a quiet conversation between a brand and whoever's visiting.",
        generatesValue: "By turning the first digital impression into the best possible version of that conversation.",
      },
      {
        slug: "product-design",
        name: "Product Design",
        resolves: "The distance between what a product promises and what it actually delivers to whoever uses it.",
        existsBecause:
          "Functionality and identity should never compete with each other: a product can be, at the same time, easy to use and deeply its own.",
        generatesValue:
          "In the quiet retention a well-thought-out experience produces, the kind no one notices because it never causes friction.",
      },
      {
        slug: "creative-direction",
        name: "Creative Direction",
        resolves: "The problem of brands that work with many different vendors and end up, without realizing it, speaking with several voices at once.",
        existsBecause:
          "Consistency doesn't happen on its own: someone has to actively sustain it, decision after decision, long after the initial project ends.",
        generatesValue: "By protecting, over time, the identity that took so much work to build.",
      },
      {
        slug: "content-systems",
        name: "Content Systems",
        resolves: "The inconsistency of voice that shows up when content gets produced fast and without criteria behind it to sustain it.",
        existsBecause: "A brand isn't built once: it's repeated, with discipline, in every piece of content it produces.",
        generatesValue:
          "In the accumulation: every post consistent with the ones before it builds more identity than one isolated post, no matter how viral.",
      },
      {
        slug: "growth",
        name: "Growth",
        resolves: "The stagnation that shows up when a brand already has a solid identity but doesn't know how to translate it into measurable results.",
        existsBecause: "Good design, with no channel to reach the right people, ends up talking to itself.",
        generatesValue: "By connecting creative work with real data, without sacrificing identity for conversion.",
      },
      {
        slug: "automation",
        name: "Automation",
        resolves: "The time lost to repetitive tasks that eat into the hours that actually require human judgment.",
        existsBecause: "Every hour freed from a mechanical task is an hour that can go toward thinking better.",
        generatesValue: "By freeing, not replacing, the judgment of the people doing the work that matters.",
      },
    ],
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
      kicker: "Contact",
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
      disclaimerNoCommitment: "No commitment — the first conversation is always free.",
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
            "It depends on scope — a landing page can take 2–3 weeks; a complete design system, several months. In the initial proposal we define a real timeline, not a generic estimate.",
        },
        {
          question: "How do you work?",
          answer:
            "In short cycles with visible deliveries: we never disappear for several weeks and come back with an unexpected result. Every stage has a review point before moving to the next.",
        },
        {
          question: "How does payment work?",
          answer:
            "A deposit to get started and the rest split into milestones tied to concrete deliverables — never 100% upfront, never 100% at the end.",
        },
        {
          question: "Do you work internationally?",
          answer:
            "Yes — we work remotely with clients across different time zones, coordinating sync hours that work for both teams.",
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
    mascotAriaLabel: "Tangerine Studio's mascot — click for a little hello",
    mascotAlt: "Tangerine Studio's mascot",
    ctas: {
      home: "Back to home",
      work: "See the work",
      studio: "Meet the studio",
    },
  },
};
