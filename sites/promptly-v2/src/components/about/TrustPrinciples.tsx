export type Principle = { title: string; body: string };

export default function TrustPrinciples({ items }: { items: Principle[] }) {
  return (
    <section aria-labelledby="trust" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 id="trust" className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100 dark:text-white">Trust & Safety</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our commitment to creating safe, reliable tools for educators
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((p, i) => (
            <article key={i} className="rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-slate-100 dark:text-white">{p.title}</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}