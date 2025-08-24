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
    <section aria-labelledby="cta" className="py-16 sm:py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 id="cta" className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto leading-8">{subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={primary.href}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-indigo-600 bg-white hover:bg-gray-50 rounded-lg shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white transition-colors duration-200"
          >
            {primary.label}
          </a>
          <a 
            href={secondary.href}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-transparent hover:bg-white/10 rounded-lg ring-2 ring-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white transition-colors duration-200"
          >
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}