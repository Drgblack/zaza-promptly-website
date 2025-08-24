export default function Testimonial({
  quote,
  author,
  role,
}: { quote: string; author: string; role?: string }) {
  return (
    <section aria-labelledby="teacher-quote" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="m9.352 4c-1.439 0-2.681.775-3.477 1.864-.786 1.077-.99 2.486-.414 3.895l.818 2c.579 1.415.929 2.306.929 3.428 0 .949-.357 1.773-.903 2.285-.546.512-1.279.774-2.305.774v4c2.868 0 4.786-.978 6.04-2.649 1.255-1.672 1.62-3.956.96-6.314l-.818-2c-.579-1.415-.929-2.306-.929-3.428 0-.949.357-1.773.903-2.285.546-.512 1.279-.774 2.305-.774v-4c-2.868 0-4.786.978-6.04 2.649-1.255 1.672-1.62 3.956-.96 6.314l.818 2c.579 1.415.929 2.306.929 3.428 0 .949-.357 1.773-.903 2.285-.546.512-1.279.774-2.305.774z" />
            <path d="m22.352 4c-1.439 0-2.681.775-3.477 1.864-.786 1.077-.99 2.486-.414 3.895l.818 2c.579 1.415.929 2.306.929 3.428 0 .949-.357 1.773-.903 2.285-.546.512-1.279.774-2.305.774v4c2.868 0 4.786-.978 6.04-2.649 1.255-1.672 1.62-3.956.96-6.314l-.818-2c-.579-1.415-.929-2.306-.929-3.428 0-.949.357-1.773.903-2.285.546-.512 1.279-.774 2.305-.774v-4c-2.868 0-4.786.978-6.04 2.649-1.255 1.672-1.62 3.956-.96 6.314l.818 2c.579 1.415.929 2.306.929 3.428 0 .949-.357 1.773-.903 2.285-.546.512-1.279.774-2.305.774z" />
          </svg>
        </div>
        <figure className="mt-8 rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur p-8 sm:p-12 shadow-2xl">
          <blockquote className="text-xl sm:text-2xl font-medium leading-8 text-gray-900 dark:text-white text-center italic">
            "{quote}"
          </blockquote>
          <figcaption className="mt-6 text-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{author}</div>
            {role && <div className="text-sm text-gray-600 dark:text-gray-400">{role}</div>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}