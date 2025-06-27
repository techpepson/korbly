"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, AlertCircle, CheckCircle, Clock, CreditCard } from "lucide-react"

const upcomingPayments = [
  {
    id: "PAY-001",
    description: "Working Capital Loan - Monthly Payment",
    amount: "GH₵ 45,000",
    dueDate: "2024-02-15",
    status: "due",
    loanId: "LOAN-001",
    type: "Principal + Interest",
  },
  {
    id: "PAY-002",
    description: "Equipment Finance - Quarterly Payment",
    amount: "GH₵ 125,000",
    dueDate: "2024-02-28",
    status: "upcoming",
    loanId: "LOAN-002",
    type: "Principal + Interest",
  },
  {
    id: "PAY-003",
    description: "Trade Finance - Processing Fee",
    amount: "GH₵ 8,500",
    dueDate: "2024-03-05",
    status: "upcoming",
    loanId: "LOAN-003",
    type: "Fee",
  },
  {
    id: "PAY-004",
    description: "Expansion Loan - Interest Payment",
    amount: "GH₵ 32,000",
    dueDate: "2024-03-15",
    status: "upcoming",
    loanId: "LOAN-004",
    type: "Interest Only",
  },
]

const paymentHistory = [
  {
    id: "HIST-001",
    description: "Working Capital Loan - January Payment",
    amount: "GH₵ 45,000",
    paidDate: "2024-01-15",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "HIST-002",
    description: "Equipment Finance - Q4 Payment",
    amount: "GH₵ 125,000",
    paidDate: "2024-01-10",
    status: "completed",
    method: "Direct Debit",
  },
  {
    id: "HIST-003",
    description: "Trade Finance - Setup Fee",
    amount: "GH₵ 15,000",
    paidDate: "2024-01-05",
    status: "completed",
    method: "Bank Transfer",
  },
]

const paymentSummary = [
  { label: "Total Outstanding", value: "GH₵ 1,200,000", change: "Principal balance" },
  { label: "Monthly Payments", value: "GH₵ 210,500", change: "Average" },
  { label: "Next Payment", value: "GH₵ 45,000", change: "Due Feb 15" },
  { label: "Payment Score", value: "Excellent", change: "100% on-time" },
]

export function PaymentsPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "sme")
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due":
        return "border-red-200 text-red-700 bg-red-50"
      case "upcoming":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "completed":
        return "border-green-200 text-green-700 bg-green-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "due":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "upcoming":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Payment Management</h1>
            <p className="text-gray-600 mt-1">Track and manage your loan payments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Payment History</Button>
            <Button>Setup Auto-Pay</Button>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {paymentSummary.map((summary, index) => (
            <Card key={index} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="text-2xl font-bold text-slate-900 mb-1">{summary.value}</div>
                <div className="text-sm font-medium text-slate-600 mb-1">{summary.label}</div>
                <div className="text-xs text-slate-500">{summary.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Payments */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(payment.status)}
                      <div>
                        <h4 className="font-medium text-slate-900">{payment.description}</h4>
                        <p className="text-sm text-slate-600">{payment.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-slate-900">{payment.amount}</div>
                      <Badge variant="outline" className={getStatusColor(payment.status)}>
                        {payment.status === "due" ? "Due Now" : "Upcoming"}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      <span>Due: {payment.dueDate}</span>
                      <span className="mx-2">•</span>
                      <span>Loan: {payment.loanId}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {payment.status === "due" && (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Recent Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{payment.description}</div>
                    <div className="text-sm text-slate-500">
                      Paid on {payment.paidDate} via {payment.method}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{payment.amount}</div>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-slate-900">Bank Transfer</h4>
                    <p className="text-sm text-slate-600">Direct bank transfer</p>
                  </div>
                </div>
                <div className="text-sm text-slate-500">Account: ****1234 (Primary)</div>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-slate-900">Auto-Debit</h4>
                    <p className="text-sm text-slate-600">Automatic payments</p>
                  </div>
                </div>
                <div className="text-sm text-slate-500">Setup for monthly payments</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
