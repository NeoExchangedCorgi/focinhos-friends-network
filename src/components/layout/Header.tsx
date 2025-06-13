
import { Bell, User, Moon, Sun, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { SearchBar } from "./SearchBar"
import { useTheme } from "@/components/ui/theme-provider"
import { MobileMenu } from "./MobileMenu"
import { useState } from "react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()
  const { hasUnreadNotifications } = usePosts()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const unreadCount = user ? hasUnreadNotifications(user.id) : false

  // Define qual logo usar baseado no tema
  const logoSrc = theme === "dark" 
    ? "/lovable-uploads/7230ae44-4cf0-43d7-997c-f1df41f3e3c3.png"
    : "/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png"

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-2 md:px-4">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logoSrc}
              alt="Pata Amiga"
              className="h-10 w-10 object-contain"
            />
            <span className="hidden font-bold text-lg sm:inline-block">
              Pata Amiga
            </span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="flex-1 mx-2 md:mx-4 max-w-md">
            <SearchBar />
          </div>
        )}

        <nav className="flex items-center space-x-1 md:space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild className={`relative ${unreadCount ? 'animate-pulse' : ''}`}>
                <Link to="/notificacoes">
                  <Bell className="h-5 w-5" />
                  {unreadCount && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-bounce"
                    >
                      •
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Mobile buttons */}
              <div className="flex md:hidden space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Desktop buttons */}
              <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                <Link to="/perfil">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="hidden md:inline-flex"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="mr-2"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" asChild className="text-sm px-2 md:px-4">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="text-sm px-2 md:px-4">
                <Link to="/cadastro">Cadastro</Link>
              </Button>
            </>
          )}
        </nav>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  )
}
