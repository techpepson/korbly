import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SyndicationConsole } from "@/components/syndication/syndication-console"
import { TrancheBuilder } from "@/components/syndication/tranche-builder"
import { AllocationMatrix } from "@/components/syndication/allocation-matrix"

export function SyndicationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900">Syndication Console</h1>
          <p className="text-gray-600 mt-1">Structure and allocate private credit facilities</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <SyndicationConsole />
          </div>
          <div className="space-y-6">
            <TrancheBuilder />
            <AllocationMatrix />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
