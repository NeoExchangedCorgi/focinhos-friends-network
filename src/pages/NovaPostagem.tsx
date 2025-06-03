
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePost } from "@/components/posts/CreatePost"
import { Link, useNavigate } from "react-router-dom"
import { Plus, UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NovaPostagem() {
  const { isAuthenticated, user } = useAuth()
  const { addPost } = usePosts()
  const navigate = useNavigate()
  const { toast } = useToast()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto px-2">
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

  const handleCreatePost = (data: {
    content: string
    images: File[]
    video?: File
    location?: string
  }) => {
    if (!user) return

    // Convert files to URLs for display (in a real app, you'd upload to a server)
    const imageUrls = data.images.map(file => URL.createObjectURL(file))
    const videoUrl = data.video ? URL.createObjectURL(data.video) : undefined

    const postData = {
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        isAdmin: user.isAdmin
      },
      content: data.content,
      images: imageUrls,
      video: videoUrl,
      location: data.location
    }

    addPost(postData)
    
    toast({
      title: "Post publicado!",
      description: "Seu post foi publicado com sucesso.",
    })

    // Navigate back to home after successful post
    navigate("/")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 px-1 md:px-0">
      <div className="flex items-center gap-3">
        <Plus className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Nova Postagem</h1>
      </div>
      
      <CreatePost
        userName={user?.name || "Usuário"}
        userAvatar={user?.avatar}
        onSubmit={handleCreatePost}
      />
    </div>
  )
}
