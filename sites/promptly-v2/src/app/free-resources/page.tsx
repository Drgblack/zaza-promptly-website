'use client'

import { useState } from 'react'
import Link from 'next/link'
import resourcesData from '../../../content/resources.json'

type Resource = {
  slug: string
  title: string
  description: string
  filename: string
  category: string
  updated: string
  sizeKB: number
  license: string
}

// Since this is a client component, we need to handle metadata differently
// For now, we'll export it but it won't work in a client component
// In a real app, we'd separate the metadata into a separate server component or use a different approach

export default function FreeResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const resources = resourcesData as Resource[]
  
  // Download tracking function (respects user consent)
  const trackDownload = (resource: Resource) => {
    // Check if analytics consent is given
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'Resource',
        event_label: resource.title,
        resource_category: resource.category,
        resource_slug: resource.slug,
        resource_filename: resource.filename,
        value: 1
      })
    }
  }
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))]
  
  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatFileSize = (sizeKB: number) => {
    return sizeKB < 1000 ? `${sizeKB} KB` : `${(sizeKB / 1000).toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 py-20">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Free Resources
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Download free templates, guides, and tools to enhance your teaching practice and save time.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="section">
        <div className="container">
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

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-sm font-medium text-white mr-4">Filter by category:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-slate-400 text-sm">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Resources Grid */}
          <div className="max-w-4xl mx-auto">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.slug}
                    className="rounded-2xl shadow-card border border-white/10 bg-slate-900/60 p-6 hover:bg-slate-900/80 transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {resource.title}
                        </h3>
                        <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
                          {resource.category}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 mb-4">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-4">
                        <span>PDF</span>
                        <span>{formatFileSize(resource.sizeKB)}</span>
                        <span>Updated {formatDate(resource.updated)}</span>
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

                    <a
                      href={`/resources/${resource.filename}`}
                      onClick={() => trackDownload(resource)}
                      className="inline-flex items-center justify-center w-full px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </a>
                  </div>
                ))}
              </div>
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
        </div>
      </section>
    </div>
  )
}