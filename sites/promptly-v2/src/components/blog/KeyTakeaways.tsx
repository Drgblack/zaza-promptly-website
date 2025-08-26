interface KeyTakeaway {
  title: string
  description: string
}

interface KeyTakeawaysProps {
  takeaways: KeyTakeaway[]
  className?: string
}

export default function KeyTakeaways({ takeaways, className = '' }: KeyTakeawaysProps) {
  return (
    <div className={`bg-slate-800/40 border border-brand-500/30 rounded-2xl p-6 my-8 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0 text-brand-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-white text-lg">
          Key Takeaways
        </h3>
      </div>
      
      <div className="space-y-4">
        {takeaways.map((takeaway, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-sm font-medium flex items-center justify-center mt-0.5">
              {index + 1}
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">
                {takeaway.title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {takeaway.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Quick summary component for article overview
interface QuickSummaryProps {
  title?: string
  points: string[]
  readTime: string
  className?: string
}

export function QuickSummary({ 
  title = "📚 Quick Summary", 
  points, 
  readTime,
  className = '' 
}: QuickSummaryProps) {
  return (
    <div className={`bg-blue-900/20 border border-blue-400/30 rounded-2xl p-6 my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-lg">
          {title}
        </h3>
        <span className="text-blue-400 text-sm font-medium">
          {readTime}
        </span>
      </div>
      
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 text-blue-400 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-slate-300 text-sm leading-relaxed">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}