
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MapPin } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Link } from "react-router-dom"
import { Post } from "@/types/posts"

interface PostDetailCardProps {
  post: Post
  isLiked: boolean
  onLike: () => void
  canLike: boolean
}

export function PostDetailCard({ post, isLiked, onLike, canLike }: PostDetailCardProps) {
  return (
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
        <p className="text-sm mb-3 whitespace-pre-wrap">{post.content}</p>

        {post.location && (
          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            {post.location}
          </div>
        )}

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

        {post.video && (
          <div className="mb-3">
            <video
              src={post.video}
              controls
              className="w-full rounded-lg max-h-80"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              disabled={!canLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
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
  )
}
