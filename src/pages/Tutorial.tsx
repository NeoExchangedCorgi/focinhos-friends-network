
import { ExternalLink, BookOpen, Youtube } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Tutorial() {
  const videos = [
    {
      id: 1,
      title: "Tutorial 1 - Primeiros Passos",
      description: "Aprenda os conceitos básicos da plataforma Pata Amiga",
      url: "https://youtu.be/1iAB6OUrRdo",
      thumbnail: "https://img.youtube.com/vi/1iAB6OUrRdo/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "Tutorial 2 - Funcionalidades Avançadas", 
      description: "Explore recursos avançados e dicas de uso",
      url: "https://youtu.be/Br8e0nolYK4",
      thumbnail: "https://img.youtube.com/vi/Br8e0nolYK4/maxresdefault.jpg"
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-1 md:px-0">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Tutorial</h1>
      </div>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          Assista aos vídeos tutoriais para aprender a usar todas as funcionalidades da plataforma Pata Amiga.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-muted">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Youtube className="h-12 w-12 text-white/80" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Youtube className="h-4 w-4" />
                  Assistir no YouTube
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Dicas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Assista aos vídeos na ordem recomendada para melhor compreensão</li>
            <li>• Pratique as funcionalidades mostradas nos tutoriais</li>
            <li>• Entre em contato conosco se tiver dúvidas específicas</li>
            <li>• Os vídeos são atualizados regularmente com novas funcionalidades</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
