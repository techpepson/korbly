"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Plus, Minus } from "lucide-react"

export function TrancheBuilder() {
  const [trancheSize, setTrancheSize] = useState([25000000])
  const [targetYield, setTargetYield] = useState([12.5])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-slate-900">Tranche Builder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tranche-type" className="text-sm font-medium">
            Tranche Type
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select tranche type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="senior">Senior</SelectItem>
              <SelectItem value="mezzanine">Mezzanine</SelectItem>
              <SelectItem value="subordinate">Subordinate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Tranche Size: {formatCurrency(trancheSize[0])}</Label>
          <Slider
            value={trancheSize}
            onValueChange={setTrancheSize}
            max={50000000}
            min={1000000}
            step={1000000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$1M</span>
            <span>$50M</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Target Yield: {targetYield[0].toFixed(1)}%</Label>
          <Slider value={targetYield} onValueChange={setTargetYield} max={20} min={8} step={0.1} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>8.0%</span>
            <span>20.0%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rating" className="text-sm font-medium">
              Credit Rating
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aaa">AAA</SelectItem>
                <SelectItem value="aa">AA</SelectItem>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="bbb">BBB</SelectItem>
                <SelectItem value="bb">BB</SelectItem>
                <SelectItem value="b">B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maturity" className="text-sm font-medium">
              Maturity
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="7">7 Years</SelectItem>
                <SelectItem value="10">10 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Add Tranche
          </Button>
          <Button variant="outline">
            <Minus className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
