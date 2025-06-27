"use client"

import type React from "react"

interface Deal {
  id: string
  name: string
  stage: string
}

interface DealPipelineProps {
  deals: Deal[]
}

const DealPipeline: React.FC<DealPipelineProps> = ({ deals }) => {
  const handleViewDeal = (dealId: string) => {
    window.location.href = `/deals?id=${dealId}`
  }

  const handleApplyToDeal = (dealId: string) => {
    window.location.href = `/applications?deal=${dealId}`
  }

  const stages = ["Discovery", "Qualification", "Proposal", "Negotiation", "Closed"]

  const dealsByStage = stages.map((stage) => deals.filter((deal) => deal.stage === stage))

  return (
    <div className="deal-pipeline">
      <h2>Deal Pipeline</h2>
      <div className="pipeline-stages">
        {stages.map((stage, index) => (
          <div key={stage} className="pipeline-stage">
            <h3>{stage}</h3>
            {dealsByStage[index].map((deal) => (
              <div key={deal.id} className="deal-card">
                <h4>{deal.name}</h4>
                <button onClick={() => handleViewDeal(deal.id)}>View Details</button>
                <button onClick={() => handleApplyToDeal(deal.id)}>Apply</button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DealPipeline
