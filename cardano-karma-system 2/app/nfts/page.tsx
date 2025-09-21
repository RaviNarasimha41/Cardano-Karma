import { NFTGallery } from "@/components/nft-gallery"
import { Navigation } from "@/components/navigation"

export default function NFTsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <NFTGallery />
    </main>
  )
}
