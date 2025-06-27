import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const allocations = [
  { sector: "Infrastructure", amount: "$4.2M", percentage: 34, color: "bg-blue-600" },
  { sector: "Energy", amount: "$3.1M", percentage: 25, color: "bg-green-600" },
  { sector: "Real Estate", amount: "$2.8M", percentage: 23, color: "bg-purple-600" },
  { sector: "Trade Finance", amount: "$1.5M", percentage: 12, color: "bg-orange-600" },
  { sector: "Other", amount: "$0.8M", percentage: 6, color: "bg-slate-600" },
]

export function PortfolioSummary() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-slate-900">Portfolio Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allocations.map((allocation) => (
            <div key={allocation.sector} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{allocation.sector}</span>
                <div className="text-right">
                  <div className="font-medium">{allocation.amount}</div>
                  <div className="text-slate-500">{allocation.percentage}%</div>
                </div>
              </div>
              <Progress value={allocation.percentage} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Avg. Duration:</span>
              <div className="font-medium text-slate-900">4.2 years</div>
            </div>
            <div>
              <span className="text-slate-500">Next Maturity:</span>
              <div className="font-medium text-slate-900">Mar 2025</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
