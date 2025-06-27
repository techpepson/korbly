"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react"

const loanApplications = [
  {
    id: "APP-001",
    type: "Working Capital Loan",
    amount: "GH₵ 500,000",
    purpose: "Inventory expansion and operational cash flow",
    status: "Under Review",
    submittedDate: "2024-01-15",
    progress: 65,
    nextStep: "Credit assessment in progress",
    officer: "Sarah Mensah",
  },
  {
    id: "APP-002",
    type: "Equipment Finance",
    amount: "GH₵ 1,200,000",
    purpose: "Manufacturing equipment upgrade",
    status: "Approved",
    submittedDate: "2024-01-10",
    progress: 100,
    nextStep: "Disbursement scheduled",
    officer: "Kwame Asante",
  },
  {
    id: "APP-003",
    type: "Trade Finance",
    amount: "GH₵ 800,000",
    purpose: "Export order fulfillment",
    status: "Documentation Required",
    submittedDate: "2024-01-20",
    progress: 40,
    nextStep: "Submit export contracts",
    officer: "Ama Osei",
  },
  {
    id: "APP-004",
    type: "Expansion Loan",
    amount: "GH₵ 2,000,000",
    purpose: "New branch opening in Kumasi",
    status: "Initial Review",
    submittedDate: "2024-01-25",
    progress: 20,
    nextStep: "Business plan review",
    officer: "John Boateng",
  },
]

const applicationStats = [
  { label: "Total Applications", value: "12", change: "+3 this month" },
  { label: "Approved Amount", value: "GH₵ 3.2M", change: "Lifetime" },
  { label: "Pending Review", value: "2", change: "Active" },
  { label: "Success Rate", value: "85%", change: "Historical" },
]

export function ApplicationsPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "sme")
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "border-green-200 text-green-700 bg-green-50"
      case "Under Review":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "Documentation Required":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "Initial Review":
        return "border-gray-200 text-gray-700 bg-gray-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Under Review":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Documentation Required":
        return <AlertCircle className="w-4 h-4 text-blue-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Loan Applications</h1>
            <p className="text-gray-600 mt-1">Track and manage your funding applications</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Application
          </Button>
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {applicationStats.map((stat, index) => (
            <Card key={index} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-slate-600 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications List */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loanApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(app.status)}
                        <h4 className="font-medium text-slate-900">{app.type}</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{app.purpose}</p>
                      <div className="text-lg font-semibold text-slate-900">{app.amount}</div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium">{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                    <div className="text-sm text-slate-600">
                      <strong>Next Step:</strong> {app.nextStep}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-500">
                      <span>Submitted: {app.submittedDate}</span>
                      <span className="mx-2">•</span>
                      <span>Officer: {app.officer}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {app.status === "Documentation Required" && <Button size="sm">Upload Documents</Button>}
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
