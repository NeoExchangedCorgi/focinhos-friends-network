
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from "@/components/ui/theme-provider"
import { Moon, Sun, Home, ArrowLeft } from "lucide-react"

export default function EsqueciSenha() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Recuperação de senha para:", email)
    setIsSubmitted(true)
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
          <div className="flex justify-center mb-4">
            <img 
              src={theme === "light" ? "/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png" : "/lovable-uploads/60e68882-6ee2-4ed6-8618-1abcd3ab462b.png"}
              alt="Paraíso dos Focinhos"
              className="h-20 w-20"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Recuperar Senha</CardTitle>
          <CardDescription>
            {!isSubmitted 
              ? "Digite seu e-mail para receber as instruções de recuperação"
              : "Instruções enviadas para seu e-mail"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isSubmitted ? (
            <>
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

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Enviar Instruções
                </Button>
              </form>

              <div className="text-center">
                <Button variant="ghost" asChild className="text-sm">
                  <Link to="/login">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar ao Login
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Se o e-mail <strong>{email}</strong> estiver cadastrado em nossa plataforma, 
                você receberá as instruções para redefinir sua senha.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link to="/login">
                    Voltar ao Login
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Tentar outro e-mail
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
