
import { useParams, useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { PostDetailHeader } from "@/components/post-detail/PostDetailHeader"
import { PostDetailCard } from "@/components/post-detail/PostDetailCard"
import { CommentForm } from "@/components/post-detail/CommentForm"
import { CommentsList } from "@/components/post-detail/CommentsList"
import { UnauthenticatedComment } from "@/components/post-detail/UnauthenticatedComment"

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { getPostById, getPostComments, addComment, toggleLike, toggleCommentLike } = usePosts()

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

  const isPostDenounced = post.denouncedBy.length > 0
  const canLike = !!user && user.username !== post.author.username && !isPostDenounced

  const handleLike = () => {
    if (user && canLike) {
      toggleLike(post.id, user.id)
    }
  }

  const handleCommentSubmit = (content: string) => {
    if (user && !isPostDenounced) {
      addComment(postId, content, {
        name: user.name,
        username: user.username,
        avatar: user.avatar
      })
    }
  }

  const handleCommentLike = (commentId: string) => {
    if (user && !isPostDenounced) {
      toggleCommentLike(commentId, user.id)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PostDetailHeader />

      <PostDetailCard
        post={post}
        isLiked={post.likedBy.includes(user?.id || "")}
        onLike={handleLike}
        canLike={canLike}
      />

      {isAuthenticated && user ? (
        <CommentForm 
          user={user} 
          isPostDenounced={isPostDenounced}
          onSubmit={handleCommentSubmit} 
        />
      ) : (
        <UnauthenticatedComment />
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Comentários ({comments.length})
        </h3>
        
        <CommentsList
          comments={comments}
          user={user}
          postId={postId}
          isPostDenounced={isPostDenounced}
          onToggleLike={handleCommentLike}
        />
      </div>
    </div>
  )
}
