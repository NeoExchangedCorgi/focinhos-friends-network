
import { useState } from "react"
import { PostCard } from "@/components/posts/PostCard"
import { CreatePost } from "@/components/posts/CreatePost"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

// Mock data for posts
const mockPosts = [
  {
    id: "1",
    author: {
      name: "Maria Silva",
      username: "maria_defensora",
      avatar: ""
    },
    content: "Encontrei um cãozinho machucado na Rua das Flores, próximo ao mercado. Ele está com uma pata ferida e parece estar há dias na rua. Precisa de ajuda urgente! 🐕💔",
    images: [],
    location: "Rua das Flores, Centro - Rio de Janeiro",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    isLiked: false,
    isDenounced: false,
    isOwner: false
  },
  {
    id: "2",
    author: {
      name: "João Santos",
      username: "joao_animal_lover",
      avatar: ""
    },
    content: "Gatinha abandonada com filhotes embaixo da ponte na Av. Brasil. Eles estão em uma caixa de papelão molhada. Situação muito triste, precisamos agir rápido! 😿\n\nJá entrei em contato com a ONG mas ainda não tive retorno.",
    images: [],
    location: "Av. Brasil, altura do km 15",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 42,
    comments: 15,
    isLiked: true,
    isDenounced: false,
    isOwner: false
  },
  {
    id: "3",
    author: {
      name: "Ana Costa",
      username: "ana_sos_pets",
      avatar: ""
    },
    content: "URGENTE: Cachorro atropelado na esquina da Rua X com Y. Está consciente mas não consegue se mover. Já liguei para emergência veterinária. Se alguém puder ajudar...",
    images: [],
    location: "Esquina Rua X com Rua Y, Copacabana",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    likes: 67,
    comments: 23,
    isLiked: false,
    isDenounced: false,
    isOwner: false
  }
]

export default function Home() {
  const [posts, setPosts] = useState(mockPosts)
  const [showScrollTop, setShowScrollTop] = useState(false)

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
    // Here you would typically send the data to your backend
  }

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleComment = (postId: string) => {
    console.log("Comentar no post:", postId)
  }

  const handleDenounce = (postId: string) => {
    console.log("Denunciar post:", postId)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost
        userName="Usuário Atual"
        onSubmit={handleCreatePost}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-primary">Feed - Mais Recentes</h2>
        
        {posts.map((post) => (
          <PostCard
            key={post.id}
            {...post}
            onLike={() => handleLike(post.id)}
            onComment={() => handleComment(post.id)}
            onDenounce={() => handleDenounce(post.id)}
          />
        ))}
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
