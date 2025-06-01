
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Bell, Sun, Moon, Plus, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()
  const { getUnreadNotificationsCount } = usePosts()
  const navigate = useNavigate()
  const [bellAnimation, setBellAnimation] = useState(false)
  
  const unreadCount = user ? getUnreadNotificationsCount(user.id) : 0

  // Animar sino quando há novas notificações
  useEffect(() => {
    if (unreadCount > 0) {
      setBellAnimation(true)
      const timer = setTimeout(() => setBellAnimation(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [unreadCount])

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={theme === 'dark' 
                ? "/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png"
                : "/lovable-uploads/60e68882-6ee2-4ed6-8618-1abcd3ab462b.png"
              } 
              alt="Paraíso dos Focinhos" 
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/nova-postagem">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Nova postagem</span>
                </Link>
              </Button>

              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild
                  className={cn(
                    "relative",
                    bellAnimation && "animate-bounce"
                  )}
                >
                  <Link to="/notificacoes">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                    <span className="sr-only">Notificações</span>
                  </Link>
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        @{user?.username}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dados-usuario" className="cursor-pointer">
                      Editar Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/cadastro">Cadastro</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
