import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, MessageCircle, Clock, Globe, Lock, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Premium Comment Bank (25 Comments) - Free with Signup | Zaza Promptly',
  description: 'Unlock our extended comment bank with 25 ready-to-use examples in English and German. Free with your Zaza Promptly signup.',
  keywords: 'premium grading comments, feedback templates, teacher resources, multilingual grading, education tools',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PremiumCommentBankPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const premiumCommentsEn = [
    {
      category: "Strengths (8 Comments)",
      comments: [
        "Your work shows a strong grasp of the key concepts covered.",
        "You applied classroom learning effectively to your assignment.",
        "Creative ideas were developed clearly and confidently.",
        "Strong organization made your writing easy to follow.",
        "You included relevant and well-chosen examples.",
        "Your effort and preparation are evident throughout.",
        "Excellent use of subject-specific vocabulary.",
        "You responded thoughtfully to the task requirements."
      ]
    },
    {
      category: "Growth Areas (8 Comments)", 
      comments: [
        "Provide deeper explanations to strengthen your arguments.",
        "Focus on making your reasoning clearer step by step.",
        "Include more supporting evidence to back up your points.",
        "Review grammar and spelling for accuracy.",
        "Stay focused on the question throughout your response.",
        "Balance descriptive detail with concise explanations.",
        "Aim for more precise use of academic language.",
        "Develop stronger transitions between ideas and paragraphs."
      ]
    },
    {
      category: "Next Steps (9 Comments)",
      comments: [
        "Review class notes on [specific topic] for reinforcement.",
        "Practice writing outlines before drafting full answers.",
        "Use peer or teacher feedback to improve clarity.",
        "Expand your vocabulary in this subject area.",
        "Set a goal to provide at least two examples per answer.",
        "Practice time management when completing tasks.",
        "Revisit previous assignments to track improvement.",
        "Read model answers to learn effective structures.",
        "Apply feedback from this assignment to your next one."
      ]
    }
  ];

  const premiumCommentsDe = [
    {
      category: "Stärken (8 Kommentare)",
      comments: [
        "Ihre Arbeit zeigt ein gutes Verständnis der behandelten Konzepte.",
        "Sie haben das im Unterricht Gelernte wirksam angewendet.",
        "Kreative Ideen wurden klar und selbstbewusst entwickelt.",
        "Gute Struktur macht Ihren Text leicht nachvollziehbar.",
        "Sie haben passende und gut gewählte Beispiele eingebracht.",
        "Ihr Einsatz und Ihre Vorbereitung sind deutlich erkennbar.",
        "Sehr guter Einsatz von Fachvokabular.",
        "Sie sind sorgfältig auf die Aufgabenstellung eingegangen."
      ]
    },
    {
      category: "Entwicklungsfelder (8 Kommentare)",
      comments: [
        "Geben Sie ausführlichere Erklärungen, um Ihre Argumente zu stützen.",
        "Achten Sie darauf, Ihre Gedankengänge Schritt für Schritt zu verdeutlichen.",
        "Fügen Sie mehr Belege hinzu, um Ihre Aussagen zu untermauern.",
        "Überprüfen Sie Grammatik und Rechtschreibung sorgfältig.",
        "Bleiben Sie konsequent bei der Fragestellung.",
        "Finden Sie eine bessere Balance zwischen Details und Kürze.",
        "Verwenden Sie präzisere Fachsprache.",
        "Entwickeln Sie klarere Übergänge zwischen Absätzen."
      ]
    },
    {
      category: "Nächste Schritte (9 Kommentare)",
      comments: [
        "Wiederholen Sie die Unterrichtsnotizen zu [Thema] zur Vertiefung.",
        "Üben Sie, vor dem Schreiben eine Gliederung anzufertigen.",
        "Nutzen Sie Feedback von Mitschülerinnen/Mitschülern oder Lehrkräften.",
        "Erweitern Sie Ihren Fachwortschatz in diesem Bereich.",
        "Setzen Sie sich das Ziel, mindestens zwei Beispiele pro Antwort zu geben.",
        "Üben Sie das Zeitmanagement bei Aufgaben.",
        "Vergleichen Sie aktuelle Arbeiten mit früheren, um Fortschritte zu sehen.",
        "Lesen Sie Musterlösungen, um wirksame Strukturen kennenzulernen.",
        "Wenden Sie das Feedback aus dieser Aufgabe bei der nächsten an."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-purple-600" />
              <span className="text-purple-600 font-medium">Premium Resource</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Premium Comment Bank
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Unlock this extended comment bank with 25 ready-to-use examples in English and German. 
              Designed to save teachers hours of time while keeping feedback meaningful. 
              <strong className="text-purple-600">Free with your Zaza Promptly signup.</strong>
            </p>
            
            {/* Signup CTA */}
            <div className="bg-white border border-purple-200 rounded-2xl p-8 shadow-lg max-w-md mx-auto">
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Get Free Access</h3>
              <p className="text-gray-600 text-sm mb-6">
                Sign up for Zaza Promptly's free plan to unlock this premium resource immediately.
              </p>
              <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                Get Free Access →
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                No credit card required • 14-day free trial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included</h2>
          
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">25 Premium Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Comprehensive collection covering Strengths, Growth Areas, and Next Steps in both languages.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Save 3+ Hours Weekly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Professional-quality feedback templates that maintain consistency across all your grading.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Bilingual Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  English and German versions with culturally appropriate language for diverse classrooms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment Preview - English */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Preview: English Comments</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {premiumCommentsEn.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-purple-700">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.comments.slice(0, 3).map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-sm text-gray-700 leading-relaxed">
                        • {comment}
                      </li>
                    ))}
                    <li className="text-sm text-gray-500 italic">
                      + {section.comments.length - 3} more comments...
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comment Preview - German */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Vorschau: Deutsche Kommentare</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {premiumCommentsDe.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-pink-700">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.comments.slice(0, 3).map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-sm text-gray-700 leading-relaxed">
                        • {comment}
                      </li>
                    ))}
                    <li className="text-sm text-gray-500 italic">
                      + {section.comments.length - 3} weitere Kommentare...
                    </li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Grading?</h2>
            <p className="text-purple-100 mb-8 leading-relaxed">
              Join thousands of teachers who are already using Zaza Promptly to save time, 
              improve feedback quality, and reclaim their evenings.
            </p>
            
            <div className="space-y-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Star className="w-5 h-5 mr-2" />
                Get Free Access to Premium Bank
              </Button>
              <p className="text-sm text-purple-200">
                Includes 14-day free trial of Zaza Promptly • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Related Resources</h2>
            
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  <a href="/resources/grading-comment-bank" className="text-blue-600 hover:underline">
                    Starter Comment Bank (Free)
                  </a>
                </h3>
                <p className="text-gray-600 text-sm">
                  12 basic grading comments in English and German. Perfect for getting started.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  <a href="/blog/grading-doesnt-steal-evenings" className="text-blue-600 hover:underline">
                    Grading Doesn't Have to Steal Your Evenings
                  </a>
                </h3>
                <p className="text-gray-600 text-sm">
                  Personal insights on reclaiming work-life balance through smarter grading.
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-semibold mb-2">
                  <a href="/blog/ai-grading-feedback-tools" className="text-blue-600 hover:underline">
                    AI Grading and Feedback Tools Guide
                  </a>
                </h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive overview of AI-powered grading systems and best practices.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}