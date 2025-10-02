export type Pronoun = "he" | "she" | "they";
type Templates = { openers: string[]; closers: string[] };

export const KB: Record<Pronoun, Templates> = {
  he: {
    openers: [
      "I'd like to share an update about {NAME}. He has been finding it hard to stay focused during lessons.",
      "I'd like to share an update about {NAME}. Over the past week he has been arriving late to class, and some homework has been incomplete."
    ],
    closers: [
      "Please let me know a good time for us to discuss next steps together.",
      "Could we agree a quick plan that fits your morning routine and supports his homework habits?"
    ],
  },
  she: {
    openers: [
      "I'd like to share an update about {NAME}. She has been finding it hard to stay focused during lessons.",
      "I'd like to share an update about {NAME}. Over the past week she has been arriving late to class, and some homework has been incomplete."
    ],
    closers: [
      "Please let me know a good time for us to discuss next steps together.",
      "Could we agree a quick plan that fits your morning routine and supports her homework habits?"
    ],
  },
  they: {
    openers: [
      "I'd like to share an update about {NAME}. They have been finding it hard to stay focused during lessons.",
      "I'd like to share an update about {NAME}. Over the past week they have been arriving late to class, and some homework has been incomplete."
    ],
    closers: [
      "Please let me know a good time for us to discuss next steps together.",
      "Could we agree a quick plan that fits your morning routine and supports their homework habits?"
    ],
  },
};

/**
 * Picker (exact match only) - eliminates paraphrasing drift
 */
export function pickOpenerCloser(p: Pronoun, name: string, concernType: 'focus' | 'attendance' = 'focus') {
  const t = KB[p];
  const openerIndex = concernType === 'attendance' ? 1 : 0;
  const opener = t.openers[openerIndex].replace("{NAME}", name);
  const closer = t.closers[0];
  return { opener, closer };
}