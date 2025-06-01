
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface PostCardHeaderProps {
  author: {
    name: string
    username: string
    avatar?: string
    isAdmin?: boolean
  }
  createdAt: Date
  isDenounced: boolean
  onAuthorClick: (e: React.MouseEvent) => void
}

export function PostCardHeader({ author, createdAt, isDenounced, onAuthorClick }: PostCardHeaderProps) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-10 w-10 cursor-pointer" onClick={onAuthorClick}>
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h3 
            className="font-semibold text-sm cursor-pointer hover:underline flex items-center gap-1" 
            onClick={onAuthorClick}
          >
            {author.name}
            {author.isAdmin && (
              <span title="Administrador">
                <Shield className="h-4 w-4 text-blue-600 fill-current" />
              </span>
            )}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">@{author.username}</p>
      </div>
      {isDenounced && (
        <Badge variant="destructive" className="ml-2">
          Denunciado
        </Badge>
      )}
      <span className="text-xs text-muted-foreground ml-auto">
        {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
      </span>
    </div>
  )
}
