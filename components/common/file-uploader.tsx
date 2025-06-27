"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, type File, CheckCircle, X, Eye, Download } from "lucide-react"

interface FileUploaderProps {
  acceptedTypes?: string[]
  maxSize?: number // in MB
  onUpload?: (file: File) => void
  onRemove?: () => void
  label?: string
  description?: string
}

export function FileUploader({
  acceptedTypes = [".pdf", ".doc", ".docx", ".jpg", ".png", ".xlsx"],
  maxSize = 10,
  onUpload,
  onRemove,
  label = "Upload File",
  description = "Select a file to upload",
}: FileUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      alert(`Invalid file type. Accepted formats: ${acceptedTypes.join(", ")}`)
      return
    }

    // Validate file size
    const maxSizeBytes = maxSize * 1024 * 1024
    if (file.size > maxSizeBytes) {
      alert(`File too large. Maximum size: ${maxSize}MB`)
      return
    }

    // Start upload simulation
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          setUploadedFile(file)

          // Store file in localStorage for demo
          const reader = new FileReader()
          reader.onload = (e) => {
            const fileData = {
              name: file.name,
              size: file.size,
              type: file.type,
              content: e.target?.result,
              uploadedAt: new Date().toISOString(),
            }
            localStorage.setItem(`uploaded_file_${Date.now()}`, JSON.stringify(fileData))
          }
          reader.readAsDataURL(file)

          if (onUpload) {
            onUpload(file)
          }
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 300)
  }

  const handleRemove = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    if (onRemove) {
      onRemove()
    }
  }

  const handleDownload = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      const a = document.createElement("a")
      a.href = url
      a.download = uploadedFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handlePreview = () => {
    if (uploadedFile) {
      const url = URL.createObjectURL(uploadedFile)
      window.open(url, "_blank")
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <h4 className="font-medium text-slate-900">{label}</h4>
        <p className="text-slate-600">{description}</p>
        <p className="text-xs text-slate-500 mt-1">
          Accepted formats: {acceptedTypes.join(", ")} • Max size: {maxSize}MB
        </p>
      </div>

      {!uploadedFile && !isUploading && (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600 mb-3">Drag and drop a file here, or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700">
            Select File
          </Button>
        </div>
      )}

      {isUploading && (
        <div className="p-4 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium">Uploading...</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-slate-500 mt-1">{Math.round(uploadProgress)}% complete</p>
        </div>
      )}

      {uploadedFile && !isUploading && (
        <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">{uploadedFile.name}</p>
                <p className="text-xs text-green-700">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handlePreview}>
                <Eye className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleRemove}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
