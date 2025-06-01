
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { CreatePost } from "@/components/posts/CreatePost"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useSearchParams } from "react-router-dom"
import { UserPlus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const { isAuthenticated, user } = useAuth()
  const { 
    getFilteredPosts, 
    toggleLike, 
    toggleDenounce, 
    hidePost, 
    hideProfile, 
    addToHistory, 
    adminDeletePost,
    addPost 
  } = usePosts()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'recent'
  const { toast } = useToast()

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
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
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <img 
              src="/lovable-uploads/08029b4e-197d-40aa-b9fe-5167c0af94a9.png"
              alt="Paraíso dos Focinhos"
              className="h-24 w-24 mx-auto mb-4 object-contain"
            />
            <CardTitle className="text-2xl">Bem-vindo ao Pata Amiga</CardTitle>
            <CardDescription>
              A rede social dedicada aos amantes dos animais
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para ver e interagir com as postagens, você precisa estar logado na plataforma.
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

  const recentPosts = getFilteredPosts('recent', user?.id)
  const likedPosts = getFilteredPosts('liked', user?.id)
  const denouncedPosts = getFilteredPosts('denounced', user?.id)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost 
        userName={user?.name}
        userAvatar={user?.avatar}
        onSubmit={handleCreatePost}
      />
      
      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
          <TabsTrigger value="liked">Mais Curtidos</TabsTrigger>
          <TabsTrigger value="denounced">Denunciados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          {recentPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma postagem encontrada. Seja o primeiro a postar!
                </p>
              </CardContent>
            </Card>
          ) : (
            recentPosts.map((post) => (
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
            ))
          )}
        </TabsContent>
        
        <TabsContent value="liked" className="space-y-4">
          {likedPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma postagem com muitas curtidas ainda.
                </p>
              </CardContent>
            </Card>
          ) : (
            likedPosts.map((post) => (
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
            ))
          )}
        </TabsContent>
        
        <TabsContent value="denounced" className="space-y-4">
          {denouncedPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground">
                  Você não denunciou nenhuma postagem.
                </p>
              </CardContent>
            </Card>
          ) : (
            denouncedPosts.map((post) => (
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
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
