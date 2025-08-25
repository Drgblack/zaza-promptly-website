import React from 'react'

interface GlossaryItem {
  term: string
  definition: string
  id?: string
}

interface GlossaryProps {
  title: string
  items: GlossaryItem[]
  className?: string
}

export default function Glossary({ title, items, className = '' }: GlossaryProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 text-center">
            {title}
          </h2>
          <p className="text-slate-400 text-center mb-12">
            Understanding AI terminology for teachers - explained in plain language
          </p>
          
          <dl className="grid md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div key={item.id || index} className="bg-slate-800/30 rounded-lg p-6 border border-slate-700/20">
                <dt className="text-lg font-semibold text-brand-400 mb-3">
                  {item.term}
                </dt>
                <dd className="text-slate-300 leading-relaxed text-sm">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}