
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
import { EyeOff, UserPlus, Eye } from "lucide-react"

export default function Ocultos() {
  const { isAuthenticated, user } = useAuth()
  const { 
    getHiddenPosts, 
    getHiddenProfiles, 
    unhidePost, 
    unhideProfile,
    toggleLike, 
    toggleDenounce, 
    hidePost, 
    hideProfile, 
    addToHistory 
  } = usePosts()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <EyeOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Conteúdo Oculto</CardTitle>
            <CardDescription>
              Aqui você pode gerenciar postagens e perfis que ocultou
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para gerenciar conteúdo oculto, você precisa estar logado na plataforma.
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

  const hiddenPosts = user ? getHiddenPosts(user.id) : []
  const hiddenProfiles = user ? getHiddenProfiles(user.id) : []

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <EyeOff className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Conteúdo Oculto</h1>
      </div>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="posts">Posts Ocultos ({hiddenPosts.length})</TabsTrigger>
          <TabsTrigger value="profiles">Perfis Ocultos ({hiddenProfiles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {hiddenPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <EyeOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum post oculto</h3>
                <p className="text-muted-foreground mb-4">
                  Posts que você ocultar aparecerão aqui, onde você pode escolher exibi-los novamente.
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
              {hiddenPosts.map((post) => (
                <div key={post.id} className="relative">
                  <PostCard
                    {...post}
                    isOwner={user?.username === post.author.username}
                    onLike={() => user && toggleLike(post.id, user.id)}
                    onDenounce={() => user && toggleDenounce(post.id, user.id)}
                    onHidePost={() => user && hidePost(post.id, user.id)}
                    onHideProfile={() => user && hideProfile(post.author.username, user.id)}
                    onVisit={() => user && addToHistory(post.id, user.id)}
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => user && unhidePost(post.id, user.id)}
                      className="bg-background/80 backdrop-blur-sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Reexibir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4">
          {hiddenProfiles.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <EyeOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhum perfil oculto</h3>
                <p className="text-muted-foreground mb-4">
                  Perfis que você ocultar aparecerão aqui, onde você pode escolher exibi-los novamente.
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
              {hiddenProfiles.map((username) => (
                <Card key={username}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">@{username}</p>
                        <p className="text-sm text-muted-foreground">Perfil oculto</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => user && unhideProfile(username, user.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Reexibir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
