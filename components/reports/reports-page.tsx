"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ReportGenerator } from "@/components/reports/report-generator"

export function ReportsPage() {
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const handleReportGenerate = (reportType: string, format: string) => {
    console.log(`Generated ${reportType} in ${format} format`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Generate and download comprehensive reports</p>
          </div>
        </div>

        <ReportGenerator userType={userType} onGenerate={handleReportGenerate} />
      </div>
    </DashboardLayout>
  )
}
