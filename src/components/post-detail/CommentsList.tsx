
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Link } from "react-router-dom"
import { Comment } from "@/types/posts"
import { User } from "@/types/auth"

interface CommentsListProps {
  comments: Comment[]
  user: User | null
  onToggleLike: (commentId: string) => void
}

export function CommentsList({ comments, user, onToggleLike }: CommentsListProps) {
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
      {comments.map((comment) => (
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
                  onClick={() => user && onToggleLike(comment.id)}
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
      ))}
    </>
  )
}
