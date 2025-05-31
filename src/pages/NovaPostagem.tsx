
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePost } from "@/components/posts/CreatePost"
import { Link } from "react-router-dom"
import { Plus, UserPlus } from "lucide-react"

export default function NovaPostagem() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Nova Postagem</CardTitle>
            <CardDescription>
              Relate casos de animais em situação crítica
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para criar postagens, você precisa estar logado na plataforma.
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

  const handleCreatePost = (data: any) => {
    console.log("Nova postagem criada:", data)
    // Aqui você enviaria os dados para o backend
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Plus className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Nova Postagem</h1>
      </div>
      
      <CreatePost
        userName={user?.name || "Usuário"}
        onSubmit={handleCreatePost}
      />
    </div>
  )
}
