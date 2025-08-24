export type TimelineItem = { period?: string; title: string; blurb: string };

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <section aria-labelledby="journey" className="py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="journey" className="text-2xl font-semibold">The Journey</h2>
        <ol className="mt-6 space-y-6">
          {items.map((it, i) => (
            <li key={i} className="rounded-lg border p-5">
              <div className="text-sm opacity-70">{it.period}</div>
              <h3 className="mt-1 font-medium">{it.title}</h3>
              <p className="mt-2">{it.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}