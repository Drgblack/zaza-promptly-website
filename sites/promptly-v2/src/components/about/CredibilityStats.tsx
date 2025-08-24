export type Stat = { value: string; label: string; sublabel?: string };

export default function CredibilityStats({ items }: { items: Stat[] }) {
  return (
    <section aria-labelledby="credibility" className="py-8">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="credibility" className="sr-only">Credibility</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((s, i) => (
            <li key={i} className="rounded-lg border p-6 text-center">
              <div className="text-3xl font-semibold">{s.value}</div>
              <div className="mt-1">{s.label}</div>
              {s.sublabel && <div className="text-sm opacity-70">{s.sublabel}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}