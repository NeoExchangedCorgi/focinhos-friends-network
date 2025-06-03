
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/ui/theme-provider"
import { useAuth } from "@/contexts/AuthContext"
import { Moon, Sun, Home } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme, setTheme } = useTheme()
  const { login } = useAuth()
  const navigate = useNavigate()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password })
    
    // Simular login bem-sucedido
    const userData = {
      id: "1",
      name: "Usuário Logado",
      username: "usuario_logado",
      email: email
    }
    
    login(userData)
    navigate("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-yellow-400/5 p-4">
      {/* Botões de navegação no topo */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <Home className="h-5 w-5" />
            <span className="sr-only">Voltar ao início</span>
          </Link>
        </Button>
        
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
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Login - Pata Amiga</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Entrar
            </Button>
          </form>

          <div className="text-center">
            <Button variant="link" asChild className="text-sm">
              <Link to="/esqueci-senha">
                Esqueci minha senha
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">Não é cadastrado? </span>
            <Button variant="link" asChild className="text-sm p-0">
              <Link to="/cadastro">
                Clique aqui!
              </Link>
            </Button>
          </div>

          <div className="text-center pt-2">
            <Button variant="secondary" className="w-full" asChild>
              <Link to="/admin-login">
                Fazer login como Admin
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
