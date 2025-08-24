export type TimelineItem = { period?: string; title: string; blurb: string };

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <section aria-labelledby="journey" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="journey" className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">The Journey</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From apprentice to educator technology entrepreneur
          </p>
        </div>
        <div className="mt-12 relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-600" aria-hidden="true"></div>
          <ol className="space-y-8">
            {items.map((it, i) => (
              <li key={i} className="relative flex items-start pl-20">
                <div className="absolute left-6 flex h-4 w-4 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-gray-900"></div>
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-6 shadow-lg">
                  {it.period && (
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{it.period}</div>
                  )}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{it.title}</h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">{it.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}