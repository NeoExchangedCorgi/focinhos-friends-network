
import { useState } from "react"
import { Heart, MessageCircle, Flag, MoreHorizontal, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface PostCardProps {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  content: string
  images?: string[]
  video?: string
  location?: string
  createdAt: Date
  likes: number
  comments: number
  isLiked?: boolean
  isDenounced?: boolean
  isOwner?: boolean
  onLike?: () => void
  onComment?: () => void
  onDenounce?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function PostCard({
  id,
  author,
  content,
  images = [],
  video,
  location,
  createdAt,
  likes,
  comments,
  isLiked = false,
  isDenounced = false,
  isOwner = false,
  onLike,
  onComment,
  onDenounce,
  onEdit,
  onDelete,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (!isOwner) {
      setLiked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      onLike?.()
    }
  }

  const handleDenounce = () => {
    if (!isOwner) {
      onDenounce?.()
    }
  }

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{author.name}</h3>
              <p className="text-xs text-muted-foreground">@{author.username}</p>
            </div>
            {isDenounced && (
              <Badge variant="destructive" className="ml-2">
                Denunciado
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(createdAt, { addSuffix: true, locale: ptBR })}
            </span>
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={onDelete}
                    className="text-destructive"
                    disabled={isDenounced}
                  >
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        {/* Content */}
        <p className="text-sm mb-3 whitespace-pre-wrap">{content}</p>

        {/* Location */}
        {location && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            {location}
          </div>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div className={`grid gap-2 mb-3 ${
            images.length === 1 ? 'grid-cols-1' : 
            images.length === 2 ? 'grid-cols-2' :
            images.length === 3 ? 'grid-cols-2' :
            'grid-cols-2'
          }`}>
            {images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className={`relative overflow-hidden rounded-lg ${
                  images.length === 3 && index === 0 ? 'col-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Imagem ${index + 1}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform cursor-pointer"
                />
                {images.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      +{images.length - 4} fotos
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Video */}
        {video && (
          <div className="mb-3">
            <video
              src={video}
              controls
              className="w-full rounded-lg max-h-80"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isOwner}
              className={`flex items-center space-x-1 ${
                liked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likeCount}</span>
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
            onClick={handleDenounce}
            disabled={isOwner}
            className="flex items-center space-x-1 hover:text-orange-500"
          >
            <Flag className="h-4 w-4" />
            <span className="text-xs">Denunciar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
