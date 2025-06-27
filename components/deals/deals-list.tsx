"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, TrendingUp, MapPin, Calendar, DollarSign } from "lucide-react"

interface DealsListProps {
  filters: any
}

const allDeals = [
  {
    id: "GH-001",
    borrower: "Akasa Energy Ltd.",
    sector: "Infrastructure",
    amount: 50,
    yield: 12.5,
    rating: "BBB",
    status: "Due Diligence",
    maturity: "5 years",
    maturityCategory: "3-5 years",
    description: "Renewable energy infrastructure development across West Africa",
    progress: 65,
    location: "Accra, Ghana",
    dateAdded: "2024-01-15",
    riskLevel: "Medium",
    minInvestment: 5,
  },
  {
    id: "GH-002",
    borrower: "Tema Construction",
    sector: "Real Estate",
    amount: 25,
    yield: 11.8,
    rating: "BB",
    status: "Syndication",
    maturity: "3 years",
    maturityCategory: "3-5 years",
    description: "Mixed-use commercial development in Accra metropolitan area",
    progress: 40,
    location: "Tema, Ghana",
    dateAdded: "2024-01-18",
    riskLevel: "Medium",
    minInvestment: 2.5,
  },
  {
    id: "GH-003",
    borrower: "Gold Coast Mining",
    sector: "Mining",
    amount: 75,
    yield: 13.2,
    rating: "BBB",
    status: "Term Sheet",
    maturity: "7 years",
    maturityCategory: "5-7 years",
    description: "Gold extraction and processing facility expansion",
    progress: 85,
    location: "Obuasi, Ghana",
    dateAdded: "2024-01-20",
    riskLevel: "High",
    minInvestment: 10,
  },
  {
    id: "GH-004",
    borrower: "AgriTech Solutions",
    sector: "Agriculture",
    amount: 30,
    yield: 10.9,
    rating: "BB",
    status: "Origination",
    maturity: "4 years",
    maturityCategory: "3-5 years",
    description: "Technology-enabled agricultural supply chain platform",
    progress: 20,
    location: "Kumasi, Ghana",
    dateAdded: "2024-01-22",
    riskLevel: "Medium",
    minInvestment: 3,
  },
  {
    id: "GH-005",
    borrower: "West Africa Logistics",
    sector: "Infrastructure",
    amount: 45,
    yield: 14.2,
    rating: "B",
    status: "Due Diligence",
    maturity: "6 years",
    maturityCategory: "5-7 years",
    description: "Regional logistics and warehousing network expansion",
    progress: 55,
    location: "Takoradi, Ghana",
    dateAdded: "2024-01-25",
    riskLevel: "High",
    minInvestment: 4.5,
  },
  {
    id: "GH-006",
    borrower: "Ghana Solar Power",
    sector: "Energy",
    amount: 80,
    yield: 12.8,
    rating: "BBB",
    status: "Syndication",
    maturity: "8 years",
    maturityCategory: "7+ years",
    description: "Large-scale solar power generation facility",
    progress: 70,
    location: "Northern Region, Ghana",
    dateAdded: "2024-01-28",
    riskLevel: "Medium",
    minInvestment: 8,
  },
  {
    id: "GH-007",
    borrower: "Digital Health Ghana",
    sector: "Healthcare",
    amount: 15,
    yield: 15.5,
    rating: "B",
    status: "Origination",
    maturity: "3 years",
    maturityCategory: "3-5 years",
    description: "Telemedicine platform for rural healthcare access",
    progress: 30,
    location: "Accra, Ghana",
    dateAdded: "2024-01-30",
    riskLevel: "High",
    minInvestment: 1.5,
  },
  {
    id: "GH-008",
    borrower: "Cocoa Processing Ltd",
    sector: "Agriculture",
    amount: 35,
    yield: 11.5,
    rating: "BBB",
    status: "Closed",
    maturity: "5 years",
    maturityCategory: "3-5 years",
    description: "Cocoa processing and export facility modernization",
    progress: 100,
    location: "Ashanti Region, Ghana",
    dateAdded: "2024-01-10",
    riskLevel: "Low",
    minInvestment: 3.5,
  },
]

export function DealsList({ filters }: DealsListProps) {
  const [sortBy, setSortBy] = useState("dateAdded")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredDeals = useMemo(() => {
    const filtered = allDeals.filter((deal) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch =
          deal.borrower.toLowerCase().includes(searchLower) ||
          deal.description.toLowerCase().includes(searchLower) ||
          deal.sector.toLowerCase().includes(searchLower) ||
          deal.location.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(deal.status)) {
        return false
      }

      // Sector filter
      if (filters.sectors.length > 0 && !filters.sectors.includes(deal.sector)) {
        return false
      }

      // Deal size filter
      if (deal.amount < filters.dealSize[0] || deal.amount > filters.dealSize[1]) {
        return false
      }

      // Yield filter
      if (deal.yield < filters.targetYield[0] || deal.yield > filters.targetYield[1]) {
        return false
      }

      // Maturity filter
      if (filters.maturity.length > 0 && !filters.maturity.includes(deal.maturityCategory)) {
        return false
      }

      // Rating filter
      if (filters.rating.length > 0 && !filters.rating.includes(deal.rating)) {
        return false
      }

      return true
    })

    // Sort deals
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [filters, sortBy, sortOrder])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Syndication":
        return "border-blue-200 text-blue-700 bg-blue-50"
      case "Due Diligence":
        return "border-yellow-200 text-yellow-700 bg-yellow-50"
      case "Term Sheet":
        return "border-green-200 text-green-700 bg-green-50"
      case "Origination":
        return "border-gray-200 text-gray-700 bg-gray-50"
      case "Closed":
        return "border-purple-200 text-purple-700 bg-purple-50"
      default:
        return "border-gray-200 text-gray-700 bg-gray-50"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {filteredDeals.length} Deal{filteredDeals.length !== 1 ? "s" : ""} Found
          </h3>
          <p className="text-sm text-gray-500">Showing investment opportunities matching your criteria</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded px-2 py-1"
          >
            <option value="dateAdded">Date Added</option>
            <option value="amount">Deal Size</option>
            <option value="yield">Yield</option>
            <option value="borrower">Company Name</option>
            <option value="rating">Credit Rating</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Deals List */}
      {filteredDeals.length === 0 ? (
        <Card className="border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <FileText className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more results.</p>
          </CardContent>
        </Card>
      ) : (
        filteredDeals.map((deal) => (
          <Card key={deal.id} className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl font-medium text-gray-900">{deal.borrower}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {deal.sector}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getRiskColor(deal.riskLevel)}`}>
                      {deal.riskLevel} Risk
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{deal.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {deal.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Added {deal.dateAdded}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Min: ${deal.minInvestment}M
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(deal.status)}>
                  {deal.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Deal Size</div>
                  <div className="text-lg font-semibold text-gray-900">${deal.amount}M</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Target Yield</div>
                  <div className="text-lg font-semibold text-green-600">{deal.yield}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Credit Rating</div>
                  <div className="text-lg font-semibold text-gray-900">{deal.rating}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Maturity</div>
                  <div className="text-lg font-semibold text-gray-900">{deal.maturity}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Progress</div>
                  <div className="text-lg font-semibold text-gray-900">{deal.progress}%</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Review
                  </Button>
                  <Button size="sm" variant="outline" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documents
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Allocate
                  </Button>
                </div>

                <div className="text-sm text-gray-500">
                  ID: {deal.id} • Updated {deal.dateAdded}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
