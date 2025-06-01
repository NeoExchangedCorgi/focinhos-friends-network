
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Heart, UserPlus } from "lucide-react"

export default function Curtidas() {
  const { isAuthenticated, user } = useAuth()
  const { posts, toggleLike, toggleDenounce, hidePost, hideProfile, addToHistory, adminDeletePost } = usePosts()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Postagens Curtidas</CardTitle>
            <CardDescription>
              Aqui você pode ver todas as postagens que curtiu
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para acessar suas curtidas, você precisa estar logado na plataforma.
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

  const likedPosts = posts.filter(post => 
    user && post.likedBy.includes(user.id) && 
    !((usePosts().hiddenPosts[user.id] || []).includes(post.id)) &&
    !((usePosts().hiddenProfiles[user.id] || []).includes(post.author.username))
  )

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Heart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Curtidas</h1>
      </div>
      
      {likedPosts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma postagem curtida</h3>
            <p className="text-muted-foreground mb-4">
              Quando você curtir postagens, elas aparecerão aqui para fácil acesso.
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
          {likedPosts.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              isLiked={post.likedBy.includes(user?.id || "")}
              isDenounced={post.denouncedBy.includes(user?.id || "")}
              isOwner={user?.username === post.author.username}
              currentUserIsAdmin={user?.isAdmin}
              onLike={() => user && toggleLike(post.id, user.id)}
              onDenounce={() => user && toggleDenounce(post.id, user.id)}
              onHidePost={() => user && hidePost(post.id, user.id)}
              onHideProfile={() => user && hideProfile(post.author.username, user.id)}
              onVisit={() => user && addToHistory(post.id, user.id)}
              onAdminDelete={() => user?.isAdmin && adminDeletePost(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
