export type Principle = { title: string; body: string };

export default function TrustPrinciples({ items }: { items: Principle[] }) {
  return (
    <section aria-labelledby="trust" className="py-10">
      <div className="mx-auto max-w-5xl px-4">
        <h2 id="trust" className="text-2xl font-semibold">Trust & Safety</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((p, i) => (
            <article key={i} className="rounded-lg border p-5">
              <h3 className="font-medium">{p.title}</h3>
              <p className="mt-2">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}