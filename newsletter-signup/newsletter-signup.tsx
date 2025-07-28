import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Github, Shield } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm transition-colors duration-200">
            <CardHeader className="text-center space-y-4 pb-6">
              {/* Logo/Brand Mark */}
              <div className="mx-auto w-16 h-16 rounded-2xl overflow-hidden">
                <img src="/images/zaza-logo.png" alt="Zaza Technologies Logo" className="w-full h-full object-cover" />
              </div>

              {/* Brand Name */}
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                  Zaza Technologies
                </h1>
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
              </div>

              {/* Headline and Subheading */}
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">
                  Subscribe to Our Newsletter
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                  Get the latest insights, tips, and exclusive content delivered straight to your inbox. Join thousands
                  of subscribers.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Sign-up Options */}
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent transition-colors duration-200"
                  >
                    <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="sr-only">Continue with Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent transition-colors duration-200"
                  >
                    <Twitter className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                    <span className="sr-only">Continue with Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 text-gray-900 dark:text-gray-100" />
                    <span className="sr-only">Continue with GitHub</span>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full dark:bg-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400 font-medium transition-colors duration-200">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Form */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200"
                  >
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-11 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 transition-colors duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Subscribe Now
                </Button>
              </form>

              {/* Additional Links */}
              <div className="flex justify-center space-x-4 text-xs">
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </a>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Help
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 transition-colors duration-200">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>We respect your privacy and never share your data</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
