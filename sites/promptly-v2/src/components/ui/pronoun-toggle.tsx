import * as React from "react";
import { Label } from "@/components/ui/label";

export type PronounOption = "auto" | "he" | "she" | "they";

type Props = {
  value: PronounOption;
  onChange: (v: PronounOption) => void;
  className?: string;
};

export function PronounToggle({ value, onChange, className }: Props) {
  return (
    <div className={`flex items-center justify-end gap-3 text-sm text-muted-foreground ${className}`}>
      <span className="whitespace-nowrap select-none">Pronouns:</span>
      <div className="flex items-center gap-3" role="radiogroup" aria-label="Pronoun preference">
        {(['auto', 'he', 'she', 'they'] as const).map((option) => (
          <Label
            key={option}
            className="flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors"
          >
            <input
              type="radio"
              name="pronouns"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="w-3 h-3 text-primary focus:ring-2 focus:ring-primary/60 focus:ring-offset-1"
            />
            <span className="capitalize">{option}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}