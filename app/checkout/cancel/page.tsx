"use client";

import { ArrowLeft, AlertCircle, Mail, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Cancel Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            No Worries! 😊
          </h1>
          <p className="text-xl text-gray-600">
            Your payment was cancelled. Your AI teaching journey is still waiting for you!
          </p>
        </div>

        {/* Reassurance Message */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">We're Here to Help</CardTitle>
            <CardDescription className="text-center">
              Sometimes checkout doesn't go as planned. That's totally fine!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                No charges were made to your account. You can try again anytime, 
                or reach out if you need assistance.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-center text-blue-800 mb-2">
                  <Zap className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Limited Time Offer Still Available!</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Join thousands of teachers already saving 5+ hours per week with AI-powered feedback.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Issues & Solutions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Need Help? Common Solutions:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Payment Method Issues</h3>
                  <p className="text-gray-600 text-sm">
                    Try a different card, or contact your bank if the payment was declined.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Have Questions?</h3>
                  <p className="text-gray-600 text-sm">
                    Our team is standing by to help you get started with AI teaching tools.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Want to Try Free?</h3>
                  <p className="text-gray-600 text-sm">
                    Check out our free resources and demo before subscribing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/promptly-pricing">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Try Again
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/free-resources">
              <Zap className="w-5 h-5 mr-2" />
              Free Resources
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg">
            <Link href="/support">
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Help
            </Link>
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Still need help? We're here for you!
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a 
              href="mailto:support@zazapromptly.com" 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Mail className="w-4 h-4 mr-1" />
              Email Support
            </a>
            <Link 
              href="/contact" 
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Live Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}