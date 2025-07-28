"use client"

import Head from "next/head"

interface SEOHeadProps {
  pageType?: "home" | "features" | "pricing" | "about" | "help" | "waitlist" | "blog" | "contact" | "privacy" | "terms" | "faqs" | "support" | "free-resources" | "about-founder" | "vision-mission" | "promptly-faq" | "promptly-pricing"
  title?: string
  description?: string
  image?: string
  url?: string
  article?: {
    publishedTime: string
    modifiedTime: string
    author: string
    section: string
    tags: string[]
  }
  noindex?: boolean
}

const seoContent = {
  home: {
    title: "AI Comment Generator for Teachers | Zaza Promptly - Save Hours on Report Writing",
    description:
      "Save hours with Zaza Promptly – the AI-powered tool that helps teachers write student comments and parent messages faster, better, and stress-free. Trusted by thousands of educators worldwide.",
    url: "https://zazapromptly.com",
    keywords: "AI comment generator, artificial intelligence for teachers, student report writing tool, teacher productivity software, AI for teachers, teacher feedback tool, automated student comments, AI-powered education, ChatGPT alternative for teachers, machine learning education tools, natural language processing for teachers, AI report card generator, teacher time saver, educational AI software, AI teaching assistant, automated feedback generation, AI student assessment, teacher workflow automation, AI-powered grading, intelligent tutoring system",
  },
  features: {
    title: "AI Teacher Tools & Features | Zaza Promptly - Boost Your Teaching Efficiency",
    description:
      "Discover how Zaza Promptly helps teachers generate report comments, translate messages, and personalize tone — all in seconds. Boost your teaching efficiency with AI-powered tools.",
    url: "https://zazapromptly.com/features",
    keywords: "teacher features, AI comment generation, report writing tools, teacher productivity, educational AI, student feedback tools, teacher software, artificial intelligence features, machine learning tools, AI-powered feedback, natural language processing, automated report writing, AI teaching tools, educational technology features, AI assessment tools, intelligent feedback system, AI grading assistance, teacher automation features, AI communication tools, educational AI features",
  },
  pricing: {
    title: "Affordable Plans for Teachers | Zaza Promptly Pricing - Start Free Today",
    description:
      "Choose a flexible plan that fits your teaching style. Start free and upgrade anytime. Save time every term with Zaza Promptly's AI-powered tools. No hidden fees.",
    url: "https://zazapromptly.com/pricing",
    keywords: "teacher pricing, affordable education tools, teacher plans, AI tool pricing, education technology cost, teacher software pricing, free trial, AI software pricing, artificial intelligence pricing, machine learning tool cost, AI education pricing, teacher AI subscription, educational technology pricing, AI tool plans, teacher software cost, AI-powered tool pricing, artificial intelligence subscription, machine learning software pricing, AI education cost, teacher automation pricing",
  },
  about: {
    title: "About Zaza Promptly | AI Tools Built by Teachers, for Teachers",
    description:
      "Zaza Promptly was created by Dr. Greg Blackburn to help teachers thrive — not burn out. Discover the mission behind our AI-powered teaching tools and our commitment to education.",
    url: "https://zazapromptly.com/about",
    keywords: "about Zaza, teacher-founded, Dr. Greg Blackburn, education mission, teacher tools history, AI education company, artificial intelligence company, machine learning education, AI startup, educational technology company, teacher entrepreneur, AI education founder, artificial intelligence mission, machine learning for education, AI teaching company, educational AI startup, teacher technology company, AI education innovation, artificial intelligence education, machine learning teaching tools",
  },
  help: {
    title: "Zaza Promptly Support & FAQ | Help Centre - Get Answers Fast",
    description:
      "Find answers fast. Get help with report comment generation, account setup, and more. Support built for busy teachers with comprehensive guides and tutorials.",
    url: "https://zazapromptly.com/help",
    keywords: "teacher support, FAQ, help center, education support, teacher assistance, AI tool help, teacher software support, artificial intelligence support, machine learning help, AI education support, educational technology help, AI tool assistance, artificial intelligence assistance, machine learning support, AI teaching help, educational AI support, teacher AI assistance, artificial intelligence education help, machine learning education support, AI tool troubleshooting",
  },
  waitlist: {
    title: "Join the Zaza Promptly Waitlist Today - Early Access for Teachers",
    description:
      "Get early access to Zaza Promptly — the AI comment generator for teachers. Join thousands of educators already on the list and be first to try new features.",
    url: "https://zazapromptly.com/waitlist",
    keywords: "teacher waitlist, early access, AI education tools, teacher signup, beta access, teacher software preview, artificial intelligence waitlist, machine learning early access, AI tool beta, artificial intelligence preview, machine learning waitlist, AI education beta, artificial intelligence education access, machine learning tool preview, AI teaching waitlist, educational AI beta, artificial intelligence teaching access, machine learning education preview, AI tool early access, artificial intelligence beta testing",
  },
  blog: {
    title: "Teacher Resources & Tips | Zaza Promptly Blog - Education Insights",
    description:
      "Discover teaching tips, AI education insights, and productivity hacks for educators. Stay updated with the latest in educational technology and teaching best practices.",
    url: "https://zazapromptly.com/blog",
    keywords: "teacher blog, education tips, teaching resources, AI education, teacher productivity, educational technology blog, artificial intelligence blog, machine learning education, AI teaching blog, educational AI insights, artificial intelligence tips, machine learning teaching, AI education resources, artificial intelligence education blog, machine learning for teachers, AI teaching tips, educational technology insights, artificial intelligence teaching, machine learning education blog, AI education best practices",
  },
  contact: {
    title: "Contact Zaza Promptly | Get in Touch - Teacher Support Team",
    description:
      "Have questions about Zaza Promptly? Contact our team of educators and AI experts. We're here to help you succeed and improve your teaching experience.",
    url: "https://zazapromptly.com/contact",
    keywords: "contact Zaza, teacher support, education contact, AI education help, teacher software support, artificial intelligence contact, machine learning support, AI tool contact, artificial intelligence help, machine learning contact, AI education contact, artificial intelligence education support, machine learning education contact, AI teaching contact, educational AI support, artificial intelligence teaching contact, machine learning teaching support, AI tool support, artificial intelligence education contact, machine learning tool help",
  },
  privacy: {
    title: "Privacy Policy | Zaza Promptly - Your Data Security Matters",
    description:
      "Learn how Zaza Promptly protects your privacy and student data. Our comprehensive privacy policy ensures GDPR and FERPA compliance for educational institutions.",
    url: "https://zazapromptly.com/privacy",
    keywords: "privacy policy, teacher data protection, student privacy, GDPR compliance, FERPA compliance, education privacy, AI privacy, artificial intelligence privacy, machine learning privacy, AI data protection, artificial intelligence data security, machine learning privacy policy, AI education privacy, artificial intelligence education security, machine learning education privacy, AI tool privacy, artificial intelligence tool security, machine learning tool privacy, AI teaching privacy, artificial intelligence teaching security",
  },
  terms: {
    title: "Terms of Service | Zaza Promptly - Fair Terms for Teachers",
    description:
      "Read our terms of service for Zaza Promptly. Clear, fair terms designed for educators with transparent pricing and usage policies.",
    url: "https://zazapromptly.com/terms",
    keywords: "terms of service, teacher software terms, education software terms, AI tool terms, artificial intelligence terms, machine learning terms, AI education terms, artificial intelligence education terms, machine learning education terms, AI tool service terms, artificial intelligence tool terms, machine learning tool terms, AI teaching terms, artificial intelligence teaching terms, machine learning teaching terms, AI education service terms, artificial intelligence education service, machine learning education service, AI tool service agreement, artificial intelligence tool agreement",
  },
  faqs: {
    title: "Frequently Asked Questions | Zaza Promptly FAQ - Teacher Answers",
    description:
      "Find answers to common questions about Zaza Promptly. Comprehensive FAQ covering features, pricing, security, and how to get started with AI-powered teaching tools.",
    url: "https://zazapromptly.com/faqs",
    keywords: "teacher FAQ, AI tool questions, education software FAQ, teacher software help, artificial intelligence FAQ, machine learning FAQ, AI education questions, artificial intelligence education FAQ, machine learning education FAQ, AI tool FAQ, artificial intelligence tool questions, machine learning tool FAQ, AI teaching FAQ, artificial intelligence teaching questions, machine learning teaching FAQ, AI education FAQ, artificial intelligence education questions, machine learning education questions, AI tool help, artificial intelligence tool FAQ",
  },
  support: {
    title: "Teacher Support | Zaza Promptly - Get Help When You Need It",
    description:
      "Get comprehensive support for Zaza Promptly. From setup guides to advanced features, our support team is here to help teachers succeed.",
    url: "https://zazapromptly.com/support",
    keywords: "teacher support, AI tool support, education software help, teacher assistance, artificial intelligence support, machine learning support, AI education support, artificial intelligence education help, machine learning education support, AI tool assistance, artificial intelligence tool support, machine learning tool help, AI teaching support, artificial intelligence teaching help, machine learning teaching support, AI education assistance, artificial intelligence education support, machine learning education assistance, AI tool help, artificial intelligence tool assistance",
  },
  "free-resources": {
    title: "Free Teacher Resources | Zaza Promptly - Download Templates & Guides",
    description:
      "Download free teaching resources, templates, and guides from Zaza Promptly. Enhance your teaching with our collection of educational materials.",
    url: "https://zazapromptly.com/free-resources",
    keywords: "free teacher resources, educational templates, teaching guides, teacher downloads, free AI resources, artificial intelligence resources, machine learning resources, free AI education tools, artificial intelligence education resources, machine learning education resources, free AI teaching tools, artificial intelligence teaching resources, machine learning teaching resources, free AI templates, artificial intelligence templates, machine learning templates, free AI guides, artificial intelligence guides, machine learning guides, free AI education materials",
  },
  "about-founder": {
    title: "About Dr. Greg Blackburn | Zaza Promptly Founder - Teacher Turned Tech Entrepreneur",
    description:
      "Meet Dr. Greg Blackburn, the teacher-turned-tech entrepreneur behind Zaza Promptly. Learn about his journey from classroom to AI education innovation.",
    url: "https://zazapromptly.com/about-founder",
    keywords: "Dr. Greg Blackburn, Zaza founder, teacher entrepreneur, education technology founder, AI education founder, artificial intelligence founder, machine learning founder, AI startup founder, educational technology entrepreneur, teacher tech entrepreneur, AI education entrepreneur, artificial intelligence education founder, machine learning education founder, AI teaching founder, artificial intelligence teaching entrepreneur, machine learning teaching founder, AI education innovation, artificial intelligence education innovation, machine learning education innovation, AI education pioneer",
  },
  "vision-mission": {
    title: "Vision & Mission | Zaza Promptly - Empowering Teachers Through AI",
    description:
      "Discover Zaza Promptly's vision and mission to empower teachers through AI technology. We're committed to reducing teacher workload and improving student outcomes.",
    url: "https://zazapromptly.com/vision-mission",
    keywords: "teacher empowerment, education vision, AI education mission, teacher technology goals, artificial intelligence vision, machine learning mission, AI education goals, artificial intelligence education mission, machine learning education vision, AI teaching mission, artificial intelligence teaching vision, machine learning teaching mission, AI education empowerment, artificial intelligence education empowerment, machine learning education empowerment, AI teaching goals, artificial intelligence teaching goals, machine learning teaching goals, AI education vision, artificial intelligence education goals",
  },
  "promptly-faq": {
    title: "Zaza Promptly FAQ | Common Questions About Our AI Teaching Tools",
    description:
      "Get answers to frequently asked questions about Zaza Promptly's AI-powered teaching tools. Everything you need to know about features, pricing, and implementation.",
    url: "https://zazapromptly.com/promptly-faq",
    keywords: "Zaza Promptly FAQ, AI teaching tools questions, teacher software FAQ, artificial intelligence FAQ, machine learning FAQ, AI education FAQ, artificial intelligence education FAQ, machine learning education FAQ, AI tool FAQ, artificial intelligence tool FAQ, machine learning tool FAQ, AI teaching FAQ, artificial intelligence teaching FAQ, machine learning teaching FAQ, AI education questions, artificial intelligence education questions, machine learning education questions, AI tool questions, artificial intelligence tool questions, machine learning tool questions",
  },
  "promptly-pricing": {
    title: "Zaza Promptly Pricing | Affordable AI Tools for Teachers",
    description:
      "Explore Zaza Promptly's transparent pricing plans designed for teachers. Start free and choose the plan that fits your needs and budget.",
    url: "https://zazapromptly.com/promptly-pricing",
    keywords: "Zaza Promptly pricing, teacher AI tool cost, affordable education software, artificial intelligence pricing, machine learning pricing, AI education pricing, artificial intelligence education pricing, machine learning education pricing, AI tool pricing, artificial intelligence tool pricing, machine learning tool pricing, AI teaching pricing, artificial intelligence teaching pricing, machine learning teaching pricing, AI education cost, artificial intelligence education cost, machine learning education cost, AI tool cost, artificial intelligence tool cost, machine learning tool cost",
  },
}

