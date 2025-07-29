'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ShareTrigger, shareUtils } from './ShareTrigger'
import { Wand2, Mail, FileText, Layout, Clock } from 'lucide-react'

// Example component showing how to integrate the share modal
export function ExampleIntegration() {
  const [comment, setComment] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')

  // Mock user data - in real app, get from auth context
  const userEmail = 'teacher@school.edu'
  const userName = 'Sarah Chen'

  const handleGenerateComment = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockComment = `Dear Parent,

I wanted to reach out regarding your child's progress in class. They have been showing great enthusiasm for our current science unit and consistently participates in group discussions.

I've noticed they work particularly well when given hands-on activities and visual aids. To support their continued growth, I recommend encouraging them to ask questions when concepts aren't clear.

Please feel free to reach out if you'd like to discuss their progress further.

Best regards,
${userName}`

    setGeneratedContent(mockComment)
    setIsGenerating(false)
    
    // Trigger the share modal after successful generation
    shareUtils.onAICommentSuccess(userEmail, userName, 12)
  }

  const handleGenerateEmail = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setGeneratedContent('Professional email template generated!')
    setIsGenerating(false)
    
    // Trigger share modal for email
    shareUtils.onEmailSuccess(userEmail, userName, 8)
  }

  const handleCompleteReport = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setGeneratedContent('Report card comments completed!')
    setIsGenerating(false)
    
    // Trigger share modal for report
    shareUtils.onReportSuccess(userEmail, userName, 90)
  }

  const handleUseTemplate = async () => {
    setGeneratedContent('Template applied successfully!')
    
    // Trigger share modal for template
    shareUtils.onTemplateSuccess(userEmail, userName, 5)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Share Modal Integration Example
        </h2>
        <p className="text-gray-600">
          Try the actions below to see the post-success share modal
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Comment Generation */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Wand2 className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">AI Comment Generator</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe the student's situation..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <Button
              onClick={handleGenerateComment}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Comment
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Email Template */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Email Generator</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Generate professional parent communication emails
            </p>
            <Button
              onClick={handleGenerateEmail}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Generate Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Report Generator */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Report Card Comments</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Complete all report card comments at once
            </p>
            <Button
              onClick={handleCompleteReport}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Complete Reports
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Template Usage */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Layout className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold">Template Library</h3>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Apply professional email templates
            </p>
            <Button
              onClick={handleUseTemplate}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Layout className="w-4 h-4 mr-2" />
              Use Template
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Content Display */}
      {generatedContent && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold">Generated Content</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {generatedContent}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Share Trigger Component - This handles the modal */}
      <ShareTrigger 
        userEmail={userEmail}
        userName={userName}
      />
    </div>
  )
}

// Usage instructions component
export function ShareIntegrationInstructions() {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-bold">Integration Instructions</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">1. Add ShareTrigger to your app</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { ShareTrigger } from '@/components/social/ShareTrigger'

function App() {
  return (
    <div>
      {/* Your app content */}
      <ShareTrigger userEmail="user@example.com" userName="User Name" />
    </div>
  )
}`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">2. Trigger share modal after successful actions</h3>
          <div className="bg-gray-100 rounded p-3 text-sm font-mono">
            {`import { shareUtils } from '@/components/social/ShareTrigger'

// After AI comment generation
shareUtils.onAICommentSuccess(userEmail, userName, timeSavedInMinutes)

// After email generation  
shareUtils.onEmailSuccess(userEmail, userName, timeSavedInMinutes)

// After report completion
shareUtils.onReportSuccess(userEmail, userName, timeSavedInMinutes)

// After template usage
shareUtils.onTemplateSuccess(userEmail, userName, timeSavedInMinutes)`}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">3. Modal appears intelligently</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Shows on 2nd success (builds trust first)</li>
            <li>Shows on 5th success (when user is engaged)</li>
            <li>Shows every 10th success thereafter (not annoying)</li>
            <li>Includes referral links automatically</li>
            <li>Tracks all interactions for analytics</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}