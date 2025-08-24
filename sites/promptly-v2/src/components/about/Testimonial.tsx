export default function Testimonial({
  quote,
  author,
  role,
}: { quote: string; author: string; role?: string }) {
  return (
    <section aria-labelledby="teacher-quote" className="py-10">
      <div className="mx-auto max-w-3xl px-4">
        <figure className="rounded-lg border p-6">
          <blockquote className="text-lg italic">"{quote}"</blockquote>
          <figcaption className="mt-3 text-sm">
            — {author}{role ? `, ${role}` : ''}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}