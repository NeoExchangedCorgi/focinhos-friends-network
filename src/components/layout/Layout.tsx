
import { useState } from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { MobileNav } from "./MobileNav"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={handleMenuClick} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto px-4 py-6 pb-20 md:pb-6">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
