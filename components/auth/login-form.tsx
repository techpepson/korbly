"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Fingerprint, Key } from "lucide-react"

export function LoginForm() {
  const [userType, setUserType] = useState<string>("")
  const [authMethod, setAuthMethod] = useState<string>("")

  const handleLogin = () => {
    // Simulate authentication - in production, this would validate credentials
    if (!userType || !authMethod) return

    // Route based on user type
    switch (userType) {
      case "hnwi":
        window.location.href = "/dashboard"
        break
      case "institutional":
        window.location.href = "/dashboard"
        break
      case "insurer":
        window.location.href = "/dashboard"
        break
      case "regulator":
        window.location.href = "/dashboard"
        break
      case "admin":
        window.location.href = "/dashboard"
        break
      default:
        window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-light text-slate-900">Korbly</CardTitle>
            <CardDescription className="text-slate-600 mt-2">Institutional Private Credit Platform</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user-type" className="text-sm font-medium text-slate-700">
              Access Level
            </Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="border-slate-200 focus:border-slate-400">
                <SelectValue placeholder="Select your access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hnwi">High Net Worth Individual</SelectItem>
                <SelectItem value="institutional">Institutional Investor</SelectItem>
                <SelectItem value="insurer">Insurance/Reinsurance</SelectItem>
                <SelectItem value="regulator">Regulatory Authority</SelectItem>
                <SelectItem value="admin">Platform Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="institutional@example.com"
              className="border-slate-200 focus:border-slate-400"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Authentication Method</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={authMethod === "biometric" ? "default" : "outline"}
                onClick={() => setAuthMethod("biometric")}
                className="flex items-center gap-2 h-12"
              >
                <Fingerprint className="w-4 h-4" />
                Biometric
              </Button>
              <Button
                variant={authMethod === "hardware" ? "default" : "outline"}
                onClick={() => setAuthMethod("hardware")}
                className="flex items-center gap-2 h-12"
              >
                <Key className="w-4 h-4" />
                Hardware Token
              </Button>
            </div>
          </div>

          <Button
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium"
            disabled={!userType || !authMethod}
            onClick={handleLogin}
          >
            Secure Access
          </Button>

          <div className="text-center text-xs text-slate-500 space-y-1">
            <p>🔒 ISO 27001 Compliant • SOC 2 Type II</p>
            <p>Session timeout: 15 minutes</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
