"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Edit, Eye, Plus } from "lucide-react"

const termSheets = [
  {
    id: "TS-001",
    dealName: "Akasa Energy Ltd. - Senior Facility",
    amount: "$50M",
    type: "Senior Debt",
    status: "Executed",
    createdDate: "2024-01-15",
    expiryDate: "2024-02-15",
    yield: "12.5%",
    maturity: "5 years",
    version: "v2.1",
  },
  {
    id: "TS-002",
    dealName: "Tema Construction - Mezzanine",
    amount: "$25M",
    type: "Mezzanine",
    status: "Under Review",
    createdDate: "2024-01-20",
    expiryDate: "2024-02-20",
    yield: "15.8%",
    maturity: "3 years",
    version: "v1.3",
  },
  {
    id: "TS-003",
    dealName: "Gold Coast Mining - Expansion",
    amount: "$75M",
    type: "Senior Debt",
    status: "Draft",
    createdDate: "2024-01-22",
    expiryDate: "2024-02-22",
    yield: "13.2%",
    maturity: "7 years",
    version: "v1.0",
  },
  {
    id: "TS-004",
    dealName: "AgriTech Solutions - Working Capital",
    amount: "$30M",
    type: "Revolving Credit",
    status: "Negotiation",
    createdDate: "2024-01-25",
    expiryDate: "2024-02-25",
    yield: "10.9%",
    maturity: "2 years",
    version: "v1.5",
  },
]

const termSheetTemplates = [
  {
    name: "Senior Debt Facility",
    description: "Standard senior debt term sheet template",
    category: "Debt",
    lastUsed: "2024-01-20",
  },
  {
    name: "Mezzanine Financing",
    description: "Mezzanine debt with equity kicker",
    category: "Hybrid",
    lastUsed: "2024-01-18",
  },
  {
    name: "Revolving Credit Line",
    description: "Working capital revolving facility",
    category: "Credit",
    lastUsed: "2024-01-15",
  },
  {
    name: "Subordinated Debt",
    description: "Junior debt facility template",
    category: "Debt",
    lastUsed: "2024-01-10",
  },
]

export function TermSheetsPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Executed":
        return "border-green-200 text-green-700 bg-green-50"
      case "Under Review":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "Negotiation":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "Draft":
        return "border-gray-200 text-gray-700 bg-gray-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Senior Debt":
        return "bg-blue-100 text-blue-800"
      case "Mezzanine":
        return "bg-purple-100 text-purple-800"
      case "Revolving Credit":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Term Sheets</h1>
            <p className="text-gray-600 mt-1">Manage investment term sheets and documentation</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">Import Template</Button>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Term Sheet
            </Button>
          </div>
        </div>

        {/* Term Sheets List */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Active Term Sheets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {termSheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-slate-900">{sheet.dealName}</h4>
                        <p className="text-sm text-slate-600">
                          ID: {sheet.id} • Version: {sheet.version}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(sheet.type)}>{sheet.type}</Badge>
                      <Badge variant="outline" className={getStatusColor(sheet.status)}>
                        {sheet.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-slate-500">Amount:</span>
                      <div className="font-semibold text-slate-900">{sheet.amount}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Yield:</span>
                      <div className="font-semibold text-green-600">{sheet.yield}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Maturity:</span>
                      <div className="font-medium text-slate-900">{sheet.maturity}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Created:</span>
                      <div className="font-medium text-slate-900">{sheet.createdDate}</div>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500">Expires:</span>
                      <div className="font-medium text-slate-900">{sheet.expiryDate}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">Last modified: {sheet.createdDate}</div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Templates */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Term Sheet Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {termSheetTemplates.map((template, index) => (
                <div
                  key={index}
                  className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">Last used: {template.lastUsed}</div>
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Term Sheet Builder */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Quick Term Sheet Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Deal Structure</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Facility Type</label>
                    <select className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                      <option>Senior Debt</option>
                      <option>Mezzanine</option>
                      <option>Revolving Credit</option>
                      <option>Subordinated Debt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Amount ($M)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Maturity (Years)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Pricing Terms</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="12.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Arrangement Fee (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="2.0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Payment Frequency</label>
                    <select className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Semi-Annual</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-slate-900">Security & Covenants</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">Security Type</label>
                    <select className="w-full p-2 border border-slate-200 rounded-lg text-sm">
                      <option>First Charge</option>
                      <option>Second Charge</option>
                      <option>Unsecured</option>
                      <option>Guarantee</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 mb-1">LTV Ratio (%)</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="75"
                    />
                  </div>
                  <div className="pt-2">
                    <Button className="w-full">Generate Term Sheet</Button>
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
