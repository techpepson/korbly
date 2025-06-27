"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, AlertCircle } from "lucide-react"
import { handleApplicationAction, handlePayment } from "@/utils/button-handlers"

const loanApplications = [
  {
    id: "APP-001",
    type: "Working Capital",
    amount: "GH₵ 500,000",
    status: "Under Review",
    submittedDate: "2024-01-15",
    progress: 65,
  },
  {
    id: "APP-002",
    type: "Equipment Finance",
    amount: "GH₵ 1,200,000",
    status: "Approved",
    submittedDate: "2024-01-10",
    progress: 100,
  },
  {
    id: "APP-003",
    type: "Trade Finance",
    amount: "GH₵ 800,000",
    status: "Documentation",
    submittedDate: "2024-01-20",
    progress: 40,
  },
]

const businessMetrics = [
  { label: "Monthly Revenue", value: "GH₵ 450,000", change: "+12%", trend: "up" },
  { label: "Profit Margin", value: "18.5%", change: "+2.1%", trend: "up" },
  { label: "Cash Flow", value: "GH₵ 85,000", change: "+8%", trend: "up" },
  { label: "Debt-to-Equity", value: "0.45", change: "-0.05", trend: "up" },
]

const upcomingPayments = [
  { description: "Working Capital Loan", amount: "GH₵ 45,000", dueDate: "2024-02-15", status: "due", id: "PAY-001" },
  { description: "Equipment Finance", amount: "GH₵ 125,000", dueDate: "2024-02-28", status: "upcoming", id: "PAY-002" },
  { description: "Trade Finance Fee", amount: "GH₵ 8,500", dueDate: "2024-03-05", status: "upcoming", id: "PAY-003" },
]

const handleViewApplication = (appId: string) => {
  window.location.href = `/applications?id=${appId}`
}

const handlePayNow = (paymentId: string) => {
  window.location.href = `/payments?pay=${paymentId}`
}

const handleUploadDocuments = () => {
  window.location.href = "/documents"
}

export function SMEDashboard() {
  return (
    <div className="space-y-8">
      {/* Loan Applications */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Loan Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loanApplications.map((app) => (
              <div key={app.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-slate-900">{app.type}</h4>
                    <p className="text-sm text-slate-600">{app.amount}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      app.status === "Approved"
                        ? "border-green-200 text-green-700 bg-green-50"
                        : app.status === "Under Review"
                          ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                          : "border-blue-200 text-blue-700 bg-blue-50"
                    }`}
                  >
                    {app.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Progress</span>
                    <span className="font-medium">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Submitted: {app.submittedDate}</span>
                  <Button size="sm" variant="outline" onClick={() => handleApplicationAction("view", app.id)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Business Performance */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Business Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{metric.value}</div>
                    <div className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingPayments.map((payment, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                  <div
                    className={`p-2 rounded-lg ${
                      payment.status === "due" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {payment.status === "due" ? <AlertCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{payment.description}</div>
                    <div className="text-sm text-slate-500">Due: {payment.dueDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{payment.amount}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-1"
                      onClick={() => handlePayment(payment.id, payment.amount)}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
