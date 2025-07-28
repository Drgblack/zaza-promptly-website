"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Layout } from "@zaza/shared-components"

export default function FeatureRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    app: "",
    title: "",
    description: "",
    importance: "",
    file: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 500)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  if (isSubmitted) {
    return (
      <Layout currentProduct="Feature Request">
        {/* Success Message */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="#"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Support Page
          </Link>

          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="pt-12 pb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Thanks for helping shape the future of Zaza!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                We review every request and love hearing your ideas.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-6 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout currentProduct="Feature Request">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          href="#"
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Support Page
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Got a Feature Idea?</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're building Zaza with educators in mind. Tell us what would make your experience even better.
          </p>
        </div>

        {/* Feature Request Form */}
        <Card className="shadow-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">Share Your Idea</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                  Your Name <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">We'll only use this to follow up if needed.</p>
              </div>

              {/* App Selection */}
              <div className="space-y-2">
                <Label htmlFor="app" className="text-gray-700 dark:text-gray-300">
                  Which Zaza app?
                </Label>
                <Select value={formData.app} onValueChange={(value) => handleInputChange("app", value)}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 transition-colors">
                    <SelectValue placeholder="Select an app" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectItem
                      value="inbox"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza Inbox
                    </SelectItem>
                    <SelectItem
                      value="promptly"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza Promptly
                    </SelectItem>
                    <SelectItem
                      value="teach"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza Teach
                    </SelectItem>
                    <SelectItem
                      value="visuals"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza Visuals
                    </SelectItem>
                    <SelectItem
                      value="claritydeck"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza ClarityDeck
                    </SelectItem>
                    <SelectItem
                      value="schwoop"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Zaza Schwoop
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Feature Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                  Feature Title
                </Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Give your feature idea a name"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Feature Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                  Feature Description
                </Label>
                <Textarea
                  id="description"
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell us what you'd love to see and how it would help."
                  rows={4}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                />
              </div>

              {/* Importance */}
              <div className="space-y-2">
                <Label htmlFor="importance" className="text-gray-700 dark:text-gray-300">
                  Why is this feature important to you?{" "}
                  <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                </Label>
                <Textarea
                  id="importance"
                  value={formData.importance}
                  onChange={(e) => handleInputChange("importance", e.target.value)}
                  placeholder="Help us understand the impact this would have on your work..."
                  rows={3}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 transition-colors"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">
                  Upload Screenshot or Image <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                </Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors bg-white dark:bg-gray-700">
                  <input id="file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="file" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {formData.file ? formData.file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-medium transition-colors"
                size="lg"
              >
                Send Feature Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
