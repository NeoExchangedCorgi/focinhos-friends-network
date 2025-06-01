
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { CreatePost } from "@/components/posts/CreatePost"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Link } from "react-router-dom"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const { isAuthenticated, user } = useAuth()
  const { addPost, getFilteredPosts, toggleLike, toggleDenounce, hidePost, hideProfile, addToHistory } = usePosts()
  
  const currentTab = searchParams.get('tab') || 'recent'

  // Handle scroll to show/hide scroll to top button
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 300)
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Add scroll listener
  window.addEventListener('scroll', handleScroll)

  const handleCreatePost = (data: any) => {
    if (user) {
      addPost({
        author: {
          name: user.name,
          username: user.username,
          avatar: user.avatar
        },
        content: data.content,
        images: data.images,
        video: data.video,
        location: data.location
      })
    }
  }

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  const posts = getFilteredPosts(currentTab as 'recent' | 'liked' | 'denounced', user?.username)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {isAuthenticated && (
        <CreatePost
          userName={user?.name || "Usuário"}
          onSubmit={handleCreatePost}
        />
      )}

      <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recent">Mais Recentes</TabsTrigger>
          <TabsTrigger value="liked">Mais Curtidos</TabsTrigger>
          <TabsTrigger value="denounced">Denunciados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Feed - Mais Recentes</h2>
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Bem-vindo ao Pata Amiga!</h3>
                <p className="text-muted-foreground mb-4">
                  Esta é uma rede social para relatar casos de animais em situação crítica.
                  {!isAuthenticated && " Faça login ou cadastre-se para começar a interagir."}
                </p>
                {!isAuthenticated ? (
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <Link to="/login">
                        Fazer Login
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/cadastro">
                        Criar Conta
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild>
                    <Link to="/nova-postagem">
                      Criar Primeira Postagem
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                isOwner={user?.username === post.author.username}
                onLike={() => user && toggleLike(post.id, user.username)}
                onDenounce={() => user && toggleDenounce(post.id, user.username)}
                onHidePost={() => user && hidePost(post.id, user.username)}
                onHideProfile={() => user && hideProfile(post.author.username, user.username)}
                onVisit={() => user && addToHistory(post.id, user.username)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="liked" className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Feed - Mais Curtidos</h2>
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Nenhuma postagem encontrada</h3>
                <p className="text-muted-foreground mb-4">
                  Os posts mais curtidos aparecerão aqui.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                isOwner={user?.username === post.author.username}
                onLike={() => user && toggleLike(post.id, user.username)}
                onDenounce={() => user && toggleDenounce(post.id, user.username)}
                onHidePost={() => user && hidePost(post.id, user.username)}
                onHideProfile={() => user && hideProfile(post.author.username, user.username)}
                onVisit={() => user && addToHistory(post.id, user.username)}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="denounced" className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Posts Denunciados</h2>
          {posts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Nenhuma postagem denunciada</h3>
                <p className="text-muted-foreground mb-4">
                  Posts que você denunciou aparecerão aqui.
                </p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                isOwner={user?.username === post.author.username}
                onLike={() => user && toggleLike(post.id, user.username)}
                onDenounce={() => user && toggleDenounce(post.id, user.username)}
                onHidePost={() => user && hidePost(post.id, user.username)}
                onHideProfile={() => user && hideProfile(post.author.username, user.username)}
                onVisit={() => user && addToHistory(post.id, user.username)}
              />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 rounded-full h-12 w-12 shadow-lg z-40"
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  )
}
