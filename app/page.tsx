import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { Bot, Sparkles, Zap, Smartphone, Laptop, Monitor, Tablet } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            AI-Powered
            <span className="text-blue-600 dark:text-blue-400 block">Product Recommendations</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get personalized product recommendations based on your needs, budget, and preferences.
            Our AI analyzes thousands of products to find the perfect match for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Chatting
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our AI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of product discovery with our intelligent recommendation system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Conversational AI</CardTitle>
                <CardDescription>
                  Chat naturally with our AI assistant to describe exactly what you're looking for.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
                  <li>• Natural language understanding</li>
                  <li>• Context-aware recommendations</li>
                  <li>• Follow-up questions for clarity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Personalized</CardTitle>
                <CardDescription>
                  Get recommendations tailored to your specific needs, budget, and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
                  <li>• Custom filtering options</li>
                  <li>• Budget-conscious suggestions</li>
                  <li>• Preference-based matching</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bot className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-xl">Smart Deals</CardTitle>
                <CardDescription>
                  Discover the best prices and exclusive deals across multiple retailers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 text-left">
                  <li>• Price comparison</li>
                  <li>• Exclusive offers</li>
                  <li>• Stock availability alerts</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Get Your Personalized Recommendations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start a conversation with our AI assistant to find the perfect products for your needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg border bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      </section>

      {/* Category Selection Section */}
      <section className="container mx-auto px-4 py-16 bg-white dark:bg-gray-800 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our most popular product categories to get started quickly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Smartphone className="h-8 w-8 mx-auto" />
              <span>Phones</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Laptop className="h-8 w-8 mx-auto" />
              <span>Laptops</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Monitor className="h-8 w-8 mx-auto" />
              <span>Monitors</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Tablet className="h-8 w-8 mx-auto" />
              <span>Tablets</span>
            </Button>
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Bot className="h-8 w-8 mx-auto" />
              <span>All</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">AI Product Recommendations</h3>
                <p className="text-gray-300">
                  Your intelligent shopping assistant for finding the perfect products.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">How It Works</a></li>
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-400">
                <strong>Disclosure:</strong> This site contains affiliate links. We may earn a commission if you make a purchase through these links at no additional cost to you.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                © 2024 AI Product Recommendations. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}