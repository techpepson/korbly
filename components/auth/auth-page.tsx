"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Fingerprint, Key, ArrowLeft } from "lucide-react"

export function AuthPage() {
  const [userType, setUserType] = useState<string>("")
  const [authMethod, setAuthMethod] = useState<string>("")
  const [email, setEmail] = useState("")

  const handleLogin = () => {
    if (!userType || !authMethod || !email) return

    // Store user context
    localStorage.setItem("userType", userType)
    localStorage.setItem("userEmail", email)

    // Route to dashboard
    window.location.href = "/dashboard"
  }

  const handleBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-8 text-gray-600 hover:text-gray-900" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Button>

        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-16 h-16 bg-black rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-light text-gray-900">Secure Access</CardTitle>
              <CardDescription className="text-gray-600 mt-2">Institutional Private Credit Platform</CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="user-type" className="text-sm font-medium text-gray-700">
                Access Level
              </Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
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

            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="institutional@example.com"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Authentication Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={authMethod === "biometric" ? "default" : "outline"}
                  onClick={() => setAuthMethod("biometric")}
                  className="h-14 flex-col gap-2"
                >
                  <Fingerprint className="w-5 h-5" />
                  <span className="text-xs">Biometric</span>
                </Button>
                <Button
                  variant={authMethod === "hardware" ? "default" : "outline"}
                  onClick={() => setAuthMethod("hardware")}
                  className="h-14 flex-col gap-2"
                >
                  <Key className="w-5 h-5" />
                  <span className="text-xs">Hardware Token</span>
                </Button>
              </div>
            </div>

            <Button
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              disabled={!userType || !authMethod || !email}
              onClick={handleLogin}
            >
              Secure Access
            </Button>

            <div className="text-center text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-100">
              <p>🔒 ISO 27001 Compliant • SOC 2 Type II</p>
              <p>Session timeout: 15 minutes</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
