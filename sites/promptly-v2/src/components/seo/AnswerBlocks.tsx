import React from 'react'

interface QAItem {
  question: string
  answer: string
  id?: string
}

interface AnswerBlocksProps {
  title: string
  items: QAItem[]
  className?: string
}

export default function AnswerBlocks({ title, items, className = '' }: AnswerBlocksProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-12 text-center">
            {title}
          </h2>
          
          <dl className="space-y-8">
            {items.map((item, index) => (
              <div key={item.id || index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
                <dt className="text-lg font-semibold text-white mb-3 flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-600 text-white text-sm font-medium rounded-full mr-3 mt-0.5 flex-shrink-0">
                    Q
                  </span>
                  {item.question}
                </dt>
                <dd className="text-slate-300 leading-relaxed ml-9">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}