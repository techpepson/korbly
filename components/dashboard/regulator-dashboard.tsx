"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, FileText, TrendingUp, Building2 } from "lucide-react"
import { handleComplianceAction, handleReportGeneration } from "@/utils/button-handlers"

const complianceAlerts = [
  {
    id: "ALERT-001",
    institution: "Ghana Pension Trust",
    type: "Capital Adequacy",
    severity: "Medium",
    description: "Capital ratio approaching minimum threshold",
    date: "2024-01-20",
  },
  {
    id: "ALERT-002",
    institution: "West Africa Insurance",
    type: "Reporting Delay",
    severity: "Low",
    description: "Monthly report submitted 2 days late",
    date: "2024-01-18",
  },
  {
    id: "ALERT-003",
    institution: "Accra Development Bank",
    type: "Risk Concentration",
    severity: "High",
    description: "Single sector exposure exceeds 25% limit",
    date: "2024-01-22",
  },
]

const institutionOverview = [
  { type: "Asset Managers", count: 45, compliance: 96, trend: "up" },
  { type: "Insurance Companies", count: 28, compliance: 94, trend: "stable" },
  { type: "Pension Funds", count: 32, compliance: 98, trend: "up" },
  { type: "Development Banks", count: 12, compliance: 92, trend: "down" },
]

const marketMetrics = [
  { label: "Total AUM", value: "$2.3B", change: "+5.2%" },
  { label: "Active Deals", value: "89", change: "+12" },
  { label: "Avg Deal Size", value: "$25M", change: "+8%" },
  { label: "Default Rate", value: "2.1%", change: "-0.3%" },
]

export function RegulatorDashboard() {
  return (
    <div className="space-y-8">
      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <Card key={index} className="border-slate-200 shadow-sm">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
              <div className="text-sm text-slate-600 mb-2">{metric.label}</div>
              <div className="text-xs text-green-600">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Compliance Alerts */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Compliance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900">{alert.institution}</h4>
                      <p className="text-sm text-slate-600">{alert.type}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        alert.severity === "High"
                          ? "border-red-200 text-red-700 bg-red-50"
                          : alert.severity === "Medium"
                            ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                            : "border-blue-200 text-blue-700 bg-blue-50"
                      }`}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{alert.date}</span>
                    <Button size="sm" variant="outline" onClick={() => handleComplianceAction("review", alert.id)}>
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Institution Compliance */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Institution Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {institutionOverview.map((institution, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-slate-900">{institution.type}</span>
                      <span className="text-sm text-slate-500 ml-2">({institution.count})</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{institution.compliance}%</div>
                      <div
                        className={`text-xs ${
                          institution.trend === "up"
                            ? "text-green-600"
                            : institution.trend === "down"
                              ? "text-red-600"
                              : "text-slate-500"
                        }`}
                      >
                        {institution.trend === "up" ? "↗" : institution.trend === "down" ? "↘" : "→"}
                      </div>
                    </div>
                  </div>
                  <Progress value={institution.compliance} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regulatory Reports */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Recent Regulatory Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-slate-200 rounded-lg text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">Monthly AUM Report</h4>
              <p className="text-sm text-slate-600 mb-3">January 2024</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReportGeneration("Monthly AUM Report", "regulator")}
              >
                Download
              </Button>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">Risk Assessment</h4>
              <p className="text-sm text-slate-600 mb-3">Q4 2023</p>
              <Button size="sm" variant="outline">
                Download
              </Button>
            </div>
            <div className="p-4 border border-slate-200 rounded-lg text-center">
              <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-medium text-slate-900 mb-1">Institution Registry</h4>
              <p className="text-sm text-slate-600 mb-3">Updated Daily</p>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
