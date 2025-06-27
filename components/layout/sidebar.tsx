"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Building2,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Lock,
  Settings,
  AlertTriangle,
  Server,
} from "lucide-react"

const getNavigationForUserType = (userType: string) => {
  switch (userType) {
    case "sme":
      return [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Loan Applications", href: "/applications", icon: FileText },
        { name: "Business Metrics", href: "/metrics", icon: TrendingUp },
        { name: "Payments", href: "/payments", icon: Building2 },
        { name: "Documents", href: "/documents", icon: FileText },
        { name: "Support", href: "/compliance", icon: Shield },
      ]

    case "regulator":
      return [
        { name: "Oversight", href: "/dashboard", icon: Shield },
        { name: "Institutions", href: "/institutions", icon: Building2 },
        { name: "Compliance", href: "/compliance", icon: FileText },
        { name: "Risk Monitoring", href: "/risk", icon: AlertTriangle },
        { name: "Reports", href: "/reports", icon: BarChart3 },
        { name: "Audit Trail", href: "/audit", icon: FileText },
      ]

    case "admin":
      return [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "User Management", href: "/users", icon: Users },
        { name: "System Health", href: "/system", icon: Server },
        { name: "Deal Management", href: "/deals", icon: TrendingUp },
        { name: "Platform Settings", href: "/settings", icon: Settings },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
      ]

    case "hnwi":
    case "institutional":
    case "insurer":
    default:
      return [
        { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
        { name: "Deal Pipeline", href: "/deals", icon: TrendingUp },
        { name: "Syndication", href: "/syndication", icon: Users },
        { name: "Portfolio", href: "/portfolio", icon: Building2 },
        { name: "Valuation", href: "/valuation", icon: BarChart3 },
        { name: "Term Sheets", href: "/terms", icon: FileText },
        { name: "Compliance", href: "/compliance", icon: Shield },
      ]
  }
}

export function Sidebar() {
  const [currentPath, setCurrentPath] = useState("/dashboard")
  const [userType, setUserType] = useState("")
  const [notifications] = useState(3)

  useEffect(() => {
    setCurrentPath(window.location.pathname)
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const navigation = getNavigationForUserType(userType)

  const handleNavigation = (href: string) => {
    setCurrentPath(href)
    window.location.href = href
  }

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "sme":
        return "SME"
      case "regulator":
        return "Regulator"
      case "admin":
        return "Admin"
      case "hnwi":
        return "HNWI"
      case "institutional":
        return "Institutional"
      case "insurer":
        return "Insurance"
      default:
        return "User"
    }
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200">
      <div className="flex h-20 items-center justify-between px-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-light text-gray-900">Korbly</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-green-600" />
          <Badge
            variant="secondary"
            className={`text-xs ${
              userType === "admin"
                ? "bg-purple-100 text-purple-800"
                : userType === "regulator"
                  ? "bg-blue-100 text-blue-800"
                  : userType === "sme"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {getUserTypeLabel(userType)}
          </Badge>
        </div>
      </div>

      <nav className="mt-8 px-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Button
                variant={currentPath === item.href ? "secondary" : "ghost"}
                className={`w-full justify-start h-12 font-normal text-left ${
                  currentPath === item.href
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className="w-5 h-5 mr-4" />
                {item.name}
                {item.name === "Deal Pipeline" &&
                  userType !== "sme" &&
                  userType !== "regulator" &&
                  notifications > 0 && (
                    <Badge className="ml-auto bg-blue-600 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                      {notifications}
                    </Badge>
                  )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-2">
          <div className="flex items-center justify-between">
            <span>Session Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-logout</span>
            <span className="font-medium">14:32</span>
          </div>
          <div className="text-center pt-2 text-gray-400">🔒 End-to-end encrypted</div>
        </div>
      </div>
    </div>
  )
}
