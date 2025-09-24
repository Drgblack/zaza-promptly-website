export interface ZaraAnswer {
  title: string;
  what_to_do: string[];         // 3–5 bullets, imperative voice
  say_this: string[];           // 2–3 short parent/teacher scripts
  differentiation: string[];    // SEND/ELL quick adaptations
  next_steps: string[];         // 1–2 actions for this week
  context_payload: {
    topic: string;
    locale?: string;
    tone: "warm-professional";
    goal?: string;
    student?: string;
    draft?: string;
  };
  ctas: {
    improve_in_promptly: string;
    start_trial: string;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  answer?: ZaraAnswer;
}

export function validateZaraAnswer(data: any): ValidationResult {
  const errors: string[] = [];
  
  // Check required fields exist
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Response must be a valid object'] };
  }
  
  // Title validation
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.push('title must be a non-empty string');
  } else if (data.title.length > 80) {
    errors.push('title must be 80 characters or less');
  }
  
  // Array field validations
  const arrayFields = [
    { field: 'what_to_do', min: 3, max: 5, name: 'what_to_do' },
    { field: 'say_this', min: 2, max: 3, name: 'say_this' },
    { field: 'differentiation', min: 1, max: 3, name: 'differentiation' },
    { field: 'next_steps', min: 1, max: 2, name: 'next_steps' }
  ];
  
  arrayFields.forEach(({ field, min, max, name }) => {
    if (!Array.isArray(data[field])) {
      errors.push(`${name} must be an array`);
    } else {
      if (data[field].length < min || data[field].length > max) {
        errors.push(`${name} must have ${min}-${max} items`);
      }
      
      data[field].forEach((item: any, index: number) => {
        if (typeof item !== 'string' || item.trim().length === 0) {
          errors.push(`${name}[${index}] must be a non-empty string`);
        } else if (item.length > 300) {
          errors.push(`${name}[${index}] must be 300 characters or less`);
        }
      });
    }
  });
  
  // Context payload validation
  if (!data.context_payload || typeof data.context_payload !== 'object') {
    errors.push('context_payload must be an object');
  } else {
    const cp = data.context_payload;
    
    if (!cp.topic || typeof cp.topic !== 'string') {
      errors.push('context_payload.topic must be a string');
    }
    
    if (cp.tone !== 'warm-professional') {
      errors.push('context_payload.tone must be "warm-professional"');
    }
    
    // Optional fields type checking
    if (cp.locale && typeof cp.locale !== 'string') {
      errors.push('context_payload.locale must be a string if provided');
    }
    if (cp.goal && typeof cp.goal !== 'string') {
      errors.push('context_payload.goal must be a string if provided');
    }
    if (cp.student && typeof cp.student !== 'string') {
      errors.push('context_payload.student must be a string if provided');
    }
    if (cp.draft && typeof cp.draft !== 'string') {
      errors.push('context_payload.draft must be a string if provided');
    }
  }
  
  // CTAs validation
  if (!data.ctas || typeof data.ctas !== 'object') {
    errors.push('ctas must be an object');
  } else {
    if (!data.ctas.improve_in_promptly || typeof data.ctas.improve_in_promptly !== 'string') {
      errors.push('ctas.improve_in_promptly must be a string');
    }
    if (!data.ctas.start_trial || typeof data.ctas.start_trial !== 'string') {
      errors.push('ctas.start_trial must be a string');
    }
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return { isValid: true, errors: [], answer: data as ZaraAnswer };
}

export function createFallbackAnswer(topic: string, locale: string = 'en'): ZaraAnswer {
  const localeTexts = {
    en: {
      title: "I'm here to help",
      whatToDo: ["Let me understand your specific situation better", "Share more details about what you're trying to achieve", "I'll provide targeted strategies for your classroom"],
      sayThis: ["Could you tell me more about the specific challenge?", "What have you tried so far that's worked or not worked?"],
      differentiation: ["I can adapt any strategy for different learning needs", "Let me know if you have students with specific accommodations"],
      nextSteps: ["Please rephrase your question with more specific details", "I'll provide concrete strategies once I understand better"],
      improvePromptly: "Get detailed help in Promptly",
      startTrial: "Start Free Trial"
    },
    de: {
      title: "Ich bin hier um zu helfen",
      whatToDo: ["Lass mich deine spezifische Situation besser verstehen", "Teile mehr Details darüber mit, was du erreichen möchtest", "Ich werde gezielte Strategien für dein Klassenzimmer bereitstellen"],
      sayThis: ["Könntest du mir mehr über die spezifische Herausforderung erzählen?", "Was hast du bisher versucht, was funktioniert oder nicht funktioniert hat?"],
      differentiation: ["Ich kann jede Strategie an verschiedene Lernbedürfnisse anpassen", "Lass mich wissen, ob du Schüler mit besonderen Bedürfnissen hast"],
      nextSteps: ["Bitte formuliere deine Frage mit mehr spezifischen Details neu", "Ich werde konkrete Strategien bereitstellen, sobald ich es besser verstehe"],
      improvePromptly: "Detaillierte Hilfe in Promptly erhalten",
      startTrial: "Kostenlose Testversion starten"
    }
  };
  
  const texts = localeTexts[locale as keyof typeof localeTexts] || localeTexts.en;
  
  return {
    title: texts.title,
    what_to_do: texts.whatToDo,
    say_this: texts.sayThis,
    differentiation: texts.differentiation,
    next_steps: texts.nextSteps,
    context_payload: {
      topic: topic.substring(0, 100),
      locale,
      tone: "warm-professional",
      goal: "clarification"
    },
    ctas: {
      improve_in_promptly: texts.improvePromptly,
      start_trial: texts.startTrial
    }
  };
}

export function sanitizeAnswer(answer: ZaraAnswer): ZaraAnswer {
  // Remove any potential system prompt leakage
  const systemPhrases = [
    /you are zara/gi,
    /system prompt/gi,
    /instructions:/gi,
    /internal instructions/gi,
    /my instructions/gi,
    /i was told to/gi,
    /the system/gi
  ];
  
  const sanitizeText = (text: string): string => {
    let sanitized = text;
    systemPhrases.forEach(phrase => {
      sanitized = sanitized.replace(phrase, '');
    });
    return sanitized.trim();
  };
  
  const sanitizeArray = (arr: string[]): string[] => {
    return arr.map(item => sanitizeText(item)).filter(item => item.length > 0);
  };
  
  return {
    ...answer,
    title: sanitizeText(answer.title),
    what_to_do: sanitizeArray(answer.what_to_do),
    say_this: sanitizeArray(answer.say_this),
    differentiation: sanitizeArray(answer.differentiation),
    next_steps: sanitizeArray(answer.next_steps)
  };
}