
import { Moon, Sun, Bell, User, LogOut, Heart, Clock, EyeOff, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ui/theme-provider"
import { Link } from "react-router-dom"

interface HeaderProps {
  userName?: string
  userAvatar?: string
}

export function Header({ userName = "Usuário", userAvatar }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src={theme === "light" ? "/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png" : "/lovable-uploads/60e68882-6ee2-4ed6-8618-1abcd3ab462b.png"}
            alt="Paraíso dos Focinhos"
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-primary">Pata Amiga</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-primary/10"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Alternar tema</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notificacoes">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificações</span>
            </Link>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem asChild>
                <Link to="/perfil" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dados-usuario" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Dados do Usuário</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/curtidas" className="cursor-pointer">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Curtidas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/historico" className="cursor-pointer">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Histórico</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/ocultos" className="cursor-pointer">
                  <EyeOff className="mr-2 h-4 w-4" />
                  <span>Ocultos</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/contato-ong" className="cursor-pointer">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>Contate a ONG</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
