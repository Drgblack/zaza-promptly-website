type ContextPayload = {
  topic: string;
  locale: string;
  tone: string;
  draft?: string;
  goal: string;
  student?: string;
};

type FormattedResponse = {
  title: string;
  content: string;
  buttons: Array<{
    text: string;
    action: 'promptly' | 'trial' | 'link';
    url?: string;
    contextPayload?: ContextPayload;
  }>;
};

export function formatTeachingResponse(
  title: string,
  content: string,
  locale: string,
  topic: string,
  userDraft?: string
): FormattedResponse {
  const contextPayload: ContextPayload = {
    topic: anonymizeTopic(topic),
    locale,
    tone: detectTone(content),
    goal: extractGoal(content),
    ...(userDraft && { draft: anonymizeContent(userDraft) })
  };

  return {
    title: title.length > 8 ? title.substring(0, 8).trim() + '...' : title,
    content,
    buttons: [
      {
        text: getLocalizedText('improveInPromptly', locale),
        action: 'promptly',
        contextPayload
      },
      {
        text: getLocalizedText('startFreeTrial', locale),
        action: 'trial',
        url: '/pricing'
      }
    ]
  };
}

export function formatProductResponse(
  content: string,
  locale: string,
  topic: string
): FormattedResponse {
  const contextPayload: ContextPayload = {
    topic: anonymizeTopic(topic),
    locale,
    tone: 'informative',
    goal: 'product-inquiry'
  };

  return {
    title: getLocalizedText('productInfo', locale),
    content,
    buttons: [
      {
        text: getLocalizedText('learnMore', locale),
        action: 'link',
        url: getRelevantProductPage(topic)
      },
      {
        text: getLocalizedText('startFreeTrial', locale),
        action: 'trial',
        url: '/pricing'
      }
    ]
  };
}

export function buildDeepLinkUrl(
  baseUrl: string,
  contextPayload: ContextPayload
): string {
  const params = new URLSearchParams();
  
  Object.entries(contextPayload).forEach(([key, value]) => {
    if (value) {
      params.append(`ctx_${key}`, value);
    }
  });
  
  return `${baseUrl}?${params.toString()}`;
}

function anonymizeTopic(topic: string): string {
  // Remove names and specific details while preserving topic essence
  return topic
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[Student Name]') // Names
    .replace(/\bgrade \d+\b/gi, 'grade X') // Grade levels
    .replace(/\b\d{1,2}[a-z]{0,2}\s+grade\b/gi, 'grade X') // "3rd grade" etc
    .replace(/class \d+[a-z]?/gi, 'class X') // Class identifiers
    .substring(0, 100); // Limit length
}

function anonymizeContent(content: string): string {
  // Similar anonymization for draft content
  return content
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[Student Name]')
    .replace(/\b[A-Z][a-z]+\b(?=\s+(?:has|is|was|were|will))/g, '[Student]')
    .substring(0, 200); // Limit length for context
}

function detectTone(content: string): string {
  const contentLower = content.toLowerCase();
  
  if (contentLower.includes('firm') || contentLower.includes('clear boundaries')) {
    return 'firm';
  }
  
  if (contentLower.includes('supportive') || contentLower.includes('encourage')) {
    return 'supportive';
  }
  
  return 'neutral';
}

function extractGoal(content: string): string {
  const contentLower = content.toLowerCase();
  
  if (contentLower.includes('parent') || contentLower.includes('communication')) {
    return 'parent-communication';
  }
  
  if (contentLower.includes('feedback') || contentLower.includes('comment')) {
    return 'student-feedback';
  }
  
  if (contentLower.includes('behavior') || contentLower.includes('classroom management')) {
    return 'behavior-management';
  }
  
  return 'general-teaching';
}

function getRelevantProductPage(topic: string): string {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('pricing') || topicLower.includes('cost')) {
    return '/pricing';
  }
  
  if (topicLower.includes('privacy') || topicLower.includes('data')) {
    return '/privacy';
  }
  
  if (topicLower.includes('support') || topicLower.includes('help')) {
    return '/support';
  }
  
  return '/features';
}

function getLocalizedText(key: string, locale: string): string {
  const texts: Record<string, Record<string, string>> = {
    en: {
      improveInPromptly: 'Improve in Promptly',
      startFreeTrial: 'Start Free Trial',
      productInfo: 'Product Info',
      learnMore: 'Learn More'
    },
    de: {
      improveInPromptly: 'In Promptly verbessern',
      startFreeTrial: 'Kostenlos testen',
      productInfo: 'Produktinfo',
      learnMore: 'Mehr erfahren'
    },
    fr: {
      improveInPromptly: 'Améliorer dans Promptly',
      startFreeTrial: 'Essai gratuit',
      productInfo: 'Info produit',
      learnMore: 'En savoir plus'
    },
    es: {
      improveInPromptly: 'Mejorar en Promptly',
      startFreeTrial: 'Prueba gratuita',
      productInfo: 'Info del producto',
      learnMore: 'Saber más'
    },
    it: {
      improveInPromptly: 'Migliora in Promptly',
      startFreeTrial: 'Prova gratuita',
      productInfo: 'Info prodotto',
      learnMore: 'Scopri di più'
    }
  };
  
  return texts[locale]?.[key] || texts.en[key] || key;
}