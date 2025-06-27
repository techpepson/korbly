"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, Play } from "lucide-react"

export function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const handleGetStarted = () => {
    window.location.href = "/auth"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-medium text-gray-900">Korbly</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#platform" className="text-gray-600 hover:text-gray-900 transition-colors">
              Platform
            </a>
            <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors">
              Solutions
            </a>
            <a href="#security" className="text-gray-600 hover:text-gray-900 transition-colors">
              Security
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => (window.location.href = "/auth")}>
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-8 bg-black text-white rounded-full px-4 py-2">
            Introducing Korbly 2.0 <ArrowRight className="w-4 h-4 ml-2" />
          </Badge>

          <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 leading-tight">
            Private credit.
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The institutional marketplace connecting Africa's most sophisticated investors with high-growth
            opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg"
              onClick={handleGetStarted}
            >
              Get started
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-blue-600 hover:text-blue-700 rounded-full px-8 py-4 text-lg"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch the film
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-light text-gray-900 mb-2">$2.5B</div>
              <div className="text-gray-600">Assets Under Management</div>
            </div>
            <div>
              <div className="text-5xl font-light text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Institutional Partners</div>
            </div>
            <div>
              <div className="text-5xl font-light text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Platform Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Built for institutional excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every feature designed to meet the highest standards of institutional investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "ISO 27001 Compliant",
                description: "Bank-grade security with end-to-end encryption and audit trails",
                icon: "🔒",
              },
              {
                title: "Real-time Syndication",
                description: "Dynamic tranche allocation with institutional-grade settlement",
                icon: "⚡",
              },
              {
                title: "Regulatory Ready",
                description: "Built for SEC, BoG, and international regulatory compliance",
                icon: "📋",
              },
              {
                title: "Advanced Analytics",
                description: "DCF modeling, risk assessment, and portfolio optimization",
                icon: "📊",
              },
              {
                title: "Global Custody",
                description: "Seamless integration with major custodial networks",
                icon: "🏦",
              },
              {
                title: "24/7 Support",
                description: "Dedicated institutional support team across time zones",
                icon: "🌍",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-light text-white mb-6">Ready to transform your private credit strategy?</h2>
          <p className="text-xl text-gray-300 mb-8">Join leading institutional investors already using Korbly</p>
          <Button
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-4 text-lg"
            onClick={handleGetStarted}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-md flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-900">Korbly</span>
            </div>
            <div className="text-sm text-gray-500">© 2025 Korbly. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
