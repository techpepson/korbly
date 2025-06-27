"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart3, TrendingUp, Calendar } from "lucide-react"

interface ReportGeneratorProps {
  userType: string
  onGenerate?: (reportType: string, format: string) => void
}

const reportTypes = {
  investor: [
    {
      name: "Portfolio Performance Report",
      description: "Comprehensive portfolio analysis with returns and risk metrics",
      formats: ["PDF", "Excel"],
      icon: TrendingUp,
    },
    {
      name: "Deal Pipeline Summary",
      description: "Current investment opportunities and pipeline status",
      formats: ["PDF", "Excel"],
      icon: BarChart3,
    },
    {
      name: "Compliance Report",
      description: "Regulatory compliance status and documentation",
      formats: ["PDF"],
      icon: FileText,
    },
    {
      name: "Monthly Investment Statement",
      description: "Monthly summary of investments and transactions",
      formats: ["PDF", "Excel"],
      icon: Calendar,
    },
  ],
  sme: [
    {
      name: "Business Performance Report",
      description: "Financial metrics and business KPI analysis",
      formats: ["PDF", "Excel"],
      icon: BarChart3,
    },
    {
      name: "Loan Application Summary",
      description: "Status of all loan applications and requirements",
      formats: ["PDF"],
      icon: FileText,
    },
    {
      name: "Payment Schedule Report",
      description: "Upcoming payments and payment history",
      formats: ["PDF", "Excel"],
      icon: Calendar,
    },
    {
      name: "Financial Health Report",
      description: "Credit score, ratios, and financial health metrics",
      formats: ["PDF"],
      icon: TrendingUp,
    },
  ],
  regulator: [
    {
      name: "Institution Compliance Report",
      description: "Compliance status across all regulated institutions",
      formats: ["PDF", "Excel"],
      icon: FileText,
    },
    {
      name: "Market Risk Assessment",
      description: "System-wide risk analysis and monitoring",
      formats: ["PDF", "Excel"],
      icon: BarChart3,
    },
    {
      name: "Regulatory Audit Trail",
      description: "Complete audit trail of regulatory activities",
      formats: ["PDF"],
      icon: Calendar,
    },
  ],
  admin: [
    {
      name: "Platform Analytics Report",
      description: "User activity, system performance, and platform metrics",
      formats: ["PDF", "Excel"],
      icon: BarChart3,
    },
    {
      name: "System Health Report",
      description: "Technical system status and performance metrics",
      formats: ["PDF"],
      icon: TrendingUp,
    },
    {
      name: "Revenue Report",
      description: "Platform revenue, fees, and financial performance",
      formats: ["PDF", "Excel"],
      icon: Calendar,
    },
  ],
}

export function ReportGenerator({ userType, onGenerate }: ReportGeneratorProps) {
  const [generatingReports, setGeneratingReports] = useState<{ [key: string]: boolean }>({})

  const getUserReports = () => {
    if (userType === "sme") return reportTypes.sme
    if (userType === "regulator") return reportTypes.regulator
    if (userType === "admin") return reportTypes.admin
    return reportTypes.investor
  }

  const generateReport = async (reportName: string, format: string) => {
    const reportKey = `${reportName}-${format}`
    setGeneratingReports((prev) => ({ ...prev, [reportKey]: true }))

    // Simulate report generation
    setTimeout(() => {
      // Create a sample report content
      const reportContent = generateReportContent(reportName, format, userType)

      // Create and download the file
      const blob = new Blob([reportContent], {
        type:
          format === "PDF" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${reportName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.${format.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setGeneratingReports((prev) => ({ ...prev, [reportKey]: false }))

      if (onGenerate) {
        onGenerate(reportName, format)
      }
    }, 2000)
  }

  const reports = getUserReports()

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Generate Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <report.icon className="w-5 h-5 text-blue-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900">{report.name}</h4>
                    <p className="text-sm text-slate-600">{report.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {report.formats.map((format) => {
                    const reportKey = `${report.name}-${format}`
                    const isGenerating = generatingReports[reportKey]

                    return (
                      <Button
                        key={format}
                        size="sm"
                        variant="outline"
                        onClick={() => generateReport(report.name, format)}
                        disabled={isGenerating}
                        className="flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        {isGenerating ? "Generating..." : `${format}`}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function generateReportContent(reportName: string, format: string, userType: string): string {
  const currentDate = new Date().toLocaleDateString()

  if (format === "PDF") {
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
50 750 Td
(${reportName}) Tj
0 -20 Td
(Generated on: ${currentDate}) Tj
0 -20 Td
(User Type: ${userType}) Tj
0 -40 Td
(This is a sample report generated by Korbly Platform.) Tj
0 -20 Td
(Report contains comprehensive data analysis and insights.) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000251 00000 n 
0000000504 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
581
%%EOF`
  } else {
    // Excel format (simplified CSV for demo)
    return `Report Name,${reportName}
Generated On,${currentDate}
User Type,${userType}

Section,Value,Description
Total Assets,$1,250,000,Current portfolio value
Monthly Return,2.5%,Last month performance
Risk Score,B+,Current risk rating
Compliance Status,Compliant,Regulatory status

This is a sample Excel report generated by Korbly Platform.
Contains comprehensive data analysis and insights.`
  }
}
