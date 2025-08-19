'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Play } from 'lucide-react'

export default function ClientVideoEmbed({ 
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