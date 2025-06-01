
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Edit, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Link } from "react-router-dom"
import { Comment } from "@/types/posts"
import { User } from "@/types/auth"
import { usePosts } from "@/contexts/PostsContext"

interface CommentsListProps {
  comments: Comment[]
  user: User | null
  postId: string
  isPostDenounced: boolean
  onToggleLike: (commentId: string) => void
}

export function CommentsList({ comments, user, postId, isPostDenounced, onToggleLike }: CommentsListProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingComment, setEditingComment] = useState<Comment | null>(null)
  const [editContent, setEditContent] = useState("")
  const { editComment, deleteComment, adminDeleteComment } = usePosts()

  const handleEditClick = (comment: Comment) => {
    if (!isPostDenounced) {
      setEditingComment(comment)
      setEditContent(comment.content)
      setEditDialogOpen(true)
    }
  }

  const handleEditSave = () => {
    if (editingComment && !isPostDenounced) {
      editComment(editingComment.id, editContent)
      setEditDialogOpen(false)
      setEditingComment(null)
      setEditContent("")
    }
  }

  const handleDelete = (commentId: string) => {
    if (!isPostDenounced) {
      if (user?.isAdmin) {
        adminDeleteComment(commentId)
      } else {
        deleteComment(commentId)
      }
    }
  }

  if (comments.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MessageCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            Seja o primeiro a comentar!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      {comments.map((comment) => {
        const isCommentOwner = user?.username === comment.author.username
        const canDeleteComment = isCommentOwner || user?.isAdmin
        return (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
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
                    {canDeleteComment && !isPostDenounced && (
                      <div className="flex items-center space-x-1">
                        {isCommentOwner && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClick(comment)}
                            className="h-6 px-2"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(comment.id)}
                          className="h-6 px-2 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm mb-2 whitespace-pre-wrap">{comment.content}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => user && !isPostDenounced && onToggleLike(comment.id)}
                    disabled={!user || isPostDenounced}
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
        )
      })}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Comentário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edite seu comentário..."
              className="min-h-20"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditSave} disabled={!editContent.trim()}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
