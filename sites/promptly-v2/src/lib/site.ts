// lib/site.ts - Single source of truth for site URL and canonical links
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export const canonical = (path = "/") =>
  new URL(path || "/", siteUrl).toString();

// Site metadata constants
export const siteConfig = {
  name: "Zaza Draft",
  description: "The writing partner for teachers. Beat the blank page, save hours, and stay in control — for parent emails, student reports, and staff notes.",
  url: siteUrl,
  ogImage: `${siteUrl}/images/og/zaza-draft.jpg`,
  author: {
    name: "Dr. Greg Blackburn",
    url: `${siteUrl}/about`,
    avatar: `${siteUrl}/images/authors/greg-blackburn.jpg`
  },
  organization: {
    name: "Zaza Technologies GmbH",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`
  },
  social: {
    linkedin: "https://www.linkedin.com/company/zaza-technologies",
    tiktok: "https://www.tiktok.com/@zazatechnologies"
  }
} as const;