export function SEOHead({ 
  pageType = "home", 
  title: customTitle,
  description: customDescription,
  image: customImage,
  url: customUrl,
  article,
  noindex = false
}: SEOHeadProps) {
  const seo = seoContent[pageType]
  const finalTitle = customTitle || seo.title
  const finalDescription = customDescription || seo.description
  const finalUrl = customUrl || seo.url
  const finalImage = customImage || "https://zazapromptly.com/og-image.png"

  // Generate structured data
  const generateStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zaza Promptly",
      alternateName: "AI Comment Generator for Teachers",
      description: finalDescription,
      url: finalUrl,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "AI Teaching Assistant",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      },
      creator: {
        "@type": "Organization",
        name: "Zaza Technologies",
        alternateName: "Zaza Promptly",
        url: "https://zazapromptly.com",
        logo: "https://zazapromptly.com/zaza-logo.png",
        sameAs: [
          "https://twitter.com/zazateach",
          "https://www.linkedin.com/company/zazatechnologies",
          "https://www.tiktok.com/@zazateach"
        ]
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1247",
        bestRating: "5",
        worstRating: "1"
      },
      featureList: [
        "AI-powered comment generation",
        "Natural language processing",
        "Machine learning algorithms",
        "Multiple feedback tones",
        "Translation support",
        "Report writing assistance",
        "Teacher productivity tools",
        "Student data privacy",
        "FERPA and GDPR compliance",
        "Automated feedback generation",
        "Intelligent tutoring system",
        "AI teaching assistant",
        "Automated grading assistance",
        "Educational AI software",
        "Teacher workflow automation"
      ],
      screenshot: "https://zazapromptly.com/screenshot.png",
      softwareVersion: "2.0",
      releaseNotes: "Enhanced AI models, improved user interface, and new feedback templates",
      downloadUrl: "https://zazapromptly.com/signup",
      installUrl: "https://zazapromptly.com/signup",
      requirements: "Modern web browser with JavaScript enabled",
      permissions: "No special permissions required",
      memoryRequirements: "Minimal memory usage",
      storageRequirements: "No local storage required",
      // AI-specific properties
      usesAI: true,
      aiCapabilities: [
        "Natural language generation",
        "Text analysis and processing",
        "Tone customization",
        "Contextual understanding",
        "Educational content generation"
      ],
      aiModel: "Advanced Language Model",
      aiTrainingData: "Educational content and teacher feedback",
      aiAccuracy: "95% accuracy in feedback generation"
    }

    // Add article structured data if provided
    if (article) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: finalTitle,
        description: finalDescription,
        image: finalImage,
        url: finalUrl,
        datePublished: article.publishedTime,
        dateModified: article.modifiedTime,
        author: {
          "@type": "Person",
          name: article.author
        },
        publisher: {
          "@type": "Organization",
          name: "Zaza Technologies",
          logo: {
            "@type": "ImageObject",
            url: "https://zazapromptly.com/zaza-logo.png"
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": finalUrl
        },
        articleSection: article.section,
        keywords: article.tags.join(", ")
      }
    }

    return baseStructuredData
  }

  // Generate FAQ structured data
  const generateFAQStructuredData = () => {
    if (pageType !== "help" && pageType !== "faqs" && pageType !== "promptly-faq") return null

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does Zaza Promptly's AI generate student comments?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zaza Promptly uses advanced artificial intelligence and natural language processing to analyze student performance data and generate personalized, thoughtful comments that reflect each student's progress and achievements. Our AI model has been trained on educational content and teacher feedback patterns."
          }
        },
        {
          "@type": "Question",
          name: "Is Zaza Promptly safe for student data and privacy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Zaza Promptly is GDPR and FERPA compliant. We prioritize student privacy and data security, ensuring all information is protected and encrypted. Our AI processes data securely without storing sensitive student information."
          }
        },
        {
          "@type": "Question",
          name: "How is Zaza Promptly different from ChatGPT or other AI tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike generic AI tools like ChatGPT, Zaza Promptly is specifically designed for teachers with educational expertise built-in. Our AI understands educational contexts, curriculum standards, and teacher communication styles, providing more relevant and accurate feedback for students."
          }
        },
        {
          "@type": "Question",
          name: "Can I customize the AI's tone and style?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! You can choose from multiple AI-generated tones including encouraging, constructive, formal, and warm to match your communication style and the student's needs. The AI adapts its language patterns accordingly."
          }
        },
        {
          "@type": "Question",
          name: "How much time does Zaza Promptly's AI save?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Teachers typically save 15-20 minutes per student comment using our AI-powered system, reducing report writing time from hours to minutes while maintaining quality and personalization that only AI can provide."
          }
        },
        {
          "@type": "Question",
          name: "What subjects and grade levels does the AI support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zaza Promptly's AI supports all subjects and grade levels from K-12, with specialized templates and language patterns for different subjects and learning objectives. The AI adapts its vocabulary and approach based on the educational context."
          }
        },
        {
          "@type": "Question",
          name: "Is there a free trial for the AI features?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! Zaza Promptly offers a free trial so you can experience the AI-powered time-saving benefits before committing to a paid plan. Try our AI comment generation and see the difference."
          }
        },
        {
          "@type": "Question",
          name: "How accurate is the AI-generated feedback?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our AI achieves 95% accuracy in feedback generation, with continuous learning and improvement. The AI has been trained on thousands of teacher feedback examples and educational content to ensure relevance and appropriateness."
          }
        },
        {
          "@type": "Question",
          name: "Can I export AI-generated comments to my school's system?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Zaza Promptly allows you to easily copy and paste AI-generated comments into any reporting system or document format your school uses. The AI ensures the content is ready for immediate use."
          }
        },
        {
          "@type": "Question",
          name: "Does the AI learn from my feedback style?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our AI system adapts to your personal teaching style and feedback preferences over time. The more you use it, the better it understands your communication patterns and educational approach."
          }
        },
        {
          "@type": "Question",
          name: "What AI technology does Zaza Promptly use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zaza Promptly uses advanced natural language processing and machine learning algorithms specifically trained on educational content. Our AI model understands teaching contexts, curriculum standards, and student development patterns."
          }
        },
        {
          "@type": "Question",
          name: "Is the AI available in multiple languages?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our AI supports multiple languages and can generate comments in different languages, making it useful for diverse classrooms and international schools. The AI maintains educational context across languages."
          }
        }
      ]
    }
  }

  // Generate Breadcrumb structured data
  const generateBreadcrumbStructuredData = () => {
    const breadcrumbs = {
      home: [
        { name: "Home", url: "https://zazapromptly.com" }
      ],
      features: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Features", url: "https://zazapromptly.com/features" }
      ],
      pricing: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Pricing", url: "https://zazapromptly.com/pricing" }
      ],
      about: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "About", url: "https://zazapromptly.com/about" }
      ],
      help: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Help", url: "https://zazapromptly.com/help" }
      ],
      contact: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Contact", url: "https://zazapromptly.com/contact" }
      ],
      faqs: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "FAQs", url: "https://zazapromptly.com/faqs" }
      ],
      support: [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Support", url: "https://zazapromptly.com/support" }
      ],
      "free-resources": [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Free Resources", url: "https://zazapromptly.com/free-resources" }
      ],
      "about-founder": [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "About", url: "https://zazapromptly.com/about" },
        { name: "Founder", url: "https://zazapromptly.com/about-founder" }
      ],
      "vision-mission": [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "About", url: "https://zazapromptly.com/about" },
        { name: "Vision & Mission", url: "https://zazapromptly.com/vision-mission" }
      ],
      "promptly-faq": [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "FAQ", url: "https://zazapromptly.com/promptly-faq" }
      ],
      "promptly-pricing": [
        { name: "Home", url: "https://zazapromptly.com" },
        { name: "Pricing", url: "https://zazapromptly.com/promptly-pricing" }
      ]
    }

    const currentBreadcrumbs = breadcrumbs[pageType] || breadcrumbs.home

    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: currentBreadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  }

  // Generate Local Business structured data
  const generateLocalBusinessStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Zaza Technologies",
      alternateName: "Zaza Promptly",
      url: "https://zazapromptly.com",
      logo: "https://zazapromptly.com/zaza-logo.png",
      description: "AI-powered tools for teachers to save time and improve student feedback",
      address: {
        "@type": "PostalAddress",
        addressCountry: "AU",
        addressRegion: "Victoria"
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "support@zazapromptly.com",
        availableLanguage: "English"
      },
      sameAs: [
        "https://twitter.com/zazateach",
        "https://www.linkedin.com/company/zazatechnologies",
        "https://www.tiktok.com/@zazateach"
      ],
      areaServed: "Worldwide",
      serviceType: "Educational Software",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Teacher Tools",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Comment Generation",
              description: "Generate personalized student comments using AI"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Report Writing Assistance",
              description: "AI-powered tools for creating comprehensive student reports"
            }
          }
        ]
      }
    }
  }

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={finalUrl} />
      
      {/* Robots meta tag */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Zaza Promptly - AI-powered tools for teachers" />
      <meta property="og:site_name" content="Zaza Promptly" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={finalUrl} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />
      <meta property="twitter:image:alt" content="Zaza Promptly - AI-powered tools for teachers" />
      <meta property="twitter:creator" content="@zazateach" />
      <meta property="twitter:site" content="@zazateach" />

      {/* Additional Meta Tags */}
      <meta name="language" content="English" />
      <meta name="author" content="Zaza Technologies" />
      <meta name="copyright" content="Zaza Technologies" />
      <meta name="theme-color" content="#7c3aed" />
      <meta name="msapplication-TileColor" content="#7c3aed" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Zaza Promptly" />
      
      {/* Additional SEO meta tags */}
      <meta name="geo.region" content="AU" />
      <meta name="geo.placename" content="Australia" />
      <meta name="geo.position" content="-25.2744;133.7751" />
      <meta name="ICBM" content="-25.2744, 133.7751" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=no" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#7c3aed" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* DNS prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      {/* Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Zaza Technologies",
            alternateName: "Zaza Promptly",
            url: "https://zazapromptly.com",
            logo: "https://zazapromptly.com/zaza-logo.png",
            description: "AI-powered tools for teachers to save time and improve student feedback",
            address: {
              "@type": "PostalAddress",
              addressCountry: "AU"
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "support@zazapromptly.com",
              availableLanguage: "English"
            },
            sameAs: [
              "https://twitter.com/zazateach",
              "https://www.linkedin.com/company/zazatechnologies",
              "https://www.tiktok.com/@zazateach"
            ],
            founder: {
              "@type": "Person",
              name: "Dr. Greg Blackburn",
              jobTitle: "Founder & CEO",
              description: "Teacher-turned-tech entrepreneur"
            },
            foundingDate: "2023",
            areaServed: "Worldwide",
            serviceType: "Educational Software",
            // AI-specific organization properties
            industry: "Educational Technology",
            specialization: "Artificial Intelligence for Education",
            aiCapabilities: [
              "Natural Language Processing",
              "Machine Learning",
              "Educational AI",
              "Automated Feedback Generation"
            ]
          }),
        }}
      />

      {/* AI Tool structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Zaza Promptly AI",
            alternateName: "AI Comment Generator",
            description: "Advanced AI-powered tool for generating personalized student feedback and comments",
            url: "https://zazapromptly.com",
            applicationCategory: "EducationalApplication",
            applicationSubCategory: "AI Teaching Assistant",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock"
            },
            creator: {
              "@type": "Organization",
              name: "Zaza Technologies"
            },
            featureList: [
              "AI-powered comment generation",
              "Natural language processing",
              "Machine learning algorithms",
              "Educational context understanding",
              "Tone customization",
              "Multi-language support",
              "Curriculum alignment",
              "Student progress tracking"
            ],
            // AI-specific properties
            usesAI: true,
            aiModel: "Advanced Language Model",
            aiCapabilities: [
              "Natural language generation",
              "Text analysis and processing",
              "Contextual understanding",
              "Educational content generation",
              "Tone and style adaptation"
            ],
            aiAccuracy: "95% accuracy in feedback generation",
            aiTrainingData: "Educational content and teacher feedback",
            aiUseCase: "Student feedback generation and report writing",
            aiTechnology: "Natural Language Processing and Machine Learning"
          }),
        }}
      />

      {/* Local Business structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessStructuredData()),
        }}
      />

      {/* FAQ structured data for help pages */}
      {generateFAQStructuredData() && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQStructuredData()),
          }}
        />
      )}

      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbStructuredData()),
        }}
      />
    </Head>
  )
}
