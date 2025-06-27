"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, BarChart3, FileText } from "lucide-react"

const valuationModels = [
  {
    name: "DCF Analysis",
    description: "Discounted Cash Flow valuation model",
    status: "Active",
    lastUpdated: "2024-01-20",
    value: "$52.3M",
    confidence: "High",
  },
  {
    name: "Comparable Analysis",
    description: "Market multiples and peer comparison",
    status: "Active",
    lastUpdated: "2024-01-18",
    value: "$48.7M",
    confidence: "Medium",
  },
  {
    name: "Asset-Based Valuation",
    description: "Net asset value approach",
    status: "Draft",
    lastUpdated: "2024-01-15",
    value: "$45.2M",
    confidence: "Medium",
  },
]

const sensitivityAnalysis = [
  { scenario: "Base Case", probability: "50%", value: "$52.3M", irr: "12.5%" },
  { scenario: "Optimistic", probability: "25%", value: "$68.1M", irr: "16.2%" },
  { scenario: "Pessimistic", probability: "25%", value: "$38.9M", irr: "8.7%" },
]

const riskFactors = [
  { factor: "Market Risk", impact: "Medium", probability: "30%", mitigation: "Diversification" },
  { factor: "Credit Risk", impact: "High", probability: "15%", mitigation: "Enhanced due diligence" },
  { factor: "Operational Risk", impact: "Low", probability: "20%", mitigation: "Management oversight" },
  { factor: "Regulatory Risk", impact: "Medium", probability: "25%", mitigation: "Compliance monitoring" },
]

export function ValuationPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "border-green-200 text-green-700 bg-green-50"
      case "Draft":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getRiskColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Valuation Workbench</h1>
            <p className="text-gray-600 mt-1">Advanced valuation models and risk analysis</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Import Data</Button>
            <Button>New Valuation</Button>
          </div>
        </div>

        {/* Valuation Models */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" />
              Valuation Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {valuationModels.map((model, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-900">{model.name}</h4>
                      <p className="text-sm text-slate-600">{model.description}</p>
                    </div>
                    <Badge variant="outline" className={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-sm text-slate-500">Valuation:</span>
                      <div className="font-semibold text-slate-900">{model.value}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Confidence:</span>
                      <div className="font-medium">{model.confidence}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Last Updated:</span>
                      <div className="font-medium">{model.lastUpdated}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Model
                      </Button>
                      <Button size="sm">Run Analysis</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Sensitivity Analysis */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Sensitivity Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sensitivityAnalysis.map((scenario, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{scenario.scenario}</h4>
                      <Badge variant="outline">{scenario.probability}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Valuation:</span>
                        <div className="font-semibold text-slate-900">{scenario.value}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">IRR:</span>
                        <div className="font-semibold text-green-600">{scenario.irr}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Analysis */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{risk.factor}</h4>
                      <span className={`text-sm font-medium ${getRiskColor(risk.impact)}`}>{risk.impact} Impact</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Probability:</span>
                        <div className="font-medium">{risk.probability}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Mitigation:</span>
                        <div className="font-medium">{risk.mitigation}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Valuation Summary */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Valuation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">$52.3M</div>
                <div className="text-sm font-medium text-slate-900 mb-1">Recommended Valuation</div>
                <div className="text-xs text-slate-500">Based on DCF analysis</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Confidence Level</span>
                  <span className="text-sm font-medium">High (85%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Expected IRR</span>
                  <span className="text-sm font-medium">12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Risk Rating</span>
                  <span className="text-sm font-medium">BBB+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Investment Grade</span>
                  <span className="text-sm font-medium text-green-600">Yes</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">Key Assumptions</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 8% discount rate</li>
                  <li>• 3% terminal growth</li>
                  <li>• 5-year projection period</li>
                  <li>• Current market conditions</li>
                </ul>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
