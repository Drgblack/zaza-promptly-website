"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, MailIcon, MessageCircleIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const faqs = [
  {
    question: "How does Zaza use AI to help educators?",
    answer:
      "Zaza uses secure, privacy-conscious AI to assist teachers with planning, messaging, communication, and feedback. Each product is built with real educators to solve practical challenges and save time.",
  },
  {
    question: "Is my data safe and secure?",
    answer: "Yes. Zaza complies with GDPR and FERPA regulations. Your data is never sold and always encrypted.",
  },
  {
    question: "Can I use Zaza for free?",
    answer: "All Zaza products offer a free plan so you can explore the core features before upgrading.",
  },
  {
    question: "What platforms does Zaza support?",
    answer: "Our tools are web-based and mobile-ready. Some apps are also available on iOS and Android.",
  },
  {
    question: "Who is Zaza built for?",
    answer:
      "Zaza is built by educators, for educators – including classroom teachers, instructional coaches, and school leaders.",
  },
  {
    question: "How do I request a feature?",
    answer: "Use the Feature Request form linked at the bottom of the page to suggest new features or improvements.",
  },
];

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // In a real app, you'd handle the form submission here
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
            Need Help?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
            We're here to support you – whether you're using Zaza Promptly, Teach, Inbox, or any of our tools. We'll
            get back to you within 24 hours.
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* FAQ Section */}
          <section>
            <Card className="h-fit shadow-sm border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center gap-2 transition-colors duration-300">
                  <MessageCircleIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 dark:border-gray-600 rounded-lg overflow-hidden transition-colors duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-4 py-4 text-left bg-white dark:bg-gray-800 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors duration-200 flex justify-between items-center"
                      aria-expanded={expandedFaq === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <span className="font-medium text-slate-800 dark:text-white pr-4 transition-colors duration-300">
                        {faq.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUpIcon className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-slate-400 dark:text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div
                        id={`faq-answer-${index}`}
                        className="px-4 py-4 bg-slate-50 dark:bg-gray-700 border-t border-slate-200 dark:border-gray-600 transition-colors duration-300"
                      >
                        <p className="text-slate-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Contact Form Section */}
          <section>
            <Card className="shadow-sm border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-slate-800 dark:text-white flex items-center gap-2 transition-colors duration-300">
                  <MailIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  Contact Support
                </CardTitle>
                <p className="text-slate-600 dark:text-gray-300 transition-colors duration-300">
                  Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label
                      htmlFor="name"
                      className="text-slate-700 dark:text-gray-300 font-medium transition-colors duration-300"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-slate-700 dark:text-gray-300 font-medium transition-colors duration-300"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-purple-500 transition-colors duration-300"
                      placeholder="your.email@school.edu"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-slate-700 dark:text-gray-300 font-medium transition-colors duration-300"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="mt-1 border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white focus:border-purple-500 focus:ring-purple-500 resize-none transition-colors duration-300"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 transition-colors duration-200"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Additional Help Section */}
        <section className="mb-12">
          <Card className="shadow-sm border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-slate-800 dark:text-white transition-colors duration-300">
                Additional Help
              </CardTitle>
              <p className="text-slate-600 dark:text-gray-300 transition-colors duration-300">
                Find more resources and information about Zaza.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/privacy"
                  className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
                >
                  <ExternalLinkIcon className="h-5 w-5 text-slate-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                  <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
                    Privacy Policy
                  </span>
                </a>

                <a
                  href="/terms"
                  className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
                >
                  <ExternalLinkIcon className="h-5 w-5 text-slate-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                  <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
                    Terms of Service
                  </span>
                </a>

                <a
                  href="/feature-request"
                  className="flex items-center gap-3 p-4 rounded-lg border border-slate-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 group"
                >
                  <ExternalLinkIcon className="h-5 w-5 text-slate-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200" />
                  <span className="font-medium text-slate-700 dark:text-gray-300 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-200">
                    Feature Request
                  </span>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Options */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 p-8 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 transition-colors duration-300">
              Other Ways to Reach Us
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:support@zazatechnologies.com"
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
              >
                <MailIcon className="h-5 w-5" />
                support@zazatechnologies.com
              </a>

              <div className="hidden sm:block w-px h-6 bg-slate-300 dark:bg-gray-600 transition-colors duration-300"></div>

              <button
                onClick={() => {
                  // Placeholder for live chat integration
                  alert("Live chat will be available soon! For now, please use the contact form or email.");
                }}
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors duration-200"
              >
                <MessageCircleIcon className="h-5 w-5" />
                Start Live Chat
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 