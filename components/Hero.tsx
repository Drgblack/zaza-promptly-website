import { OptimizedImage } from "@/components/optimized-image"
import { headingXl } from "../../shared-components/styles/ui"

export default function Hero() {
  return (
    <section className="bg-[#f6f8fb] py-16 text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className={`${headingXl} sm:text-5xl`}>
          Write student comments that sound like you – <span className="text-[#6C63FF]">without the Sunday night stress.</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Zaza Promptly helps you generate professional, personal, and curriculum-aligned student comments in seconds.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#pricing" className="bg-[#6C63FF] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#574fcf] transition">
            Try it Free
          </a>
          <a href="#how" className="text-[#6C63FF] underline font-semibold mt-3 sm:mt-0">
            How it works
          </a>
        </div>
        <OptimizedImage src="/phone-mockup.png" alt="App preview" className="mx-auto mt-10 w-64 sm:w-80" width={320} height={320} priority={true} />
      </div>
    </section>
  )
}
