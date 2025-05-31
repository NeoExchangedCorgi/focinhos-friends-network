import { useState } from "react"
import { CreatePost } from "@/components/posts/CreatePost"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "react-router-dom"

export default function Home() {
  const [posts] = useState([]) // Removendo os posts falsos
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { isAuthenticated, user } = useAuth()

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
    console.log("Nova postagem:", data)
    // Aqui você enviaria os dados para o backend
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {isAuthenticated && (
        <CreatePost
          userName={user?.name || "Usuário"}
          onSubmit={handleCreatePost}
        />
      )}

      <div className="space-y-4">
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
          posts.map((post: any) => (
            <div key={post.id}>
              {/* Posts serão renderizados aqui quando houver dados reais */}
            </div>
          ))
        )}
      </div>

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
