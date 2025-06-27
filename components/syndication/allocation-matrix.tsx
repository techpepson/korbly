import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const investors = [
  {
    name: "Pension Fund A",
    type: "Institutional",
    allocation: 15000000,
    commitment: 20000000,
    status: "Committed",
  },
  {
    name: "HNWI Portfolio",
    type: "Individual",
    allocation: 5000000,
    commitment: 5000000,
    status: "Allocated",
  },
  {
    name: "Insurance Co.",
    type: "Insurer",
    allocation: 8000000,
    commitment: 12000000,
    status: "Pending",
  },
  {
    name: "DFI Partner",
    type: "Development",
    allocation: 12000000,
    commitment: 15000000,
    status: "Committed",
  },
]

export function AllocationMatrix() {
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
        <CardTitle className="text-lg font-medium text-slate-900">Allocation Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investors.map((investor, index) => (
            <div key={index} className="p-3 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">{investor.name}</h4>
                  <p className="text-xs text-slate-500">{investor.type}</p>
                </div>
                <Badge
                  variant={investor.status === "Allocated" ? "default" : "outline"}
                  className={`text-xs ${
                    investor.status === "Committed"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : investor.status === "Allocated"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {investor.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Allocation</span>
                  <span className="font-medium">
                    {formatCurrency(investor.allocation)} / {formatCurrency(investor.commitment)}
                  </span>
                </div>
                <Progress value={(investor.allocation / investor.commitment) * 100} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
