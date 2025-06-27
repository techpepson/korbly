"use client"

import { useState } from "react"
import {
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Shield,
  TrendingUp,
  Upload,
  Info,
  ChevronRight,
} from "lucide-react"

type FormDataType = {
  companyName: string
  institutionName: string
  registrationNumber: string
  taxId: string
  industry: string
  region: string
  address: string
  city: string
  establishedYear: string
  website: string
  email: string
  phone: string
  employees: string
  annualRevenue: string
  businessDescription: string
  institutionType: string
  aum: string
  investmentFocus: string[]
  minimumInvestment: string
  riskAppetite: string
  fundingPurpose: string
  requestedAmount: string
  existingLoans: string
  monthlyRevenue: string
  termsAccepted: boolean
  privacyAccepted: boolean
  kycConsent: boolean
  marketingConsent: boolean
}

type ErrorsType = Partial<Record<keyof FormDataType, string | null>>

export function SignupPage() {
  const [currentView, setCurrentView] = useState("landing")
  const [userType, setUserType] = useState("")
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({})
  const [documentStatus, setDocumentStatus] = useState({})
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [reviewProgress, setReviewProgress] = useState(0)

  const [errors, setErrors] = useState<ErrorsType>({})

  const [formData, setFormData] = useState<FormDataType>({
    // Business/Institution Information
    companyName: "",
    institutionName: "",
    registrationNumber: "",
    taxId: "",
    industry: "",
    region: "",
    address: "",
    city: "",
    establishedYear: "",
    website: "",
    email: "",
    phone: "",

    // Business Details
    employees: "",
    annualRevenue: "",
    businessDescription: "",

    // Investor Specific
    institutionType: "",
    aum: "",
    investmentFocus: [],
    minimumInvestment: "",
    riskAppetite: "",

    // SME Specific
    fundingPurpose: "",
    requestedAmount: "",
    existingLoans: "",
    monthlyRevenue: "",

    // Compliance
    termsAccepted: false,
    privacyAccepted: false,
    kycConsent: false,
    marketingConsent: false,
  })

  const investorSteps = [
    { id: 1, title: "Institution Profile", description: "Organization details" },
    { id: 2, title: "Investment Criteria", description: "Investment preferences" },
    { id: 3, title: "Documents", description: "Required documentation" },
    { id: 4, title: "Verification", description: "Review and submit" },
  ]

  const smeSteps = [
    { id: 1, title: "Business Profile", description: "Company information" },
    { id: 2, title: "Financial Details", description: "Business financials" },
    { id: 3, title: "Documents", description: "Required documentation" },
    { id: 4, title: "Verification", description: "Review and submit" },
  ]

  const currentSteps = userType === "investor" ? investorSteps : smeSteps
  const totalSteps = currentSteps.length

  const ghanaRegions = [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Central",
    "Eastern",
    "Volta",
    "Northern",
    "Upper East",
    "Upper West",
    "Brong-Ahafo",
  ]

  const industries = [
    "Agriculture & Agribusiness",
    "Manufacturing",
    "Technology & Digital Services",
    "Healthcare",
    "Education",
    "Renewable Energy",
    "Construction & Real Estate",
    "Transport & Logistics",
    "Retail & Trade",
    "Financial Services",
  ]

  const institutionTypes = [
    "Asset Management",
    "Development Finance Institution (DFI)",
    "Insurance Company",
    "Pension Fund",
    "Regulatory Body",
    "Sovereign Wealth Fund",
    "Commercial Bank",
    "Investment Bank",
    "Family Office",
    "Wealth Management",
  ]

  const riskAppetites = ["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"]

  const investmentFocusOptions = [
    "Agriculture",
    "Manufacturing",
    "Technology",
    "Healthcare",
    "Energy",
    "Financial Services",
    "Real Estate",
    "Infrastructure",
    "Export",
    "SME Growth",
  ]

  const handleNext = () => {
    if (validateCurrentStep()) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
        setIsAnimating(false)
      }, 300)
    }
  }

  const handlePrevious = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 1))
      setIsAnimating(false)
    }, 300)
  }

  const handleUserTypeSelect = (type: string) => {
    setUserType(type)
    setCurrentView("form")
    setCurrentStep(1)
  }

  const handleInputChange = (field: keyof FormDataType, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }))
    }
  }

  const handleArrayInputChange = (field: keyof FormDataType, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter((item) => item !== value)
        : [...(prev[field] as string[]), value],
    }))
  }

  const validateCurrentStep = () => {
    const newErrors: ErrorsType = {}

    if (currentStep === 1) {
      if (userType === "investor") {
        if (!formData.institutionName) newErrors.institutionName = "Institution name is required"
        if (!formData.institutionType) newErrors.institutionType = "Institution type is required"
        if (!formData.email) newErrors.email = "Email is required"
      } else {
        if (!formData.companyName) newErrors.companyName = "Company name is required"
        if (!formData.industry) newErrors.industry = "Industry is required"
        if (!formData.registrationNumber) newErrors.registrationNumber = "Registration number is required"
        if (!formData.email) newErrors.email = "Email is required"
      }
    }

    if (currentStep === 2) {
      if (userType === "investor") {
        if (!formData.aum) newErrors.aum = "Assets under management is required"
      } else {
        if (!formData.annualRevenue) newErrors.annualRevenue = "Annual revenue is required"
        if (!formData.employees) newErrors.employees = "Number of employees is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignupComplete = () => {
    setApplicationSubmitted(true)
    setCurrentView("success")
    // Auto redirect to dashboard after showing success message
    setTimeout(() => {
      // Store user data for dashboard
      localStorage.setItem("userType", userType)
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("applicationStatus", "submitted")

      // Redirect to dashboard
      window.location.href = "/dashboard"
    }, 3000)
  }

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-semibold text-gray-900">Korbly</div>
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Platform
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Security
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = "/auth")}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-blue-300/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-purple-300/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-200/15 to-orange-200/25 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8 hover:bg-gray-800 transition-colors cursor-pointer">
            <span>Professional Application Process</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-gray-900 mb-6 tracking-tight leading-none">
            Join the
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Elite Network.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Complete our comprehensive application to join Ghana's premier institutional finance ecosystem.
          </p>

          {/* User Type Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <div
              onClick={() => handleUserTypeSelect("investor")}
              className="group relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex p-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Building2 className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Institutional Investor</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Pension funds, insurance companies, and development institutions seeking high-yield opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">GH₵ 50M+</div>
                    <div className="text-xs text-gray-600">Min Investment</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">12.8%</div>
                    <div className="text-xs text-gray-600">Avg Returns</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">5 Years</div>
                    <div className="text-xs text-gray-600">Max Term</div>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
                  Apply as Investor
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              onClick={() => handleUserTypeSelect("sme")}
              className="group relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="inline-flex p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Growing Business</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Established SMEs seeking institutional capital for expansion and growth initiatives.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">GH₵ 1M+</div>
                    <div className="text-xs text-gray-600">Min Funding</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">18%</div>
                    <div className="text-xs text-gray-600">From Rate</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50/50 rounded-xl">
                    <div className="text-sm font-medium text-gray-900">72 Hrs</div>
                    <div className="text-xs text-gray-600">Decision</div>
                  </div>
                </div>

                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2">
                  Apply for Funding
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Progress Bar Component
  const ProgressBar = () => (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        {currentSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg"
                    : currentStep === step.id - 1
                      ? "bg-blue-100 border-blue-300 text-blue-600"
                      : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : <span>{step.id}</span>}
              </div>
              <div className="mt-2 text-center max-w-24">
                <div className={`text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-500"}`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-400 hidden md:block">{step.description}</div>
              </div>
            </div>
            {index < currentSteps.length - 1 && (
              <div
                className={`w-16 h-0.5 transition-all duration-300 ${
                  currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  // Institution Profile Step (for investors)
  const InstitutionProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">Institution Profile</h3>
        <p className="text-gray-600">Details about your institution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Institution Name *</label>
          <input
            type="text"
            value={formData.institutionName}
            onChange={(e) => handleInputChange("institutionName", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.institutionName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Ghana Pension Trust"
          />
          {errors.institutionName && <p className="text-red-500 text-sm mt-1">{errors.institutionName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Institution Type *</label>
          <select
            value={formData.institutionType}
            onChange={(e) => handleInputChange("institutionType", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.institutionType ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Select Institution Type</option>
            {institutionTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.institutionType && <p className="text-red-500 text-sm mt-1">{errors.institutionType}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Primary Contact Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="contact@institution.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="+233 XX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Registration Number</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="REG-XXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Year Established</label>
          <input
            type="number"
            value={formData.establishedYear}
            onChange={(e) => handleInputChange("establishedYear", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="1990"
            min="1900"
            max="2025"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Institutional Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            rows={3}
            placeholder="Full institutional address including city and region"
          />
        </div>
      </div>
    </div>
  )

  // Business Profile Step (for SMEs)
  const BusinessProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">Business Profile</h3>
        <p className="text-gray-600">Information about your company</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Company Name *</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.companyName ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Acme Industries Ltd"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Industry *</label>
          <select
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.industry ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">Select Industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
          {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Primary Contact Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="contact@company.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Registration Number *</label>
          <input
            type="text"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
            className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              errors.registrationNumber ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="CS-XXXXXXXXX"
          />
          {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="+233 XX XXX XXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Region</label>
          <select
            value={formData.region}
            onChange={(e) => handleInputChange("region", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">Select Region</option>
            {ghanaRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Year Established</label>
          <input
            type="number"
            value={formData.establishedYear}
            onChange={(e) => handleInputChange("establishedYear", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="2010"
            min="1900"
            max="2025"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Website</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="https://www.company.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Business Description</label>
          <textarea
            value={formData.businessDescription}
            onChange={(e) => handleInputChange("businessDescription", e.target.value)}
            className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            rows={4}
            placeholder="Describe your business, products/services, and market position..."
          />
        </div>
      </div>
    </div>
  )

  // Financial Details Step
  const FinancialDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          {userType === "investor" ? "Investment Criteria" : "Financial Information"}
        </h3>
        <p className="text-gray-600">
          {userType === "investor" ? "Your investment preferences" : "Your business financials"}
        </p>
      </div>

      {userType === "investor" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Assets Under Management (GH₵) *</label>
              <input
                type="number"
                value={formData.aum}
                onChange={(e) => handleInputChange("aum", e.target.value)}
                className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.aum ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="1000000000"
              />
              {errors.aum && <p className="text-red-500 text-sm mt-1">{errors.aum}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">Minimum Investment (GH₵)</label>
              <input
                type="number"
                value={formData.minimumInvestment}
                onChange={(e) => handleInputChange("minimumInvestment", e.target.value)}
                className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="50000000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Risk Appetite</label>
              <select
                value={formData.riskAppetite}
                onChange={(e) => handleInputChange("riskAppetite", e.target.value)}
                className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select Risk Appetite</option>
                {riskAppetites.map((risk) => (
                  <option key={risk} value={risk}>
                    {risk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Investment Focus (Select all that apply)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {investmentFocusOptions.map((focus) => (
                <label
                  key={focus}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.investmentFocus.includes(focus)}
                    onChange={() => handleArrayInputChange("investmentFocus", focus)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{focus}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Annual Revenue (GH₵) *</label>
            <input
              type="number"
              value={formData.annualRevenue}
              onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
              className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.annualRevenue ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="10000000"
            />
            {errors.annualRevenue && <p className="text-red-500 text-sm mt-1">{errors.annualRevenue}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Number of Employees *</label>
            <input
              type="number"
              value={formData.employees}
              onChange={(e) => handleInputChange("employees", e.target.value)}
              className={`w-full px-4 py-4 bg-gray-50/50 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.employees ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="50"
            />
            {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Monthly Revenue (GH₵)</label>
            <input
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="800000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">Requested Amount (GH₵)</label>
            <input
              type="number"
              value={formData.requestedAmount}
              onChange={(e) => handleInputChange("requestedAmount", e.target.value)}
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="5000000"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Purpose of Funding</label>
            <textarea
              value={formData.fundingPurpose}
              onChange={(e) => handleInputChange("fundingPurpose", e.target.value)}
              className="w-full px-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              rows={3}
              placeholder="Explain how you plan to use the funding..."
            />
          </div>
        </div>
      )}
    </div>
  )

  // Documents Step (simplified for this example)
  const DocumentsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">Required Documents</h3>
        <p className="text-gray-600">Upload necessary documentation</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Document Requirements</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              {userType === "investor"
                ? "Upload institutional documents including registration, financial statements, and investment policies."
                : "Upload business documents including incorporation certificate, financial statements, and business plan."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {(userType === "investor"
          ? [
              "Certificate of Incorporation",
              "Latest Audited Financial Statements",
              "Investment Policy Statement",
              "Board Resolution",
            ]
          : [
              "Certificate of Incorporation",
              "Latest Financial Statements",
              "Business Plan",
              "Tax Clearance Certificate",
            ]
        ).map((docType, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">{docType}</h4>
            <p className="text-sm text-gray-500 mb-3">PDF, DOC, or JPG (Max 10MB)</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Choose File
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  // Verification Step
  const VerificationStep = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">Review & Submit</h3>
        <p className="text-gray-600">Please review your application before submitting</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Application Review Process</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              Your application will be reviewed by our team within 3-5 business days. We may contact you for additional
              information or to schedule a due diligence meeting.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded mt-0.5"
          />
          <div className="text-sm">
            <span className="text-gray-900">I agree to the </span>
            <button className="text-blue-600 hover:underline font-medium">Terms of Service</button>
            <span className="text-gray-900"> and </span>
            <button className="text-blue-600 hover:underline font-medium">Privacy Policy</button>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
          <input
            type="checkbox"
            checked={formData.kycConsent}
            onChange={(e) => handleInputChange("kycConsent", e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded mt-0.5"
          />
          <div className="text-sm">
            <span className="text-gray-900">I consent to KYC verification and due diligence procedures</span>
          </div>
        </label>
      </div>

      <div className="text-center">
        <button
          onClick={handleSignupComplete}
          disabled={!formData.termsAccepted || !formData.kycConsent}
          className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:transform-none transform hover:scale-105"
        >
          Submit Application
        </button>
      </div>
    </div>
  )

  // Form Page
  const FormPage = () => (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView("landing")}
              className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-semibold text-gray-900">Korbly</div>
            </button>
            <div className="text-sm text-gray-500">
              {userType === "investor" ? "Investor Application" : "Business Application"}
            </div>
          </div>
        </div>
      </nav>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Form Content */}
      <div className="relative z-10 min-h-screen flex flex-col pt-16">
        <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-12">
          <ProgressBar />

          <div
            className={`transition-all duration-500 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-xl">
              {userType === "investor" ? (
                <>
                  {currentStep === 1 && <InstitutionProfileStep />}
                  {currentStep === 2 && <FinancialDetailsStep />}
                  {currentStep === 3 && <DocumentsStep />}
                  {currentStep === 4 && <VerificationStep />}
                </>
              ) : (
                <>
                  {currentStep === 1 && <BusinessProfileStep />}
                  {currentStep === 2 && <FinancialDetailsStep />}
                  {currentStep === 3 && <DocumentsStep />}
                  {currentStep === 4 && <VerificationStep />}
                </>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <div>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 text-gray-600 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
              )}
            </div>

            <div>
              {currentStep < totalSteps && (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Success Page
  const SuccessPage = () => (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50/30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-200/20 to-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-cyan-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>

        <h3 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">Application Submitted</h3>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Thank you for your application. Our team will review your submission and contact you within 3-5 business days.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                You will receive a confirmation email shortly. We'll be in touch within 3-5 business days regarding your
                application status and any additional requirements.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">Redirecting you to dashboard...</p>
      </div>
    </div>
  )

  // Render current view
  return (
    <div>
      {currentView === "landing" && <LandingPage />}
      {currentView === "form" && <FormPage />}
      {currentView === "success" && <SuccessPage />}
    </div>
  )
}
