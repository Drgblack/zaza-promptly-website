// SEO meta tags injected by automation
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Users, TrendingUp, Award, Play, Star, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { WaitlistForm } from "@/components/waitlist-form"
// Add the import for the ZazaEcosystem component
import { ZazaEcosystem } from "@/components/zaza-ecosystem"
import Head from "next/head";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, BASE_URL } from "@zaza/shared-components/lib/seo";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Zaza Spark | {BRAND_NAME}</title>
        <meta name="description" content="Discover Zaza Spark: AI-powered HR and school management. {DEFAULT_DESCRIPTION}" />
        <meta property="og:title" content="Zaza Spark | {BRAND_NAME}" />
        <meta property="og:description" content="Discover Zaza Spark: AI-powered HR and school management. {DEFAULT_DESCRIPTION}" />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${BASE_URL}/zaza-spark`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zaza Spark | {BRAND_NAME}" />
        <meta name="twitter:description" content="Discover Zaza Spark: AI-powered HR and school management. {DEFAULT_DESCRIPTION}" />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
              <Sparkles className="w-4 h-4 mr-1" />
              Powered by AI • Built for Virality
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              Ignite Your Classroom.
              <br />
              Spark Your Influence.
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The AI that turns teachers into creator legends. Generate stunning classroom visuals in 30 seconds and share
              them across all platforms.
            </p>

            <div className="mb-12">
              <p className="text-gray-600 mb-6">Be the first to experience the teacher creator revolution.</p>
              <WaitlistForm />
              <div className="mt-4 flex justify-center">
                <Button size="sm" variant="link" className="text-gray-500 flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ Teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>2M+ Visuals Created</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>500+ Viral Creators</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Activity Feed */}
        <section className="py-12 px-4 bg-white/50">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Teachers Creating Right Now</h2>
              <p className="text-gray-600">Join the movement of educators going viral</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Sarah M.", action: "created a viral bulletin board", likes: "847", time: "2 min ago" },
                { name: "Mike R.", action: "shared a math poster", likes: "234", time: "5 min ago" },
                { name: "Lisa K.", action: "started a classroom challenge", likes: "156", time: "8 min ago" },
              ].map((activity, i) => (
                <Card key={i} className="border-l-4 border-l-purple-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-purple-600">{activity.name}</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.action}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{activity.likes} likes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        <span>Shared</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Everything You Need to Go Viral</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From AI-powered creation to social media domination, we've got your teaching influence covered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-8 h-8 text-purple-600" />,
                  title: "30-Second AI Creation",
                  description:
                    "Generate stunning posters, worksheets, and anchor charts instantly with AI that understands education.",
                },
                {
                  icon: <Share2 className="w-8 h-8 text-pink-600" />,
                  title: "One-Tap Viral Sharing",
                  description:
                    "Share to TikTok, Instagram, and Facebook with auto-generated captions and trending hashtags.",
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
                  title: "Teacher Fame Engine",
                  description: "Get featured, build your following, and become the teacher everyone wants to follow.",
                },
                {
                  icon: <Users className="w-8 h-8 text-green-600" />,
                  title: "Creator Community",
                  description: "Connect with 50K+ teachers, remix ideas, and participate in viral challenges.",
                },
                {
                  icon: <Award className="w-8 h-8 text-blue-600" />,
                  title: "Gamified Streaks",
                  description: "Build creation streaks, unlock achievements, and climb the teacher leaderboards.",
                },
                {
                  icon: <Star className="w-8 h-8 text-yellow-600" />,
                  title: "Brand Building Tools",
                  description: "Develop your teaching brand with consistent styling and professional watermarks.",
                },
              ].map((feature, i) => (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Showcase */}
        <section id="community" className="py-20 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Teacher Spotlight</h2>
              <p className="text-xl text-gray-600">Meet the educators who are changing the game</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  title: "5th Grade Teacher",
                  achievement: "2.3M TikTok Views",
                  quote:
                    "Zaza Spark turned my classroom into a viral sensation. My bulletin boards are now Pinterest-famous!",
                  avatar: "SJ",
                },
                {
                  name: "Mike Rodriguez",
                  title: "Math Teacher",
                  achievement: "Viral Math Poster",
                  quote: "My students actually get excited about math worksheets now. That's the power of good design!",
                  avatar: "MR",
                },
                {
                  name: "Lisa Chen",
                  title: "Art Educator",
                  achievement: "Teacher of the Year",
                  quote: "I went from unknown teacher to education influencer in 3 months. Zaza changed everything.",
                  avatar: "LC",
                },
              ].map((teacher, i) => (
                <Card key={i} className="p-6 bg-white border-0 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {teacher.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.title}</p>
                    </div>
                  </div>
                  <Badge className="mb-3 bg-purple-100 text-purple-700">{teacher.achievement}</Badge>
                  <p className="text-gray-600 italic">"{teacher.quote}"</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zaza Ecosystem */}
        <ZazaEcosystem />

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Choose Your Creator Journey</h2>
              <p className="text-xl text-gray-600">From classroom hero to education influencer</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Spark",
                  price: "Free",
                  description: "Try the magic for free",
                  features: ["3 visuals/month", "Zaza watermark", "Basic sharing", "Community access"],
                  cta: "Start Free",
                  popular: false,
                },
                {
                  name: "Shine",
                  price: "€19.99/month",
                  description: "Build your teaching brand",
                  features: [
                    "Unlimited visuals",
                    "HD downloads",
                    "Cross-platform posting",
                    "Analytics dashboard",
                    "Priority support",
                  ],
                  cta: "Go Pro",
                  popular: true,
                },
                {
                  name: "Creator",
                  price: "€39.99/month",
                  description: "Monetize your influence",
                  features: [
                    "Everything in Shine",
                    "Brand partnerships",
                    "Revenue tools",
                    "Advanced analytics",
                    "Creator badge",
                  ],
                  cta: "Become Creator",
                  popular: false,
                },
              ].map((plan, i) => (
                <Card
                  key={i}
                  className={`p-6 relative ${plan.popular ? "border-2 border-purple-500 shadow-xl" : "border-0"}`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-2">{plan.price}</div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Become a Creator Legend?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join 50,000+ teachers who are already transforming their classrooms and building their influence.
            </p>
            <div className="max-w-md mx-auto">
              <p className="text-white/90 mb-6">
                Join our exclusive waitlist to be the first to experience Zaza Spark when we launch.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
