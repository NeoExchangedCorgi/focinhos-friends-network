
import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { 
    getPostById, 
    getPostComments, 
    addComment, 
    toggleCommentLike,
    toggleLike,
    toggleDenounce,
    hidePost,
    hideProfile,
    addToHistory
  } = usePosts()
  
  const [commentText, setCommentText] = useState("")

  const post = postId ? getPostById(postId) : undefined
  const comments = postId ? getPostComments(postId) : []

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Post não encontrado</h3>
            <p className="text-muted-foreground">
              O post que você está procurando não existe ou foi removido.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!user || !commentText.trim()) return

    addComment(postId!, {
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar
      },
      content: commentText.trim()
    })
    setCommentText("")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <PostCard
        {...post}
        isOwner={user?.username === post.author.username}
        onLike={() => user && toggleLike(post.id, user.id)}
        onDenounce={() => user && toggleDenounce(post.id, user.id)}
        onHidePost={() => user && hidePost(post.id, user.id)}
        onHideProfile={() => user && hideProfile(post.author.username, user.id)}
        onVisit={() => user && addToHistory(post.id, user.id)}
      />

      {/* Comentários */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">
            Comentários ({comments.length})
          </h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulário para novo comentário */}
          {isAuthenticated && (
            <div className="space-y-3 border-b pb-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Escreva um comentário..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  size="sm"
                >
                  Comentar
                </Button>
              </div>
            </div>
          )}

          {/* Lista de comentários */}
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {isAuthenticated ? "Seja o primeiro a comentar!" : "Nenhum comentário ainda."}
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Link to={`/perfil/${comment.author.username}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Link 
                        to={`/perfil/${comment.author.username}`}
                        className="font-semibold text-sm hover:underline"
                      >
                        {comment.author.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        @{comment.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => user && toggleCommentLike(comment.id, user.id)}
                        disabled={!isAuthenticated || comment.author.username === user?.username}
                        className={`flex items-center space-x-1 h-6 px-2 ${
                          comment.likedBy.includes(user?.id || '') 
                            ? 'text-red-500 hover:text-red-600' 
                            : 'hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-3 w-3 ${
                          comment.likedBy.includes(user?.id || '') ? 'fill-current' : ''
                        }`} />
                        <span className="text-xs">{comment.likes}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
