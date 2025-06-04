
import { Heart, Clock, EyeOff, Phone, BookOpen, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Link } from "react-router-dom"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

const menuItems = [
  { icon: Heart, label: "Curtidas", href: "/curtidas" },
  { icon: Clock, label: "Histórico", href: "/historico" },
  { icon: EyeOff, label: "Ocultos", href: "/ocultos" },
  { icon: Phone, label: "Contate a ONG", href: "/contato-ong" },
  { icon: BookOpen, label: "Tutorial", href: "/tutorial" },
]

export function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const handleMenuItemClick = () => {
    onClose()
  }

  const handleLogoutClick = () => {
    onLogout()
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col space-y-2 mt-6">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className="w-full justify-start h-12 text-left"
              asChild
              onClick={handleMenuItemClick}
            >
              <Link to={item.href}>
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
          
          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full justify-start h-12"
              onClick={handleLogoutClick}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
