export const externalLinks = {
  // Internal (exists in this project)
  home: "/",
  // Shared content (external)
  blog: "https://zazatechnologies.com/blog",
  about: "https://zazatechnologies.com/about",
  privacy: "https://zazatechnologies.com/privacy",
  freeResources: "https://zazatechnologies.com/free-resources",
  faqs: "https://zazatechnologies.com/faqs",
  visionMission: "https://zazatechnologies.com/vision-mission",
  aboutFounder: "https://zazatechnologies.com/about-founder",
  contact: "https://zazatechnologies.com/contact",
  products: "https://zazatechnologies.com/products",
  // Product Sites
  promptly: "https://zazapromptly.com",
  teach: "https://zazateach.com",
  visuals: "https://zazavisuals.com",
  coach: "https://zazacoach.com",
  schwoop: "https://zazaschwoop.com",
  clarityDeck: "https://zazaclaritydeck.com",
  technologies: "https://zazatechnologies.com",
  // Social
  tiktok: "https://tiktok.com/@zazatechnologies",
  linkedin: "https://linkedin.com/company/zazatechnologies",
  // CTAs (use env vars to control destination)
  tryPromptly: process.env.NEXT_PUBLIC_PROMPTLY_LIVE === "true"
    ? "https://zazapromptly.com"
    : "/zaza-promptly",
  tryTeach: process.env.NEXT_PUBLIC_TEACH_LIVE === "true"
    ? "https://zazateach.com"
    : "/zaza-teach",
}; 