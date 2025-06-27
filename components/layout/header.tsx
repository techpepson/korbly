"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, LogOut, Settings } from "lucide-react"

export function Header() {
  const [userEmail, setUserEmail] = useState("")
  const [userType, setUserType] = useState("")

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail") || "user@example.com")
    setUserType(localStorage.getItem("userType") || "hnwi")
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case "hnwi":
        return "HNWI"
      case "institutional":
        return "Institutional"
      case "insurer":
        return "Insurance"
      case "regulator":
        return "Regulatory"
      case "admin":
        return "Admin"
      default:
        return "User"
    }
  }

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
      <div className="flex items-center gap-6">
        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
          {getUserTypeLabel(userType)} Access
        </Badge>
        <span className="text-sm text-gray-500">
          Last login: {new Date().toLocaleDateString()} at{" "}
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} GMT
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-600 text-white text-xs">
            2
          </Badge>
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="w-5 h-5 text-gray-600" />
        </Button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{userEmail.split("@")[0]}</div>
            <div className="text-gray-500">Verified</div>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
