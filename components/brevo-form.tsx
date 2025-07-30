"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Mail, Loader2 } from "lucide-react";
import { EmailSubscriptionFeedback, useFormFeedback } from "@/components/form-feedback";

interface BrevoFormProps {
  title?: string;
  description?: string;
  buttonText?: string;
  className?: string;
  placeholder?: string;
  source?: string;
  tags?: string[];
}

export function BrevoForm({
  title = "Stay Updated with AI Teaching Tips",
  description = "Get weekly AI tools and time-saving strategies for teachers",
  buttonText = "Subscribe Free",
  className = "",
  placeholder = "Enter your email address",
  source = "brevo_form",
  tags = ['newsletter_signup']
}: BrevoFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isTestMode = false; // API route handles the Brevo integration

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (isTestMode) {
      // Test mode - simulate success
      setTimeout(() => {
        setLoading(false);
        setStatus("success");
        setMessage("Successfully subscribed! (Test Mode - No actual email sent)");
        setEmail("");
        setFirstName("");
        setLastName("");
      }, 1500);
      return;
    }

    try {
      // Updated to use the proper Brevo API route
      const response = await fetch("/api/brevo-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          name: firstName + (lastName ? ` ${lastName}` : ''), // Legacy compatibility
          source,
          tags,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("🎉 Successfully subscribed! Check your email for your welcome gift.");
        setEmail("");
        setFirstName("");
        setLastName("");
        
        // Track successful subscription with name data
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'newsletter_subscribe', {
            event_category: 'engagement',
            event_label: 'email_signup_section',
            value: 1,
            custom_parameters: {
              has_first_name: !!firstName,
              has_last_name: !!lastName,
              has_full_name: !!(firstName && lastName)
            }
          });
        }
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {isTestMode && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
            <div className="flex items-center text-sm text-yellow-800">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Test Mode: Update BREVO_API_KEY and BREVO_LIST_ID in production</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name (Optional)
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name (optional)"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name (Optional)
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name (optional)"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                {buttonText}
              </>
            )}
          </Button>

          {status === "success" && (
            <div className="flex items-center text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-4 h-4 mr-2" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{message}</span>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}