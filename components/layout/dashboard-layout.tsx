"use client"

import type { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-80">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}
