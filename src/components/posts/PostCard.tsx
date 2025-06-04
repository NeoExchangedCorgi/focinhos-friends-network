
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { PostCardHeader } from "./PostCardHeader"
import { PostCardActions } from "./PostCardActions"
import { PostCardDropdown } from "./PostCardDropdown"
import { EditPostDialog } from "./EditPostDialog"
import { usePosts } from "@/contexts/PostsContext"

interface PostCardProps {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
    isAdmin?: boolean
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
  currentUserIsAdmin?: boolean
  onLike?: () => void
  onComment?: () => void
  onDenounce?: () => void
  onDelete?: () => void
  onHidePost?: () => void
  onHideProfile?: () => void
  onVisit?: () => void
  onAdminDelete?: () => void
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
  currentUserIsAdmin = false,
  onLike,
  onComment,
  onDenounce,
  onDelete,
  onHidePost,
  onHideProfile,
  onVisit,
  onAdminDelete,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likes)
  const [denounced, setDenounced] = useState(isDenounced)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { editPost, getPostById, adminDeletePost } = usePosts()

  const handleLike = () => {
    if (!isOwner && !isDenounced) {
      setLiked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
      onLike?.()
    }
  }

  const handleDenounce = () => {
    if (!isOwner) {
      setDenounced(!denounced)
      onDenounce?.()
    }
  }

  const handleEdit = () => {
    if (!isDenounced) {
      setEditDialogOpen(true)
    }
  }

  const handleDelete = () => {
    if (isOwner && !isDenounced) {
      adminDeletePost(id)
      onDelete?.()
    }
  }

  const handleEditSave = (newContent: string, newImages: string[], newVideo?: string, newLocation?: string) => {
    editPost(id, newContent, newImages, newVideo, newLocation)
  }

  const handleCardClick = () => {
    onVisit?.()
    navigate(`/post/${id}`)
  }

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/perfil/${author.username}`)
  }

  const post = getPostById(id)

  return (
    <>
      <Card className="w-full mb-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <PostCardHeader 
              author={author}
              createdAt={createdAt}
              isDenounced={denounced}
              onAuthorClick={handleAuthorClick}
            />
            <PostCardDropdown
              isOwner={isOwner}
              isAdmin={currentUserIsAdmin}
              isDenounced={denounced}
              authorUsername={author.username}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onHidePost={onHidePost}
              onHideProfile={onHideProfile}
              onAdminDelete={onAdminDelete}
            />
          </div>
        </CardHeader>

        <CardContent className="py-2">
          <p className="text-sm mb-3 whitespace-pre-wrap">{content}</p>

          {location && (
            <div className="flex items-center text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          )}

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
                    className="w-full h-48 object-cover hover:scale-105 transition-transform"
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

        <CardFooter className="pt-2" onClick={(e) => e.stopPropagation()}>
          <PostCardActions
            likes={likeCount}
            comments={comments}
            isLiked={liked}
            isDenounced={denounced}
            isOwner={isOwner}
            onLike={handleLike}
            onComment={() => navigate(`/post/${id}`)}
            onDenounce={handleDenounce}
          />
        </CardFooter>
      </Card>

      {post && (
        <EditPostDialog
          post={post}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleEditSave}
        />
      )}
    </>
  )
}
