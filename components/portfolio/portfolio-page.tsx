"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react"
import { handlePortfolioAction, handleReportGeneration } from "@/utils/button-handlers"

const portfolioHoldings = [
  {
    id: "INV-001",
    company: "Akasa Energy Ltd.",
    sector: "Infrastructure",
    investment: 2500000,
    currentValue: 2875000,
    return: 15.0,
    allocation: 18.5,
    maturity: "2027-03-15",
    rating: "BBB-",
    status: "Active",
  },
  {
    id: "INV-002",
    company: "Tema Construction",
    sector: "Real Estate",
    investment: 1200000,
    currentValue: 1344000,
    return: 12.0,
    allocation: 8.6,
    maturity: "2026-08-20",
    rating: "BB+",
    status: "Active",
  },
  {
    id: "INV-003",
    company: "Gold Coast Mining",
    sector: "Mining",
    investment: 3800000,
    currentValue: 4294000,
    return: 13.0,
    allocation: 27.6,
    maturity: "2029-01-10",
    rating: "BBB",
    status: "Active",
  },
  {
    id: "INV-004",
    company: "AgriTech Solutions",
    sector: "Agriculture",
    investment: 1500000,
    currentValue: 1635000,
    return: 9.0,
    allocation: 10.5,
    maturity: "2026-12-05",
    rating: "BB",
    status: "Active",
  },
]

const performanceMetrics = [
  { label: "Total Portfolio Value", value: "$15.2M", change: "+12.4%", trend: "up" },
  { label: "Total Invested", value: "$13.5M", change: "Principal", trend: "neutral" },
  { label: "Unrealized Gains", value: "$1.7M", change: "+15.8%", trend: "up" },
  { label: "Avg. Yield", value: "11.8%", change: "+0.6%", trend: "up" },
]

export function PortfolioPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Portfolio Management</h1>
            <p className="text-gray-600 mt-1">Investment holdings and performance tracking</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => handleReportGeneration("Portfolio Performance Report", userType)}>
              Export Report
            </Button>
            <Button onClick={() => handlePortfolioAction("rebalance")}>Rebalance Portfolio</Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : metric.trend === "down" ? (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  ) : (
                    <BarChart3 className="w-4 h-4 text-slate-400" />
                  )}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div
                  className={`text-sm ${metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-slate-500"}`}
                >
                  {metric.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Holdings */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Portfolio Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioHoldings.map((holding) => (
                <div
                  key={holding.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900">{holding.company}</h4>
                      <p className="text-sm text-slate-600">{holding.sector}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {holding.rating}
                      </Badge>
                      <div className="text-sm text-slate-500">ID: {holding.id}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-slate-500">Invested:</span>
                      <div className="font-medium">{formatCurrency(holding.investment)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Current Value:</span>
                      <div className="font-medium">{formatCurrency(holding.currentValue)}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Return:</span>
                      <div className="font-medium text-green-600">+{holding.return}%</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Allocation:</span>
                      <div className="font-medium">{holding.allocation}%</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Maturity:</span>
                      <div className="font-medium">{holding.maturity}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Portfolio Weight</span>
                        <span>{holding.allocation}%</span>
                      </div>
                      <Progress value={holding.allocation} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handlePortfolioAction("view", holding.id)}>
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePortfolioAction("adjust", holding.id)}>
                        Adjust
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
