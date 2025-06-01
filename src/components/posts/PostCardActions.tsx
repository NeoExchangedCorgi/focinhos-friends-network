
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Flag } from "lucide-react"

interface PostCardActionsProps {
  likes: number
  comments: number
  isLiked: boolean
  isDenounced: boolean
  isOwner: boolean
  onLike: () => void
  onComment: () => void
  onDenounce: () => void
}

export function PostCardActions({
  likes,
  comments,
  isLiked,
  isDenounced,
  isOwner,
  onLike,
  onComment,
  onDenounce
}: PostCardActionsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLike}
          disabled={isOwner}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-xs">{likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onComment}
          className="flex items-center space-x-1 hover:text-blue-500"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">{comments}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onDenounce}
        disabled={isOwner}
        className={`flex items-center space-x-1 ${
          isDenounced ? 'text-red-500 hover:text-red-600' : 'hover:text-orange-500'
        }`}
      >
        <Flag className={`h-4 w-4 ${isDenounced ? 'fill-current' : ''}`} />
        <span className="text-xs">{isDenounced ? 'Denunciado' : 'Denunciar'}</span>
      </Button>
    </div>
  )
}
