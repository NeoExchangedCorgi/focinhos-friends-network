
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { User } from "@/types/auth"

interface CommentFormProps {
  user: User
  isPostDenounced: boolean
  onSubmit: (content: string) => void
}

export function CommentForm({ user, isPostDenounced, onSubmit }: CommentFormProps) {
  const [commentContent, setCommentContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim() || isPostDenounced) return

    onSubmit(commentContent)
    setCommentContent("")
  }

  if (isPostDenounced) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">
            Comentários não são permitidos em posts denunciados.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
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
  )
}
