
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, UserCheck, ExternalLink } from "lucide-react"

export default function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 px-1 md:px-0">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Tutorial</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-blue-500" />
              <div>
                <CardTitle>Para Usuários Comuns</CardTitle>
                <CardDescription>
                  Aprenda como usar a plataforma para relatar e acompanhar casos de animais
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Este vídeo tutorial ensina como navegar pela plataforma, criar postagens, 
              curtir e comentar em posts, e usar todas as funcionalidades disponíveis.
            </p>
            <Button asChild className="w-full">
              <a 
                href="https://youtu.be/1iAB6OUrRdo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Assistir Tutorial
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-green-500" />
              <div>
                <CardTitle>Para Administradores</CardTitle>
                <CardDescription>
                  Funcionalidades administrativas e gerenciamento da plataforma
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Tutorial específico para administradores, mostrando como gerenciar 
              usuários, moderar conteúdo e utilizar ferramentas administrativas.
            </p>
            <Button asChild className="w-full">
              <a 
                href="https://youtu.be/Br8e0nolYK4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Assistir Tutorial
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dicas Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Relatórios:</strong> Sempre inclua fotos e localização precisa nos casos de animais em situação crítica.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Privacidade:</strong> Você pode ocultar seu perfil do feed e gerenciar suas postagens.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-sm">
              <strong>Comunidade:</strong> Use as curtidas e comentários para apoiar outros usuários.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
