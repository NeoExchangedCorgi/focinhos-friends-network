
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/ui/theme-provider"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-yellow-400/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={theme === "light" ? "/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png" : "/lovable-uploads/60e68882-6ee2-4ed6-8618-1abcd3ab462b.png"}
              alt="Paraíso dos Focinhos"
              className="h-20 w-20"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Pata Amiga</CardTitle>
          <CardDescription>
            Entre na sua conta para continuar defendendo os animais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
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
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Entrar
            </Button>
          </form>

          <Separator />

          <div className="space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/cadastro">
                Criar nova conta
              </Link>
            </Button>
            
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
