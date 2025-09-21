"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface StatCardProps {
  value: string
  label: string
  description: string
  logo: string
}

function StatCard({ value, label, description, logo }: StatCardProps) {
  const [count, setCount] = useState(0)
  const targetValue = Number.parseInt(value.replace(/[^\d]/g, ""))

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < targetValue) {
          return Math.min(prev + Math.ceil(targetValue / 50), targetValue)
        }
        return prev
      })
    }, 50)

    return () => clearInterval(timer)
  }, [targetValue])

  return (
    <Card className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 group">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-foreground">
            {value.includes("k") ? `${Math.floor(count / 1000)}k` : count.toLocaleString()}
            {value.includes("%") && "%"}
            {value.includes("x") && "x"}
          </div>
          <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{logo}</div>
        </div>
        <div>
          <div className="font-semibold text-foreground">{label}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </Card>
  )
}

export function StatsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard value="50k" label="karma earned" description="by community members" logo="🏆" />
          <StatCard value="98%" label="faster verification" description="with on-chain validation" logo="⚡" />
          <StatCard value="300%" label="increase in engagement" description="through gamification" logo="📈" />
          <StatCard value="5x" label="faster to earn" description="NFT badge rewards" logo="🎯" />
        </div>
      </div>
    </section>
  )
}
