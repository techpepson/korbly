"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown } from "lucide-react"

const businessMetrics = [
  {
    label: "Monthly Revenue",
    value: "GH₵ 450,000",
    change: "+12%",
    trend: "up",
    target: "GH₵ 500,000",
    progress: 90,
  },
  {
    label: "Profit Margin",
    value: "18.5%",
    change: "+2.1%",
    trend: "up",
    target: "20%",
    progress: 92.5,
  },
  {
    label: "Cash Flow",
    value: "GH₵ 85,000",
    change: "+8%",
    trend: "up",
    target: "GH₵ 100,000",
    progress: 85,
  },
  {
    label: "Debt-to-Equity",
    value: "0.45",
    change: "-0.05",
    trend: "up",
    target: "0.40",
    progress: 88,
  },
]

const monthlyData = [
  { month: "Aug", revenue: 380000, expenses: 310000, profit: 70000 },
  { month: "Sep", revenue: 420000, expenses: 340000, profit: 80000 },
  { month: "Oct", revenue: 395000, expenses: 325000, profit: 70000 },
  { month: "Nov", revenue: 465000, expenses: 375000, profit: 90000 },
  { month: "Dec", revenue: 450000, expenses: 365000, profit: 85000 },
  { month: "Jan", revenue: 480000, expenses: 385000, profit: 95000 },
]

const kpiTargets = [
  { metric: "Customer Acquisition", current: 45, target: 50, unit: "new customers" },
  { metric: "Employee Productivity", current: 92, target: 95, unit: "% efficiency" },
  { metric: "Inventory Turnover", current: 8.2, target: 10, unit: "times/year" },
  { metric: "Customer Satisfaction", current: 4.6, target: 5.0, unit: "rating" },
]

export function MetricsPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "sme")
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Business Metrics</h1>
            <p className="text-gray-600 mt-1">Track your business performance and KPIs</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Export Report</Button>
            <Button>Set Targets</Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessMetrics.map((metric, index) => (
            <Card key={index} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">{metric.label}</span>
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className={`text-sm mb-3 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change} vs last month
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Target: {metric.target}</span>
                    <span className="font-medium">{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Monthly Performance */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">{data.month} 2024</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {((data.profit / data.revenue) * 100).toFixed(1)}% margin
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Revenue:</span>
                        <div className="font-medium">{formatCurrency(data.revenue)}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Expenses:</span>
                        <div className="font-medium">{formatCurrency(data.expenses)}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Profit:</span>
                        <div className="font-medium text-green-600">{formatCurrency(data.profit)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* KPI Targets */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">KPI Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {kpiTargets.map((kpi, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">{kpi.metric}</span>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          {kpi.current} / {kpi.target}
                        </div>
                        <div className="text-xs text-slate-500">{kpi.unit}</div>
                      </div>
                    </div>
                    <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                    <div className="text-xs text-slate-500">
                      {((kpi.current / kpi.target) * 100).toFixed(1)}% of target achieved
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Health Score */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Business Health Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">A-</div>
                <div className="text-sm font-medium text-slate-900 mb-1">Overall Score</div>
                <div className="text-xs text-slate-500">Excellent financial health</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Financial Stability</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Growth Potential</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Operational Efficiency</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">Recommendations</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Increase inventory turnover rate</li>
                  <li>• Optimize operational costs</li>
                  <li>• Expand customer base</li>
                  <li>• Consider equipment upgrade</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
