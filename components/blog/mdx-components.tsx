"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb, 
  Quote,
  ExternalLink,
  Download,
  Copy,
  GraduationCap,
  Sparkles,
  Play,
  BookOpen
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

// Callout component for important information
export function Callout({ 
  type = 'info', 
  title, 
  children 
}: { 
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip'
  title?: string
  children: React.ReactNode 
}) {
  const styles = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
      title: 'text-blue-900',
      text: 'text-blue-800'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
      title: 'text-yellow-900',
      text: 'text-yellow-800'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: 'text-green-900',
      text: 'text-green-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: <AlertCircle className="w-5 h-5 text-red-600" />,
      title: 'text-red-900',
      text: 'text-red-800'
    },
    tip: {
      bg: 'bg-purple-50 border-purple-200',
      icon: <Lightbulb className="w-5 h-5 text-purple-600" />,
      title: 'text-purple-900',
      text: 'text-purple-800'
    }
  }

  const style = styles[type]

  return (
    <div className={`border-l-4 ${style.bg} p-4 rounded-r-lg my-6`}>
      <div className="flex items-start space-x-3">
        {style.icon}
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-2 ${style.title}`}>
              {title}
            </h4>
          )}
          <div className={style.text}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

// Prompt box for displaying AI prompts
export function PromptBox({ 
  title, 
  prompt, 
  variables,
  category = 'General' 
}: { 
  title: string
  prompt: string
  variables?: string[]
  category?: string
}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card className="my-6 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{title}</h3>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs">
                {category}
              </Badge>
            </div>
          </div>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg border border-purple-200 mb-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
            {prompt}
          </pre>
        </div>

        {variables && variables.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">Variables to customize:</h4>
            <div className="flex flex-wrap gap-2">
              {variables.map((variable, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {variable}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Quote component for testimonials or important quotes
export function BlockQuote({ 
  children, 
  author, 
  role, 
  source 
}: { 
  children: React.ReactNode
  author?: string
  role?: string
  source?: string
}) {
  return (
    <div className="my-8 bg-gray-50 border-l-4 border-gray-300 p-6 rounded-r-lg relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-300" />
      <blockquote className="text-lg text-gray-700 italic mb-4">
        {children}
      </blockquote>
      {(author || source) && (
        <footer className="text-sm text-gray-600">
          {author && <span className="font-semibold">{author}</span>}
          {role && <span className="ml-2 text-gray-500">{role}</span>}
          {source && <span className="ml-2"> -  {source}</span>}
        </footer>
      )}
    </div>
  )
}

// CTA component for promoting Zaza products
export function ZazaCTA({ 
  type = 'teach',
  title,
  description,
  buttonText,
  variant = 'default'
}: {
  type?: 'teach' | 'promptly' | 'ecosystem'
  title?: string
  description?: string
  buttonText?: string
  variant?: 'default' | 'compact'
}) {
  const config = {
    teach: {
      title: title || 'Ready for Complete Lesson Planning?',
      description: description || 'Take your teaching to the next level with AI-powered lesson planning, standards alignment, and progress tracking.',
      buttonText: buttonText || 'Try Zaza Teach Free',
      url: 'https://zazateach.com',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'blue'
    },
    promptly: {
      title: title || 'Get More Free Teaching Resources',
      description: description || 'Access our complete library of AI prompts, templates, and teaching guides.',
      buttonText: buttonText || 'Explore Free Resources',
      url: '/free-resources',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'purple'
    },
    ecosystem: {
      title: title || 'Discover All Zaza Tools',
      description: description || 'From free resources to complete automation - find the perfect tools for your teaching needs.',
      buttonText: buttonText || 'Explore Ecosystem',
      url: '/zaza-ecosystem',
      icon: <BookOpen className="w-5 h-5" />,
      color: 'green'
    }
  }

  const cta = config[type]
  const colorClasses = {
    blue: 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 bg-blue-600 hover:bg-blue-700',
    purple: 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-600 bg-purple-600 hover:bg-purple-700',
    green: 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 text-green-600 bg-green-600 hover:bg-green-700'
  }

  if (variant === 'compact') {
    return (
      <div className={`border-l-4 ${colorClasses[cta.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[cta.color as keyof typeof colorClasses].split(' ')[1]} p-4 rounded-r-lg my-6`}>
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-white rounded-lg ${colorClasses[cta.color as keyof typeof colorClasses].split(' ')[4]}`}>
            {cta.icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{cta.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{cta.description}</p>
            <Button
              size="sm"
              onClick={() => {
                if ((window as any).zazeAnalytics) {
                  (window as any).zazeAnalytics.trackCrossAppCTA(type, 'blog_mdx_cta', 'clicked')
                }
                if (cta.url.startsWith('http')) {
                  window.open(cta.url, '_blank')
                } else {
                  window.location.href = cta.url
                }
              }}
              className={`${colorClasses[cta.color as keyof typeof colorClasses].split(' ').slice(-2).join(' ')} text-white`}
            >
              {cta.icon}
              <span className="ml-2">{cta.buttonText}</span>
              {cta.url.startsWith('http') && <ExternalLink className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className={`my-8 ${colorClasses[cta.color as keyof typeof colorClasses].split(' ').slice(0, 2).join(' ')}`}>
      <CardContent className="p-8">
        <div className="text-center">
          <div className={`mx-auto w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
            <div className={colorClasses[cta.color as keyof typeof colorClasses].split(' ')[4]}>
              {cta.icon}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {cta.title}
          </h3>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {cta.description}
          </p>
          
          <Button
            size="lg"
            onClick={() => {
              if ((window as any).zazeAnalytics) {
                (window as any).zazeAnalytics.trackCrossAppCTA(type, 'blog_mdx_cta', 'clicked')
              }
              if (cta.url.startsWith('http')) {
                window.open(cta.url, '_blank')
              } else {
                window.location.href = cta.url
              }
            }}
            className={`${colorClasses[cta.color as keyof typeof colorClasses].split(' ').slice(-2).join(' ')} text-white px-8 py-3`}
          >
            {cta.icon}
            <span className="ml-2">{cta.buttonText}</span>
            {cta.url.startsWith('http') && <ExternalLink className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Resource download component
export function ResourceDownload({ 
  title, 
  description, 
  filename,
  downloadUrl,
  fileType = 'PDF',
  fileSize
}: {
  title: string
  description: string
  filename: string
  downloadUrl: string
  fileType?: string
  fileSize?: string
}) {
  const handleDownload = () => {
    if ((window as any).zazeAnalytics) {
      (window as any).zazeAnalytics.trackResourceDownload(filename, 'blog_post');
    }
    window.open(downloadUrl, '_blank');
  }

  return (
    <Card className="my-6 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{fileType}</span>
                {fileSize && <span>{fileSize}</span>}
              </div>
              
              <Button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download {fileType}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Video embed component
export function VideoEmbed({ 
  title, 
  videoId, 
  platform = 'youtube',
  description 
}: {
  title: string
  videoId: string
  platform?: 'youtube' | 'vimeo'
  description?: string
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  const embedUrls = {
    youtube: `https://www.youtube.com/embed/${videoId}`,
    vimeo: `https://player.vimeo.com/video/${videoId}`
  }

  const thumbnailUrls = {
    youtube: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    vimeo: '' // Vimeo thumbnails require API call
  }

  return (
    <Card className="my-8">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {!isPlaying ? (
            <div 
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setIsPlaying(true)}
            >
              {platform === 'youtube' && (
                <img 
                  src={thumbnailUrls[platform]} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-colors">
                <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-colors">
                  <Play className="w-8 h-8 text-gray-800 ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={embedUrls[platform]}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        
        {(title || description) && (
          <div className="p-6">
            {title && <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>}
            {description && <p className="text-gray-600 text-sm">{description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Table of contents component
export function TableOfContents({ 
  headings 
}: { 
  headings: Array<{ id: string; text: string; level: number }> 
}) {
  return (
    <Card className="my-6 bg-gray-50">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Table of Contents
        </h3>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                className={`block text-sm hover:text-purple-600 transition-colors ${
                  heading.level === 2 ? 'font-medium' : 
                  heading.level === 3 ? 'ml-4 text-gray-600' : 
                  'ml-8 text-gray-500'
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

// Export all components for MDX
export const mdxComponents = {
  Callout,
  PromptBox,
  BlockQuote,
  ZazaCTA,
  ResourceDownload,
  VideoEmbed,
  TableOfContents,
  // Override default elements
  blockquote: BlockQuote,
  // Add custom styling to default elements
  h1: (props: any) => <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8 pb-2 border-b border-gray-200" {...props} />,
  h2: (props: any) => <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6" {...props} />,
  h3: (props: any) => <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4" {...props} />,
  h4: (props: any) => <h5 className="text-lg font-semibold text-gray-900 mb-2 mt-3" {...props} />,
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  a: (props: any) => <a className="text-purple-600 hover:text-purple-700 underline" {...props} />,
  code: (props: any) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props} />,
  pre: (props: any) => <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto text-sm mb-4" {...props} />
}