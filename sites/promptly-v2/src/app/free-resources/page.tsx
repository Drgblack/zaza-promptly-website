'use client'

import { useState } from 'react'
import Link from 'next/link'
import resourcesData from '../../../public/resources/resources.json'
import { trackResourceOpen, trackResourceDownload } from '@/utils/resourceAnalytics'
import ScrollReveal from '@/components/animations/ScrollReveal'

type Resource = {
  filename: string
  title: string
  description: string
  filesize: number
  lastUpdated: string
  format: string
  preview: string
  license: string
}

// Since this is a client component, we need to handle metadata differently
// For now, we'll export it but it won't work in a client component
// In a real app, we'd separate the metadata into a separate server component or use a different approach

export default function FreeResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const resources = resourcesData as Resource[]
  
  // Resource interaction handlers (consent-aware)
  const handleResourceOpen = (resource: Resource) => {
    trackResourceOpen(resource)
  }
  
  const handleResourceDownload = (resource: Resource) => {
    trackResourceDownload(resource)
  }
  
  // Get unique formats for filtering
  const formats = ['All', ...Array.from(new Set(resources.map(r => r.format)))]
  
  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFormat = selectedCategory === 'All' || resource.format === selectedCategory
    return matchesSearch && matchesFormat
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    return `${Math.round(bytes / (1024 * 1024))} MB`
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <ScrollReveal duration={0.22}>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Free Resources
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Download free templates, guides, and tools to enhance your teaching practice and save time.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="section">
        <div className="container">
          <ScrollReveal duration={0.24} delay={0.1}>
            <div className="max-w-4xl mx-auto mb-8">
              {/* Search */}
              <div className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-white mb-2">
                  Search Resources
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title or description..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>

              {/* Format Pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-sm font-medium text-white mr-4">Filter by format:</span>
                {formats.map((format) => (
                  <button
                    key={format}
                    onClick={() => setSelectedCategory(format)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === format
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-slate-400 text-sm">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Resources Grid */}
          <div className="max-w-4xl mx-auto">
            {filteredResources.length > 0 ? (
              <ScrollReveal duration={0.26} delay={0.15}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.filename}
                    className="group rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.01] hover:border-brand-500/30 transition-all duration-[120ms] ease-out"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {resource.title}
                        </h3>
                        <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                          {resource.format}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-4">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span>{resource.format}</span>
                        <span>{formatFileSize(resource.filesize)}</span>
                        <span>Updated {formatDate(resource.lastUpdated)}</span>
                      </div>
                    </div>

                    {/* License Information */}
                    <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs font-medium text-amber-400 mb-1">Usage License</p>
                          <p className="text-xs text-slate-400">{resource.license}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {resource.format === 'PDF' ? (
                        <a
                          href={`/resources/${resource.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleResourceOpen(resource)}
                          aria-label={`Open ${resource.title} (${resource.format}) in new tab`}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-brand-600 text-brand-400 hover:bg-brand-600/10 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-opacity-50"
                        >
                          <svg className="mr-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-[120ms] ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Open
                          <span className="sr-only">Opens in a new tab</span>
                        </a>
                      ) : null}
                      <a
                        href={`/resources/${resource.filename}`}
                        download
                        onClick={() => handleResourceDownload(resource)}
                        aria-label={`Download ${resource.title} (${resource.format})`}
                        className={`${resource.format === 'PDF' ? 'flex-1' : 'w-full'} inline-flex items-center justify-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-opacity-50`}
                      >
                        <svg className="mr-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-[120ms] ease-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download
                      </a>
                    </div>
                  </div>
                ))}
                </div>
              </ScrollReveal>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No resources found</h3>
                <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 py-16">
        <div className="container text-center">
          <ScrollReveal duration={0.24} delay={0.1}>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Need More Support?
            </h2>
            <p className="text-slate-300 mb-6">
              Explore our Learning Centre for expert insights and visit our blog for the latest tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/learning-centre"
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors"
              >
                Visit Learning Centre
              </Link>
              <Link 
                href="/blog"
                className="px-6 py-3 border border-brand-600 text-brand-400 hover:bg-brand-600/10 font-semibold rounded-lg transition-colors"
              >
                Read Blog
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
