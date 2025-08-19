'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Copy, Sparkles } from 'lucide-react'

export default function ClientPromptBox({ 
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