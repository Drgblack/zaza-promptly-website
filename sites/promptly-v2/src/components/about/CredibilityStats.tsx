export type Stat = { value: string; label: string; sublabel?: string };

export default function CredibilityStats({ items }: { items: Stat[] }) {
  return (
    <section aria-labelledby="credibility" className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="credibility" className="sr-only">Credibility Statistics</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((s, i) => (
            <li key={i} className="rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-indigo-600 dark:text-indigo-400">{s.value}</div>
              <div className="mt-3 text-lg font-medium text-gray-900 dark:text-white">{s.label}</div>
              {s.sublabel && <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{s.sublabel}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}