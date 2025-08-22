import Link from 'next/link'
import Image from 'next/image'
import { CaseStudy } from '@/lib/case-studies'
import { cn } from '@/lib/utils'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  className?: string
}

export default function CaseStudyCard({ caseStudy, className }: CaseStudyCardProps) {
  const { slug, metadata } = caseStudy

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Link 
      href={`/case-studies/${slug}`}
      className={cn(
        'group block rounded-2xl shadow-card border border-white/10 bg-slate-900/60 hover:bg-slate-900/80 transition-all duration-200 overflow-hidden',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900',
        className
      )}
    >
      {/* Image */}
      <div className="aspect-video bg-slate-800 relative overflow-hidden">
        {metadata.image ? (
          <Image
            src={metadata.image}
            alt={metadata.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-600/20 to-brand-800/20 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="text-sm font-medium">Case Study</div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Case Study Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-2.5 py-1 bg-brand-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            Case Study
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-300 transition-colors line-clamp-2">
          {metadata.title}
        </h3>
        
        <p className="text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {metadata.description}
        </p>
        
        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {metadata.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-medium text-white text-sm">
                {metadata.author}
              </div>
              <div className="text-slate-500 text-xs">
                {metadata.role}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-slate-500 text-xs">
              {metadata.school}
            </div>
            <div className="text-slate-600 text-xs mt-1">
              {formatDate(metadata.date)}
            </div>
          </div>
        </div>
        
        {/* Read More */}
        <div className="flex items-center text-brand-400 text-sm font-medium mt-4 group-hover:text-brand-300 transition-colors">
          Read full case study
          <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}