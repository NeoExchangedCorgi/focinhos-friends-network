
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { SearchBar } from "./SearchBar"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { isAuthenticated, user, logout } = useAuth()
  const { hasUnreadNotifications } = usePosts()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const unreadCount = user ? hasUnreadNotifications(user.id) : false

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png"
              alt="Pata Amiga"
              className="h-10 w-10 object-contain"
            />
            <span className="hidden font-bold text-lg sm:inline-block">
              Pata Amiga
            </span>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="flex-1 mx-4">
            <SearchBar />
          </div>
        )}

        <nav className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/notificacoes">
                  <Bell className="h-5 w-5" />
                  {unreadCount && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      •
                    </Badge>
                  )}
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <Link to="/perfil">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
              
              <Button variant="ghost" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/cadastro">Cadastro</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
