
import { Home, Heart, Clock, EyeOff, Phone, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Heart, label: "Curtidas", href: "/curtidas" },
  { icon: Clock, label: "Histórico", href: "/historico" },
  { icon: EyeOff, label: "Ocultos", href: "/ocultos" },
  { icon: Phone, label: "Contate a ONG", href: "/contato-ong" },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
      <div className="flex-1 flex flex-col min-h-0 bg-background border-r">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Button
                  key={item.href}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-12 text-left",
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
          
          <div className="px-2 mt-4">
            <Button
              variant="destructive"
              className="w-full justify-start h-12"
              asChild
            >
              <Link to="/login">
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
