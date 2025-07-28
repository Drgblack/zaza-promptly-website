import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, FileText, Video, MessageSquare } from "lucide-react"

export function ZazaEcosystem() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">Zaza Creator Suite</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Complete Teacher Creator Ecosystem</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Unlock your full potential with our integrated suite of AI-powered tools for educators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Zaza Spark",
              description: "Create stunning classroom visuals in seconds",
              icon: <Sparkles className="w-6 h-6 text-pink-500" />,
              active: true,
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Zaza Promptly",
              description: "AI report comments & communication",
              icon: <MessageSquare className="w-6 h-6 text-pink-500" />,
              logo: "/images/zaza-promptly-logo.png",
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Zaza Teach",
              description: "Lesson planning & AI teaching assistant",
              icon: <FileText className="w-6 h-6 text-pink-500" />,
              color: "from-purple-500 to-pink-500",
            },
            {
              name: "Zaza Studio",
              description: "Video editing for educators (Coming Soon)",
              icon: <Video className="w-6 h-6 text-pink-500" />,
              comingSoon: true,
              color: "from-purple-500 to-pink-500",
            },
          ].map((product, i) => (
            <Card
              key={i}
              className={`overflow-hidden border-0 ${
                product.active ? "ring-2 ring-purple-500 shadow-lg" : ""
              } hover:shadow-lg transition-all`}
            >
              <div className={`h-2 bg-gradient-to-r ${product.color}`}></div>
              <CardContent className="p-6">
                <div className="mb-4">
                  {product.logo ? (
                    <div className="h-12 relative">
                      <Image
                        src={product.logo || "/placeholder.svg"}
                        alt={product.name}
                        width={160}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        {product.icon}
                      </div>
                      <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {product.name}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                {product.comingSoon ? (
                  <Badge variant="outline" className="bg-gray-100">
                    Coming Soon
                  </Badge>
                ) : product.active ? (
                  <Badge className="bg-purple-100 text-purple-700">You Are Here</Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition-colors"
                  >
                    Learn More
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
