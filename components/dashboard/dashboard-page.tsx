"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { OverviewCards } from "@/components/dashboard/overview-cards"
import { DealPipeline } from "@/components/dashboard/deal-pipeline"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { SMEDashboard } from "@/components/dashboard/sme-dashboard"
import { RegulatorDashboard } from "@/components/dashboard/regulator-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export function DashboardPage() {
  const [userType, setUserType] = useState<string>("")

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "hnwi"
    setUserType(storedUserType)
  }, [])

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "hnwi":
        return "High Net Worth Individual"
      case "institutional":
        return "Institutional Investor"
      case "insurer":
        return "Insurance/Reinsurance"
      case "regulator":
        return "Regulatory Authority"
      case "admin":
        return "Platform Administrator"
      case "sme":
        return "SME Business"
      default:
        return "Investor"
    }
  }

  const getDashboardTitle = (type: string) => {
    switch (type) {
      case "regulator":
        return "Regulatory Oversight"
      case "admin":
        return "Platform Administration"
      case "sme":
        return "Business Dashboard"
      default:
        return "Investment Dashboard"
    }
  }

  const renderDashboardContent = () => {
    switch (userType) {
      case "sme":
        return <SMEDashboard />

      case "regulator":
        return <RegulatorDashboard />

      case "admin":
        return <AdminDashboard />

      case "hnwi":
      case "institutional":
      case "insurer":
      default:
        return (
          <>
            <OverviewCards userType={userType} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <DealPipeline />
              <PortfolioSummary />
            </div>
            <RecentActivity />
          </>
        )
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">{getDashboardTitle(userType)}</h1>
            <p className="text-gray-600 mt-1">{getUserTypeLabel(userType)} Overview</p>
          </div>
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
        </div>

        {renderDashboardContent()}
      </div>
    </DashboardLayout>
  )
}
