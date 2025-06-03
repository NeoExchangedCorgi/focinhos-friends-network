
import { Home, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

const mobileNavItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Plus, label: "Postar", href: "/nova-postagem" },
  { icon: User, label: "Perfil", href: "/perfil" },
]

export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              className={cn(
                "flex flex-col items-center justify-center h-12 w-12 p-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              asChild
            >
              <Link to={item.href}>
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
