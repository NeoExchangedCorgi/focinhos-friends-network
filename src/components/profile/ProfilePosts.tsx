
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/posts/PostCard"
import { Link } from "react-router-dom"
import { Post } from "@/types/posts"
import { User } from "@/types/auth"

interface ProfilePostsProps {
  userPosts: Post[]
  isOwnProfile: boolean
  username?: string
  user: User | null
  onLike: (postId: string) => void
  onDenounce: (postId: string) => void
  onHidePost: (postId: string) => void
  onHideProfile: (username: string) => void
  onVisit: (postId: string) => void
  onAdminDelete: (postId: string) => void
}

export function ProfilePosts({
  userPosts,
  isOwnProfile,
  username,
  user,
  onLike,
  onDenounce,
  onHidePost,
  onHideProfile,
  onVisit,
  onAdminDelete
}: ProfilePostsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isOwnProfile ? "Minhas Postagens" : `Postagens de @${username}`} ({userPosts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {userPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              {isOwnProfile 
                ? "Você ainda não fez nenhuma postagem."
                : "Este usuário ainda não fez nenhuma postagem."
              }
            </p>
            {isOwnProfile && (
              <Button asChild>
                <Link to="/nova-postagem">
                  Criar Primeira Postagem
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                {...post}
                isLiked={post.likedBy.includes(user?.id || "")}
                isDenounced={post.denouncedBy.includes(user?.id || "")}
                isOwner={user?.username === post.author.username}
                currentUserIsAdmin={user?.isAdmin}
                onLike={() => onLike(post.id)}
                onDenounce={() => onDenounce(post.id)}
                onHidePost={() => onHidePost(post.id)}
                onHideProfile={() => onHideProfile(post.author.username)}
                onVisit={() => onVisit(post.id)}
                onAdminDelete={() => onAdminDelete(post.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
