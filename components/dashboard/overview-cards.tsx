"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface OverviewCardProps {
  title: string
  description: string
  value: string
  cardType: string
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, description, value, cardType }) => {
  const handleViewDetails = (cardType: string) => {
    switch (cardType) {
      case "portfolio":
        window.location.href = "/portfolio"
        break
      case "deals":
        window.location.href = "/deals"
        break
      case "performance":
        window.location.href = "/metrics"
        break
      case "compliance":
        window.location.href = "/compliance"
        break
      default:
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start">
        <div className="text-2xl font-bold">{value}</div>
        <Button size="sm" variant="outline" onClick={() => handleViewDetails(cardType)}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

interface OverviewCardsProps {
  data: {
    title: string
    description: string
    value: string
    cardType: string
  }[]
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((card, index) => (
        <OverviewCard
          key={index}
          title={card.title}
          description={card.description}
          value={card.value}
          cardType={card.cardType}
        />
      ))}
    </div>
  )
}

export default OverviewCards
