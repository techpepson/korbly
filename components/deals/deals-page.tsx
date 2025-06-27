"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DealsList } from "@/components/deals/deals-list"
import { DealsFilters } from "@/components/deals/deals-filters"

export function DealsPage() {
  const [filters, setFilters] = useState({
    status: [],
    sectors: [],
    dealSize: [1, 200],
    targetYield: [5, 20],
    maturity: [],
    rating: [],
    searchTerm: "",
  })

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900">Deal Pipeline</h1>
            <p className="text-gray-600 mt-1">Active and upcoming investment opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DealsFilters onFiltersChange={handleFiltersChange} />
          </div>
          <div className="lg:col-span-3">
            <DealsList filters={filters} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
