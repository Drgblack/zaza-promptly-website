export default function ActionBand({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: string;
  subtitle: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
}) {
  return (
    <section aria-labelledby="cta" className="py-12">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 id="cta" className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2">{subtitle}</p>
        <div className="mt-6 flex justify-center gap-3">
          <a className="inline-flex px-4 py-2 rounded-md border" href={primary.href}>
            {primary.label}
          </a>
          <a className="inline-flex px-4 py-2 rounded-md border" href={secondary.href}>
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}