import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, MessageCircle, Clock, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Starter Grading Comment Bank (EN + DE) - Free Resource | Zaza Promptly',
  description: 'Download our free collection of grading comments in English and German. Save time while providing meaningful feedback to students.',
  keywords: 'grading comments, feedback templates, teacher resources, multilingual grading, education tools',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function GradingCommentBankPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const starterCommentsEn = [
    {
      category: "Strengths",
      comments: [
        "Clear understanding of key concepts demonstrated in your work.",
        "Creative ideas expressed with confidence.",
        "Your writing shows strong organization and flow.",
        "Effective use of supporting evidence/examples."
      ]
    },
    {
      category: "Growth Areas", 
      comments: [
        "Work on providing more detailed explanations to strengthen your arguments.",
        "Try to check spelling/grammar carefully before submitting.",
        "Include more examples to support your points.",
        "Focus on staying on-topic throughout your response."
      ]
    },
    {
      category: "Next Steps",
      comments: [
        "Review class notes from [topic] to reinforce understanding.",
        "Practice outlining before writing to improve structure.",
        "Ask for peer feedback on your drafts.",
        "Set a personal goal to expand vocabulary related to this subject."
      ]
    }
  ];

  const starterCommentsDe = [
    {
      category: "Stärken",
      comments: [
        "Klares Verständnis der wichtigsten Konzepte in Ihrer Arbeit.",
        "Kreative Ideen selbstbewusst dargestellt.",
        "Ihre Texte sind gut organisiert und flüssig geschrieben.",
        "Wirksame Nutzung von Beispielen und Belegen."
      ]
    },
    {
      category: "Entwicklungsfelder",
      comments: [
        "Arbeiten Sie daran, ausführlichere Erklärungen zu geben, um Ihre Argumente zu stützen.",
        "Überprüfen Sie Rechtschreibung/Grammatik sorgfältiger vor der Abgabe.",
        "Fügen Sie mehr Beispiele hinzu, um Ihre Aussagen zu untermauern.",
        "Achten Sie darauf, beim Thema zu bleiben."
      ]
    },
    {
      category: "Nächste Schritte",
      comments: [
        "Wiederholen Sie die Unterrichtsnotizen zu [Thema], um Ihr Verständnis zu festigen.",
        "Üben Sie, vor dem Schreiben eine Gliederung zu erstellen, um die Struktur zu verbessern.",
        "Holen Sie sich Feedback von Mitschülerinnen/Mitschülern.",
        "Setzen Sie sich ein persönliches Ziel, Ihren Fachwortschatz zu erweitern."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Starter Comment Bank
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              This starter comment bank helps you save time and stay consistent when giving feedback. 
              Copy, adapt, or extend to suit your students. Available in English and German.
            </p>
            
            {/* Download Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-5 h-5 mr-2" />
                Download Full PDF
              </Button>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Globe className="w-4 h-4" />
                <span>English + German</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Ready to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  12 categorized comments you can copy directly into your gradebook or feedback forms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Reduce feedback writing time while maintaining personalized, meaningful comments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Globe className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Bilingual</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  English and German versions to support diverse classroom environments.
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
            {starterCommentsEn.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-sm text-gray-700 leading-relaxed">
                        • {comment}
                      </li>
                    ))}
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
            {starterCommentsDe.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.comments.map((comment, commentIndex) => (
                      <li key={commentIndex} className="text-sm text-gray-700 leading-relaxed">
                        • {comment}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
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
                  <a href="/blog/ai-grading-feedback-tools" className="text-blue-600 hover:underline">
                    AI Grading and Feedback Tools Guide
                  </a>
                </h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive overview of AI-powered grading systems and best practices.
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
              
              <Card className="p-6 border-purple-200 bg-purple-50">
                <h3 className="font-semibold mb-2">
                  <a href="/resources/premium-comment-bank" className="text-purple-600 hover:underline">
                    Premium Comment Bank (25 Comments)
                  </a>
                </h3>
                <p className="text-gray-600 text-sm">
                  Extended collection with advanced feedback templates. Free with Zaza Promptly signup.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}