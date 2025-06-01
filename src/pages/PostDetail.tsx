
import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, MessageCircle, MapPin, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { getPostById, getPostComments, addComment, toggleLike, toggleCommentLike } = usePosts()
  const [commentContent, setCommentContent] = useState("")

  if (!postId) {
    navigate("/")
    return null
  }

  const post = getPostById(postId)
  const comments = getPostComments(postId)

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post não encontrado</h2>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Feed
          </Link>
        </Button>
      </div>
    )
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || !user) return

    addComment(postId, commentContent, {
      name: user.name,
      username: user.username,
      avatar: user.avatar
    })
    setCommentContent("")
  }

  const handleLike = () => {
    if (user) {
      toggleLike(post.id, user.username)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back button */}
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Feed
        </Link>
      </Button>

      {/* Post */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/perfil/${post.author.username}`}>
                  <h3 className="font-semibold text-sm hover:underline">{post.author.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground">@{post.author.username}</p>
              </div>
              {post.isDenounced && (
                <Badge variant="destructive" className="ml-2">
                  Denunciado
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: ptBR })}
            </span>
          </div>
        </CardHeader>

        <CardContent className="py-2">
          {/* Content */}
          <p className="text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

          {/* Location */}
          {post.location && (
            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3 mr-1" />
              {post.location}
            </div>
          )}

          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className={`grid gap-2 mb-3 ${
              post.images.length === 1 ? 'grid-cols-1' : 
              post.images.length === 2 ? 'grid-cols-2' :
              post.images.length === 3 ? 'grid-cols-2' :
              'grid-cols-2'
            }`}>
              {post.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className={`relative overflow-hidden rounded-lg ${
                    post.images!.length === 3 && index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  {post.images!.length > 4 && index === 3 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{post.images!.length - 4} fotos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Video */}
          {post.video && (
            <div className="mb-3">
              <video
                src={post.video}
                controls
                className="w-full rounded-lg max-h-80"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={!user || user.username === post.author.username}
                className={`flex items-center space-x-1 ${
                  post.isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">{post.likes}</span>
              </Button>

              <div className="flex items-center space-x-1 text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comments}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comment form */}
      {isAuthenticated ? (
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Escreva um comentário..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="min-h-20 resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!commentContent.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Comentar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-6">
            <p className="text-muted-foreground mb-4">
              Faça login para comentar neste post.
            </p>
            <Button asChild>
              <Link to="/login">Fazer Login</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Comentários ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Seja o primeiro a comentar!
              </p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Link to={`/perfil/${comment.author.username}`}>
                        <span className="font-semibold text-sm hover:underline">
                          {comment.author.name}
                        </span>
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        @{comment.author.username}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: ptBR })}
                      </span>
                    </div>
                    <p className="text-sm mb-2 whitespace-pre-wrap">{comment.content}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => user && toggleCommentLike(comment.id, user.username)}
                      disabled={!user}
                      className={`flex items-center space-x-1 h-6 px-2 ${
                        comment.likedBy.includes(user?.username || '') 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-3 w-3 ${
                        comment.likedBy.includes(user?.username || '') ? 'fill-current' : ''
                      }`} />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
