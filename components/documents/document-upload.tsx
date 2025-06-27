"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, File, CheckCircle, AlertCircle, X, Download, Eye } from "lucide-react"

interface DocumentUploadProps {
  userType: "investor" | "sme"
  onUpload?: (files: File[]) => void
}

const investorDocuments = [
  {
    name: "Certificate of Incorporation",
    required: true,
    description: "Legal incorporation document",
    acceptedFormats: [".pdf", ".jpg", ".png"],
    maxSize: "10MB",
  },
  {
    name: "Latest Audited Financial Statements",
    required: true,
    description: "Most recent audited financials",
    acceptedFormats: [".pdf", ".xlsx"],
    maxSize: "15MB",
  },
  {
    name: "Investment Policy Statement",
    required: true,
    description: "Investment guidelines and policies",
    acceptedFormats: [".pdf", ".doc", ".docx"],
    maxSize: "10MB",
  },
  {
    name: "Board Resolution",
    required: true,
    description: "Authorization to invest",
    acceptedFormats: [".pdf"],
    maxSize: "5MB",
  },
  {
    name: "KYC Documentation",
    required: true,
    description: "Know Your Customer documents",
    acceptedFormats: [".pdf", ".jpg", ".png"],
    maxSize: "10MB",
  },
  {
    name: "Tax Clearance Certificate",
    required: false,
    description: "Current tax compliance certificate",
    acceptedFormats: [".pdf"],
    maxSize: "5MB",
  },
]

const smeDocuments = [
  {
    name: "Certificate of Incorporation",
    required: true,
    description: "Business registration certificate",
    acceptedFormats: [".pdf", ".jpg", ".png"],
    maxSize: "10MB",
  },
  {
    name: "Latest Financial Statements",
    required: true,
    description: "Recent financial statements",
    acceptedFormats: [".pdf", ".xlsx"],
    maxSize: "15MB",
  },
  {
    name: "Business Plan",
    required: true,
    description: "Comprehensive business plan",
    acceptedFormats: [".pdf", ".doc", ".docx"],
    maxSize: "20MB",
  },
  {
    name: "Tax Clearance Certificate",
    required: true,
    description: "Current tax compliance certificate",
    acceptedFormats: [".pdf"],
    maxSize: "5MB",
  },
  {
    name: "Bank Statements",
    required: true,
    description: "Last 6 months bank statements",
    acceptedFormats: [".pdf"],
    maxSize: "15MB",
  },
  {
    name: "Management CVs",
    required: false,
    description: "Key management team resumes",
    acceptedFormats: [".pdf", ".doc", ".docx"],
    maxSize: "10MB",
  },
  {
    name: "Collateral Documentation",
    required: false,
    description: "Asset valuation and ownership docs",
    acceptedFormats: [".pdf", ".jpg", ".png"],
    maxSize: "20MB",
  },
]

