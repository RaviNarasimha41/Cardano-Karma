import { UserDashboard } from "@/components/user-dashboard"
import { Navigation } from "@/components/navigation"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <UserDashboard />
    </main>
  )
}
