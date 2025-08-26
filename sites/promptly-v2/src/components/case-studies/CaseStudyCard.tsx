import Link from "next/link";
import Image from "next/image";

type Props = {
  href: string;
  kicker?: string;
  title: string;
  excerpt: string;
  cover?: string;
  heroAlt?: string;
  author: string;
  org?: string;
  date: string; // already humanized upstream or pass ISO + format here
};

export default function CaseStudyCard({
  href, kicker, title, excerpt, cover, heroAlt, author, org, date
}: Props) {
  return (
    <li className="group relative h-full">
      <Link
        href={href}
        className={[
          // base container
          "flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40",
          "shadow-sm hover:shadow-md transition-shadow",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60",
        ].join(" ")}
        aria-label={`${title} — read the case study`}
      >
        {/* Media */}
        <div className="relative w-full overflow-hidden rounded-t-2xl">
          {/* fixed aspect for tidy rows */}
          <div className="aspect-[16/9] w-full">
            {cover ? (
              <Image
                src={cover}
                alt={heroAlt || title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={false}
              />
            ) : (
              <div className="h-full w-full bg-slate-800/60" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-4">
          {kicker && (
            <span className="inline-flex w-fit rounded-full border border-white/10 bg-slate-800/60 px-2 py-0.5 text-[11px] font-medium text-slate-200">
              {kicker}
            </span>
          )}

          <h3 className="text-base/6 font-semibold text-white line-clamp-2">
            {title}
          </h3>

          <p className="text-sm/6 text-slate-300 line-clamp-3">
            {excerpt}
          </p>

          {/* meta pinned to bottom */}
          <div className="mt-auto flex items-center justify-between pt-3 text-xs text-slate-300">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate">{author}</span>
              {org && <span className="hidden sm:inline text-slate-400">· {org}</span>}
            </div>
            <time className="shrink-0 text-slate-400">{date}</time>
          </div>
        </div>

        {/* subtle arrow affordance */}
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/40 px-2 py-1 text-[11px] text-slate-200 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          Read →
        </div>
      </Link>
    </li>
  );
}