"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, Clock, TrendingUp } from "lucide-react"

const dealData = {
  id: "GH-001",
  borrower: "Akasa Energy Ltd.",
  totalFacility: 50000000,
  sector: "Infrastructure",
  rating: "BBB-",
  maturity: "5 years",
  status: "Syndication Active",
}

const tranches = [
  {
    id: "senior",
    name: "Senior Tranche",
    size: 30000000,
    allocated: 22500000,
    yield: "10.5%",
    rating: "BBB",
    investors: 8,
    color: "bg-blue-600",
  },
  {
    id: "mezzanine",
    name: "Mezzanine Tranche",
    size: 15000000,
    allocated: 8750000,
    yield: "13.2%",
    rating: "BB+",
    investors: 4,
    color: "bg-purple-600",
  },
  {
    id: "subordinate",
    name: "Subordinate Tranche",
    size: 5000000,
    allocated: 1250000,
    yield: "16.8%",
    rating: "BB-",
    investors: 2,
    color: "bg-orange-600",
  },
]

export function SyndicationConsole() {
  const [selectedTranche, setSelectedTranche] = useState("senior")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const totalAllocated = tranches.reduce((sum, tranche) => sum + tranche.allocated, 0)
  const allocationPercentage = (totalAllocated / dealData.totalFacility) * 100

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-medium text-slate-900">{dealData.borrower}</CardTitle>
            <p className="text-slate-600 mt-1">
              {dealData.sector} • {formatCurrency(dealData.totalFacility)} Facility
            </p>
          </div>
          <Badge className="bg-blue-100 text-blue-800">{dealData.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTranche} onValueChange={setSelectedTranche}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {tranches.map((tranche) => (
              <TabsTrigger key={tranche.id} value={tranche.id} className="text-xs">
                {tranche.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tranches.map((tranche) => (
            <TabsContent key={tranche.id} value={tranche.id} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                  <div className="text-lg font-medium text-slate-900">{formatCurrency(tranche.size)}</div>
                  <div className="text-xs text-slate-500">Tranche Size</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-2" />
                  <div className="text-lg font-medium text-green-600">{tranche.yield}</div>
                  <div className="text-xs text-slate-500">Target Yield</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                  <div className="text-lg font-medium text-slate-900">{tranche.investors}</div>
                  <div className="text-xs text-slate-500">Investors</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                  <div className="text-lg font-medium text-slate-900">{tranche.rating}</div>
                  <div className="text-xs text-slate-500">Credit Rating</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">Allocation Progress</span>
                  <span className="text-slate-600">
                    {formatCurrency(tranche.allocated)} / {formatCurrency(tranche.size)}
                  </span>
                </div>
                <Progress value={(tranche.allocated / tranche.size) * 100} className="h-3" />
                <div className="text-xs text-slate-500">
                  {((tranche.allocated / tranche.size) * 100).toFixed(1)}% allocated
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Allocate Capital</Button>
                <Button variant="outline">View Term Sheet</Button>
                <Button variant="outline">Investor List</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-slate-900">Overall Syndication</span>
            <span className="text-slate-600">
              {formatCurrency(totalAllocated)} / {formatCurrency(dealData.totalFacility)}
            </span>
          </div>
          <Progress value={allocationPercentage} className="h-3 mb-2" />
          <div className="text-xs text-slate-500">{allocationPercentage.toFixed(1)}% of total facility syndicated</div>
        </div>
      </CardContent>
    </Card>
  )
}
