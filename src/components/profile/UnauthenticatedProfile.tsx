
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, UserPlus } from "lucide-react"
import { Link } from "react-router-dom"

interface UnauthenticatedProfileProps {
  username?: string
}

export function UnauthenticatedProfile({ username }: UnauthenticatedProfileProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-2xl">
            {username ? `Perfil de @${username}` : "Meu Perfil"}
          </CardTitle>
          <CardDescription>
            Visualize e gerencie suas informações pessoais
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Para acessar perfis, você precisa estar logado na plataforma.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/login">
                Fazer Login
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/cadastro">
                <UserPlus className="h-4 w-4 mr-2" />
                Criar Conta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
