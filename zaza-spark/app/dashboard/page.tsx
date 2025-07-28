import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sparkles,
  TrendingUp,
  Users,
  Heart,
  Share2,
  Download,
  Mic,
  ImageIcon,
  FileText,
  Award,
  Target,
  BarChart3,
  Plus,
  FlameIcon as Fire,
  Crown,
  Zap,
} from "lucide-react"

// Add the import for the Logo component
import { Logo } from "@/components/logo"
import { SharedFooter } from "@/components/shared-footer"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Replace the logo div with the Logo component */}
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              <Crown className="w-3 h-3 mr-1" />
              Pro Creator
            </Badge>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              SJ
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">SJ</span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">Sarah Johnson</h2>
                  <p className="text-purple-100 mb-4">5th Grade Teacher</p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">847</div>
                      <div className="text-xs text-purple-100">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-xs text-purple-100">Viral Posts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Influence Score */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Fire className="w-5 h-5 text-orange-500" />
                  Influence Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">8,547</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">Top 15% of creators</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">Creation Streak</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">12 days</span>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">This Week</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">+234%</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create
                </TabsTrigger>
                <TabsTrigger value="gallery" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Community
                </TabsTrigger>
              </TabsList>

              {/* Create Tab */}
              <TabsContent value="create" className="space-y-6">
                {/* Trending Prompts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Fire className="w-5 h-5 text-orange-500" />
                      Trending Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {["Classroom door decorations", "Math anchor charts", "Reading corner signs"].map((trend, i) => (
                        <Button key={i} variant="outline" className="justify-start bg-transparent">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {trend}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Creation Interface */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      Create Your Next Viral Visual
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Visual Type Selection */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">What do you want to create?</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { icon: <FileText className="w-5 h-5" />, label: "Poster", active: true },
                          { icon: <ImageIcon className="w-5 h-5" />, label: "Worksheet", active: false },
                          { icon: <Target className="w-5 h-5" />, label: "Anchor Chart", active: false },
                          { icon: <Award className="w-5 h-5" />, label: "Certificate", active: false },
                        ].map((type, i) => (
                          <Button
                            key={i}
                            variant={type.active ? "default" : "outline"}
                            className={`flex flex-col gap-2 h-20 ${type.active ? "bg-purple-600" : ""}`}
                          >
                            {type.icon}
                            <span className="text-xs">{type.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Prompt Input */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Describe your vision</label>
                      <div className="relative">
                        <Textarea
                          placeholder="e.g., Create a colorful math poster about fractions with fun characters and bright colors for 3rd graders..."
                          className="min-h-[100px] pr-12"
                        />
                        <Button size="sm" className="absolute bottom-3 right-3">
                          <Mic className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Style Options */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Style</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { name: "Trendy", color: "from-pink-500 to-purple-500" },
                          { name: "Professional", color: "from-blue-500 to-teal-500" },
                          { name: "Playful", color: "from-yellow-500 to-orange-500" },
                        ].map((style, i) => (
                          <Button key={i} variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                            <div className={`w-8 h-4 rounded bg-gradient-to-r ${style.color}`}></div>
                            <span className="text-xs">{style.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg py-6">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate My Viral Visual
                    </Button>

                    {/* Viral Potential Indicator */}
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Fire className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium">Viral Potential: High</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Math content is trending +45% this week. Perfect timing for maximum reach!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Your Creations</h2>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">47 Total</Badge>
                    <Badge className="bg-purple-100 text-purple-700">12 Viral</Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Fraction Fun Poster", likes: 847, shares: 234, viral: true },
                    { title: "Reading Rules Chart", likes: 156, shares: 45, viral: false },
                    { title: "Science Lab Safety", likes: 423, shares: 89, viral: true },
                    { title: "Math Word Wall", likes: 234, shares: 67, viral: false },
                    { title: "Classroom Jobs Board", likes: 678, shares: 123, viral: true },
                    { title: "Writing Process Steps", likes: 345, shares: 78, viral: false },
                  ].map((item, i) => (
                    <Card key={i} className="group hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-t-lg relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-20">📊</div>
                        </div>
                        {item.viral && (
                          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                            <Fire className="w-3 h-3 mr-1" />
                            Viral
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span>{item.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-4 h-4" />
                              <span>{item.shares}</span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Total Views</span>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">2.3M</div>
                      <div className="text-xs text-green-600">+23% this week</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Engagement Rate</span>
                        <Heart className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="text-2xl font-bold">8.4%</div>
                      <div className="text-xs text-green-600">Above average</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Viral Score</span>
                        <Fire className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="text-2xl font-bold">94</div>
                      <div className="text-xs text-orange-600">Top 5% creators</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>Analytics chart would go here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Fire className="w-5 h-5 text-orange-500" />
                        Trending Challenges
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: "#ClassroomMakeover", participants: "2.3K", prize: "Featured Spotlight" },
                        { name: "#MathMagic", participants: "1.8K", prize: "Pro Account" },
                        { name: "#ReadingCorner", participants: "956", prize: "Template Pack" },
                      ].map((challenge, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium">{challenge.name}</div>
                            <div className="text-sm text-gray-600">{challenge.participants} participants</div>
                          </div>
                          <Button size="sm">Join</Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-yellow-500" />
                        Top Creators
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: "Sarah J.", score: "8,547", badge: "Math Queen" },
                        { name: "Mike R.", score: "7,234", badge: "Design Pro" },
                        { name: "Lisa C.", score: "6,891", badge: "Art Master" },
                      ].map((creator, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {creator.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <div className="font-medium">{creator.name}</div>
                              <Badge className="text-xs bg-purple-100 text-purple-700">{creator.badge}</Badge>
                            </div>
                          </div>
                          <div className="text-sm font-medium text-purple-600">{creator.score}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Add this before the final closing </div> */}
      <SharedFooter currentProduct="spark" />
    </div>
  )
}
