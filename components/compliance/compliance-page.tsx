"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, FileText, Clock } from "lucide-react"

const complianceItems = [
  {
    category: "KYC Documentation",
    status: "Compliant",
    lastReview: "2024-01-15",
    nextReview: "2024-07-15",
    progress: 100,
    items: ["Identity Verification", "Address Proof", "Business Registration"],
  },
  {
    category: "Financial Reporting",
    status: "Pending",
    lastReview: "2023-12-20",
    nextReview: "2024-02-20",
    progress: 75,
    items: ["Annual Statements", "Tax Returns", "Audit Report"],
  },
  {
    category: "Regulatory Filings",
    status: "Compliant",
    lastReview: "2024-01-10",
    nextReview: "2024-04-10",
    progress: 100,
    items: ["SEC Filings", "BoG Reports", "GIPC Registration"],
  },
  {
    category: "Risk Assessment",
    status: "Review Required",
    lastReview: "2023-11-30",
    nextReview: "2024-02-28",
    progress: 60,
    items: ["Credit Risk", "Operational Risk", "Market Risk"],
  },
]

const auditTrail = [
  {
    action: "Document Upload",
    description: "Annual Financial Statements uploaded",
    timestamp: "2024-01-20 14:30",
    user: "Finance Team",
    status: "Completed",
  },
  {
    action: "Compliance Review",
    description: "KYC documentation reviewed and approved",
    timestamp: "2024-01-15 09:15",
    user: "Compliance Officer",
    status: "Approved",
  },
  {
    action: "Risk Assessment",
    description: "Quarterly risk assessment initiated",
    timestamp: "2024-01-10 11:45",
    user: "Risk Manager",
    status: "In Progress",
  },
]

const regulatoryUpdates = [
  {
    title: "New AML Guidelines",
    description: "Updated anti-money laundering requirements effective March 2024",
    date: "2024-01-25",
    priority: "High",
    action: "Review Required",
  },
  {
    title: "Capital Adequacy Ratios",
    description: "Revised minimum capital requirements for financial institutions",
    date: "2024-01-20",
    priority: "Medium",
    action: "Monitor",
  },
  {
    title: "Data Protection Updates",
    description: "Enhanced data privacy regulations for customer information",
    date: "2024-01-18",
    priority: "Medium",
    action: "Implement",
  },
]

export function CompliancePage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Compliant":
      case "Approved":
      case "Completed":
        return "border-green-200 text-green-700 bg-green-50"
      case "Pending":
      case "In Progress":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "Review Required":
        return "border-red-200 text-red-700 bg-red-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Compliant":
      case "Approved":
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pending":
      case "In Progress":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Review Required":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
            <h1 className="text-3xl font-light text-gray-900">Compliance Dashboard</h1>
            <p className="text-gray-600 mt-1">Regulatory compliance and audit management</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Generate Report</Button>
            <Button>Schedule Review</Button>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">92%</div>
              <div className="text-sm text-slate-600">Compliance Score</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">3</div>
              <div className="text-sm text-slate-600">Items Compliant</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">1</div>
              <div className="text-sm text-slate-600">Needs Review</div>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 mb-1">2</div>
              <div className="text-sm text-slate-600">Due This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Items */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceItems.map((item, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium text-slate-900">{item.category}</h4>
                        <p className="text-sm text-slate-600">{item.items.join(", ")}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Completion</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-slate-500">
                      <span>Last Review: {item.lastReview}</span>
                      <span className="mx-2">•</span>
                      <span>Next Review: {item.nextReview}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {item.status === "Review Required" && <Button size="sm">Update</Button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Audit Trail */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditTrail.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{activity.action}</div>
                      <div className="text-sm text-slate-600">{activity.description}</div>
                      <div className="text-xs text-slate-500">
                        {activity.timestamp} by {activity.user}
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regulatory Updates */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Regulatory Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regulatoryUpdates.map((update, index) => (
                  <div key={index} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{update.title}</h4>
                      <span className={`text-sm font-medium ${getPriorityColor(update.priority)}`}>
                        {update.priority}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{update.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">{update.date}</div>
                      <Button size="sm" variant="outline">
                        {update.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Checklist */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Monthly Compliance Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Required Actions</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" checked className="w-4 h-4 text-blue-600" readOnly />
                    <span className="text-sm text-slate-700">Submit monthly financial report</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" checked className="w-4 h-4 text-blue-600" readOnly />
                    <span className="text-sm text-slate-700">Update risk assessment</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Review regulatory changes</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-700">Conduct internal audit</span>
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Upcoming Deadlines</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-red-50 border border-red-200 rounded text-sm">
                    <div className="font-medium text-red-900">Feb 15, 2024</div>
                    <div className="text-red-700">Quarterly compliance report due</div>
                  </div>
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <div className="font-medium text-yellow-900">Feb 28, 2024</div>
                    <div className="text-yellow-700">Risk assessment review</div>
                  </div>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <div className="font-medium text-blue-900">Mar 15, 2024</div>
                    <div className="text-blue-700">Annual audit preparation</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
