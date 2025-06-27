"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

interface DealsFiltersProps {
  onFiltersChange: (filters: any) => void
}

export function DealsFilters({ onFiltersChange }: DealsFiltersProps) {
  const [filters, setFilters] = useState({
    status: [] as string[],
    sectors: [] as string[],
    dealSize: [1, 200] as number[],
    targetYield: [5, 20] as number[],
    maturity: [] as string[],
    rating: [] as string[],
    searchTerm: "",
  })

  const updateFilters = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked ? [...filters.status, status] : filters.status.filter((s) => s !== status)
    updateFilters({ status: newStatus })
  }

  const handleSectorChange = (sector: string, checked: boolean) => {
    const newSectors = checked ? [...filters.sectors, sector] : filters.sectors.filter((s) => s !== sector)
    updateFilters({ sectors: newSectors })
  }

  const handleMaturityChange = (maturity: string, checked: boolean) => {
    const newMaturity = checked ? [...filters.maturity, maturity] : filters.maturity.filter((m) => m !== maturity)
    updateFilters({ maturity: newMaturity })
  }

  const handleRatingChange = (rating: string, checked: boolean) => {
    const newRating = checked ? [...filters.rating, rating] : filters.rating.filter((r) => r !== rating)
    updateFilters({ rating: newRating })
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      status: [],
      sectors: [],
      dealSize: [1, 200],
      targetYield: [5, 20],
      maturity: [],
      rating: [],
      searchTerm: "",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <Card className="border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Search</Label>
          <Input
            placeholder="Search deals..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="w-full"
          />
        </div>

        {/* Deal Status */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Deal Status</Label>
          <div className="space-y-3">
            {["Origination", "Due Diligence", "Syndication", "Term Sheet", "Closed"].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <Label htmlFor={status} className="text-sm text-gray-600">
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Sector */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Sector</Label>
          <div className="space-y-3">
            {[
              "Infrastructure",
              "Energy",
              "Real Estate",
              "Mining",
              "Agriculture",
              "Technology",
              "Manufacturing",
              "Healthcare",
            ].map((sector) => (
              <div key={sector} className="flex items-center space-x-2">
                <Checkbox
                  id={sector}
                  checked={filters.sectors.includes(sector)}
                  onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                />
                <Label htmlFor={sector} className="text-sm text-gray-600">
                  {sector}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Size */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Deal Size: ${filters.dealSize[0]}M - ${filters.dealSize[1]}M
          </Label>
          <Slider
            value={filters.dealSize}
            onValueChange={(value) => updateFilters({ dealSize: value })}
            max={200}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$1M</span>
            <span>$200M</span>
          </div>
        </div>

        {/* Target Yield */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Target Yield: {filters.targetYield[0]}% - {filters.targetYield[1]}%
          </Label>
          <Slider
            value={filters.targetYield}
            onValueChange={(value) => updateFilters({ targetYield: value })}
            max={20}
            min={5}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>5%</span>
            <span>20%</span>
          </div>
        </div>

        {/* Maturity */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Maturity</Label>
          <div className="space-y-3">
            {["1-2 years", "3-5 years", "5-7 years", "7+ years"].map((maturity) => (
              <div key={maturity} className="flex items-center space-x-2">
                <Checkbox
                  id={maturity}
                  checked={filters.maturity.includes(maturity)}
                  onCheckedChange={(checked) => handleMaturityChange(maturity, checked as boolean)}
                />
                <Label htmlFor={maturity} className="text-sm text-gray-600">
                  {maturity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Credit Rating */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Credit Rating</Label>
          <div className="space-y-3">
            {["AAA", "AA", "A", "BBB", "BB", "B", "Below B"].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={rating}
                  checked={filters.rating.includes(rating)}
                  onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                />
                <Label htmlFor={rating} className="text-sm text-gray-600">
                  {rating}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply Filters (
          {filters.status.length + filters.sectors.length + filters.maturity.length + filters.rating.length} active)
        </Button>
      </CardContent>
    </Card>
  )
}
