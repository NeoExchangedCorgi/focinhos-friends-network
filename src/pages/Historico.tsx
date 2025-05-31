
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Clock, UserPlus } from "lucide-react"

export default function Historico() {
  const { isAuthenticated, user } = useAuth()
  const { getVisitedPosts, toggleLike, toggleDenounce, hidePost, hideProfile, addToHistory } = usePosts()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Histórico de Postagens</CardTitle>
            <CardDescription>
              Aqui você pode ver todas as postagens que já visualizou
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para acessar seu histórico de postagens, você precisa estar logado na plataforma.
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

  const visitedPosts = user ? getVisitedPosts(user.id) : []

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Clock className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Histórico</h1>
      </div>
      
      {visitedPosts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma postagem no histórico</h3>
            <p className="text-muted-foreground mb-4">
              Suas postagens visitadas aparecerão aqui conforme você navega pelo feed.
            </p>
            <Button asChild>
              <Link to="/">
                Ver Feed Principal
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {visitedPosts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              isOwner={user?.username === post.author.username}
              onLike={() => user && toggleLike(post.id, user.id)}
              onDenounce={() => user && toggleDenounce(post.id, user.id)}
              onHidePost={() => user && hidePost(post.id, user.id)}
              onHideProfile={() => user && hideProfile(post.author.username, user.id)}
              onVisit={() => user && addToHistory(post.id, user.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