export function DocumentUpload({ userType, onUpload }: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: {
      file: File
      status: "uploading" | "completed" | "error"
      progress: number
      uploadedAt: string
    }
  }>({})

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const documents = userType === "investor" ? investorDocuments : smeDocuments

  const handleFileSelect = async (docName: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const doc = documents.find((d) => d.name === docName)

    if (!doc) return

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!doc.acceptedFormats.includes(fileExtension)) {
      alert(`Invalid file type. Accepted formats: ${doc.acceptedFormats.join(", ")}`)
      return
    }

    // Validate file size
    const maxSizeBytes = Number.parseFloat(doc.maxSize) * 1024 * 1024
    if (file.size > maxSizeBytes) {
      alert(`File too large. Maximum size: ${doc.maxSize}`)
      return
    }

    // Create FileReader to read the file
    const reader = new FileReader()
    reader.onload = (e) => {
      const fileContent = e.target?.result

      // Store file in localStorage for demo (in real app, upload to server)
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        content: fileContent,
        uploadedAt: new Date().toISOString(),
      }

      localStorage.setItem(`document_${docName}`, JSON.stringify(fileData))
    }

    reader.readAsDataURL(file)

    // Start upload simulation
    setUploadedFiles((prev) => ({
      ...prev,
      [docName]: {
        file,
        status: "uploading",
        progress: 0,
        uploadedAt: new Date().toISOString(),
      },
    }))

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) => {
        const current = prev[docName]
        if (!current || current.progress >= 100) {
          clearInterval(uploadInterval)
          return prev
        }

        const newProgress = Math.min(current.progress + Math.random() * 30, 100)
        const newStatus = newProgress >= 100 ? "completed" : "uploading"

        return {
          ...prev,
          [docName]: {
            ...current,
            progress: newProgress,
            status: newStatus,
          },
        }
      })
    }, 500)

    // Call onUpload callback if provided
    if (onUpload) {
      onUpload([file])
    }
  }

  const removeFile = (docName: string) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev }
      delete newFiles[docName]
      return newFiles
    })

    // Clear the file input
    if (fileInputRefs.current[docName]) {
      fileInputRefs.current[docName]!.value = ""
    }
  }

  const downloadFile = (docName: string) => {
    const storedFile = localStorage.getItem(`document_${docName}`)
    if (storedFile) {
      const fileData = JSON.parse(storedFile)
      const link = document.createElement("a")
      link.href = fileData.content
      link.download = fileData.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const previewFile = (docName: string) => {
    const uploadedFile = uploadedFiles[docName]
    if (uploadedFile && uploadedFile.file) {
      // Open file in new tab for preview
      const url = URL.createObjectURL(uploadedFile.file)
      window.open(url, "_blank")
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "uploading":
        return <Upload className="w-4 h-4 text-blue-600 animate-pulse" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <File className="w-4 h-4 text-gray-400" />
    }
  }

  const getCompletionStats = () => {
    const requiredDocs = documents.filter((doc) => doc.required)
    const completedRequired = requiredDocs.filter((doc) => uploadedFiles[doc.name]?.status === "completed").length

    const totalUploaded = Object.values(uploadedFiles).filter((file) => file.status === "completed").length

    return {
      requiredCompleted: completedRequired,
      totalRequired: requiredDocs.length,
      totalUploaded,
      totalDocuments: documents.length,
      completionPercentage: (completedRequired / requiredDocs.length) * 100,
    }
  }

  const stats = getCompletionStats()

  return (
    <div className="space-y-6">
      {/* Upload Progress Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Document Upload Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.requiredCompleted}</div>
              <div className="text-sm text-blue-800">Required Complete</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.totalUploaded}</div>
              <div className="text-sm text-green-800">Total Uploaded</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">{stats.totalRequired}</div>
              <div className="text-sm text-gray-800">Required Documents</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{Math.round(stats.completionPercentage)}%</div>
              <div className="text-sm text-purple-800">Completion</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>
                {stats.requiredCompleted} of {stats.totalRequired} required documents
              </span>
            </div>
            <Progress value={stats.completionPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Document Upload List */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">
            {userType === "investor" ? "Investor" : "Business"} Documentation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => {
              const uploadedFile = uploadedFiles[doc.name]
              const isUploaded = uploadedFile?.status === "completed"
              const isUploading = uploadedFile?.status === "uploading"

              return (
                <div
                  key={doc.name}
                  className={`p-4 border-2 border-dashed rounded-xl transition-all ${
                    isUploaded
                      ? "border-green-300 bg-green-50"
                      : isUploading
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(uploadedFile?.status || "pending")}
                      <div>
                        <h4 className="font-medium text-gray-900 flex items-center gap-2">
                          {doc.name}
                          {doc.required && (
                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                              Required
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                      </div>
                    </div>

                    {isUploaded && (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewFile(doc.name)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadFile(doc.name)}
                          className="flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFile(doc.name)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {isUploading && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading {uploadedFile.file.name}...</span>
                        <span>{Math.round(uploadedFile.progress)}%</span>
                      </div>
                      <Progress value={uploadedFile.progress} className="h-2" />
                    </div>
                  )}

                  {isUploaded && (
                    <div className="mb-3 p-2 bg-white rounded border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-green-700">✓ {uploadedFile.file.name}</span>
                        <span className="text-gray-500">{(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Uploaded on {new Date(uploadedFile.uploadedAt).toLocaleString()}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>Formats: {doc.acceptedFormats.join(", ")}</span>
                      <span className="mx-2">•</span>
                      <span>Max size: {doc.maxSize}</span>
                    </div>

                    {!isUploaded && (
                      <div>
                        <input
                          ref={(el) => (fileInputRefs.current[doc.name] = el)}
                          type="file"
                          accept={doc.acceptedFormats.join(",")}
                          onChange={(e) => handleFileSelect(doc.name, e.target.files)}
                          className="hidden"
                          id={`file-${doc.name}`}
                        />
                        <Button
                          size="sm"
                          onClick={() => fileInputRefs.current[doc.name]?.click()}
                          disabled={isUploading}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {isUploading ? "Uploading..." : "Choose File"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {stats.completionPercentage === 100 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">All required documents uploaded successfully!</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Your application is ready for review. Our team will contact you within 3-5 business days.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
