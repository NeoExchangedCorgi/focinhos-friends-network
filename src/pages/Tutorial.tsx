
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Users, Shield } from "lucide-react"

export default function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Tutorial</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <CardTitle className="text-xl">Para Usuários Comuns</CardTitle>
                <CardDescription>
                  Aprenda como usar o Pata Amiga como usuário comum
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Este vídeo ensina como criar postagens, curtir, comentar e navegar pelo sistema como usuário comum.
            </p>
            <Button asChild className="w-full">
              <a 
                href="https://youtu.be/1iAB6OUrRdo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Assistir Tutorial de Usuário
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-red-600" />
              <div>
                <CardTitle className="text-xl">Para Administradores</CardTitle>
                <CardDescription>
                  Aprenda como moderar e administrar a plataforma
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Este vídeo ensina as funcionalidades administrativas, como moderar posts, gerenciar usuários e utilizar as ferramentas de administração.
            </p>
            <Button asChild className="w-full" variant="destructive">
              <a 
                href="https://youtu.be/Br8e0nolYK4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Assistir Tutorial de Admin
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dicas Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Use localização para ajudar outros usuários a encontrarem casos próximos</li>
            <li>• Adicione fotos claras para melhor visibilidade dos casos</li>
            <li>• Seja respeitoso nos comentários e interações</li>
            <li>• Denuncie conteúdo inadequado para manter a comunidade segura</li>
            <li>• Use o histórico para acompanhar casos que você visitou</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
