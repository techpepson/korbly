"use client"

import { useEffect, useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DocumentUpload } from "@/components/documents/document-upload"

export function DocumentsPage() {
  const [userType, setUserType] = useState<"investor" | "sme">("sme")

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType") || "sme"
    // Map user types to document categories
    if (storedUserType === "hnwi" || storedUserType === "institutional" || storedUserType === "insurer") {
      setUserType("investor")
    } else {
      setUserType("sme")
    }
  }, [])

  const handleFileUpload = (files: File[]) => {
    console.log("Files uploaded:", files)
    // Here you would typically send files to your backend
    // For now, we're just handling them locally
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Document Management</h1>
            <p className="text-gray-600 mt-1">
              Upload and manage your {userType === "investor" ? "investment" : "business"} documentation
            </p>
          </div>
        </div>

        <DocumentUpload userType={userType} onUpload={handleFileUpload} />
      </div>
    </DashboardLayout>
  )
}
