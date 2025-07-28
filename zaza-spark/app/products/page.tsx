import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, MessageSquare, FileText, Inbox, BarChart3, Zap } from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { SharedFooter } from "@/components/shared-footer"

export default function ProductsPage() {
  const products = [
    {
      name: "Zaza Spark",
      description: "Create stunning classroom visuals in seconds with AI-powered design tools.",
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      href: "/",
      status: "Available",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Zaza Promptly",
      description: "Generate personalized report comments and parent communication with AI.",
      icon: <MessageSquare className="w-8 h-8 text-pink-500" />,
              href: "/zaza-promptly-site",
      status: "Available",
      color: "from-pink-500 to-red-500",
    },
    {
      name: "Zaza Teach",
      description: "AI-powered lesson planning and teaching assistant for educators.",
      icon: <FileText className="w-8 h-8 text-blue-500" />,
              href: "/zaza-teach-website",
      status: "Coming Soon",
      color: "from-blue-500 to-teal-500",
    },
    {
      name: "Zaza Inbox",
      description: "Streamline parent-teacher communication with intelligent message management.",
      icon: <Inbox className="w-8 h-8 text-green-500" />,
      href: "/zaza-inbox",
      status: "Coming Soon",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Zaza ClarityDeck",
      description: "Transform complex educational data into clear, actionable insights.",
      icon: <BarChart3 className="w-8 h-8 text-orange-500" />,
              href: "/claritydeck-landing",
      status: "Coming Soon",
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "Zaza Schwoop",
      description: "Gamify learning with AI-powered educational experiences and rewards.",
      icon: <Zap className="w-8 h-8 text-indigo-500" />,
      href: "/zaza-schwoop",
      status: "Coming Soon",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-purple-600 font-medium">
              Products
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition-colors">
              Contact
            </Link>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
            <Sparkles className="w-4 h-4 mr-1" />
            Complete AI Suite for Educators
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-tight">
            The Zaza Ecosystem
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our complete suite of AI-powered tools designed to empower teachers and transform education through
            emotionally intelligent technology.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                      {product.icon}
                    </div>
                    <Badge
                      variant={product.status === "Available" ? "default" : "secondary"}
                      className={
                        product.status === "Available"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-600"
                      }
                    >
                      {product.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <Button
                    asChild
                    className={`w-full ${
                      product.status === "Available"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : ""
                    }`}
                    variant={product.status === "Available" ? "default" : "outline"}
                    disabled={product.status !== "Available"}
                  >
                    <Link href={product.href}>{product.status === "Available" ? "Explore" : "Coming Soon"}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Teaching?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of educators who are already using Zaza Technologies to enhance their impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SharedFooter currentProduct="products" />
    </div>
  )
}
