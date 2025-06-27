import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, FileText, TrendingUp } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "investment",
    title: "Investment Allocated",
    description: "Akasa Energy Ltd. - Senior Tranche",
    amount: "$2.5M",
    time: "2 hours ago",
    icon: DollarSign,
    status: "completed",
  },
  {
    id: 2,
    type: "document",
    title: "Term Sheet Signed",
    description: "Tema Construction - Mezzanine Facility",
    amount: "$1.2M",
    time: "5 hours ago",
    icon: FileText,
    status: "completed",
  },
  {
    id: 3,
    type: "yield",
    title: "Yield Payment Received",
    description: "Gold Coast Mining - Quarterly Distribution",
    amount: "$125K",
    time: "1 day ago",
    icon: TrendingUp,
    status: "completed",
  },
  {
    id: 4,
    type: "review",
    title: "Credit Review Pending",
    description: "New Deal - Manufacturing Facility",
    amount: "$3.8M",
    time: "2 days ago",
    icon: Clock,
    status: "pending",
  },
]

export function RecentActivity() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div
                className={`p-2 rounded-lg ${
                  activity.status === "completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}
              >
                <activity.icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-slate-900">{activity.title}</h4>
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className={`text-xs ${
                      activity.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-1">{activity.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{activity.time}</span>
                  <span className="font-medium text-slate-900">{activity.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
