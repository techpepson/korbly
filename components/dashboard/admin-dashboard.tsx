import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Server, DollarSign, Activity } from "lucide-react"

const systemHealth = [
  { service: "Authentication Service", status: "Healthy", uptime: "99.9%", responseTime: "45ms" },
  { service: "Deal Pipeline API", status: "Healthy", uptime: "99.8%", responseTime: "120ms" },
  { service: "Payment Gateway", status: "Warning", uptime: "98.5%", responseTime: "250ms" },
  { service: "Document Storage", status: "Healthy", uptime: "100%", responseTime: "80ms" },
]

const userActivity = [
  { type: "New Registration", count: 23, change: "+15%" },
  { type: "Active Sessions", count: 147, change: "+8%" },
  { type: "Deal Applications", count: 12, change: "+25%" },
  { type: "Document Uploads", count: 89, change: "+12%" },
]

const recentUsers = [
  {
    name: "Ghana Pension Trust",
    type: "Institutional",
    status: "Verified",
    joinDate: "2024-01-20",
    aum: "$450M",
  },
  {
    name: "Accra Manufacturing Ltd",
    type: "SME",
    status: "Pending",
    joinDate: "2024-01-22",
    revenue: "$2.5M",
  },
  {
    name: "West Africa Insurance",
    type: "Insurer",
    status: "Verified",
    joinDate: "2024-01-18",
    aum: "$180M",
  },
]

const platformRevenue = [
  { month: "Oct", revenue: 95000 },
  { month: "Nov", revenue: 108000 },
  { month: "Dec", revenue: 125000 },
  { month: "Jan", revenue: 142000 },
]

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* System Health */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-500" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900 text-sm">{service.service}</h4>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      service.status === "Healthy"
                        ? "bg-green-500"
                        : service.status === "Warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  />
                </div>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="font-medium">{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span className="font-medium">{service.responseTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* User Activity */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{activity.type}</span>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{activity.count}</div>
                    <div className="text-xs text-green-600">{activity.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Recent Registrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{user.name}</div>
                    <div className="text-sm text-slate-500">
                      {user.type} • {user.joinDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={user.status === "Verified" ? "default" : "secondary"}
                      className={`text-xs mb-1 ${
                        user.status === "Verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status}
                    </Badge>
                    <div className="text-xs text-slate-500">{user.aum || user.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Revenue */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            Platform Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {platformRevenue.map((month, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 mb-1">${(month.revenue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-slate-600">{month.month} 2024</div>
                {index > 0 && (
                  <div className="text-xs text-green-600 mt-1">
                    +
                    {(
                      ((month.revenue - platformRevenue[index - 1].revenue) / platformRevenue[index - 1].revenue) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-lg font-semibold text-slate-900">$1.2M</div>
              <div className="text-sm text-slate-600">Total Revenue</div>
            </div>
            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-lg font-semibold text-slate-900">2.8%</div>
              <div className="text-sm text-slate-600">Platform Fee</div>
            </div>
            <div className="text-center p-4 border border-slate-200 rounded-lg">
              <div className="text-lg font-semibold text-slate-900">147</div>
              <div className="text-sm text-slate-600">Paying Users</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
