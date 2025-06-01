
import { useParams } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { useToast } from "@/hooks/use-toast"
import { User } from "lucide-react"
import { useState } from "react"
import { ProfileHeader } from "@/components/profile/ProfileHeader"
import { ProfilePosts } from "@/components/profile/ProfilePosts"
import { UnauthenticatedProfile } from "@/components/profile/UnauthenticatedProfile"

export default function Perfil() {
  const { username } = useParams<{ username: string }>()
  const { isAuthenticated, user, updateProfile } = useAuth()
  const { posts, toggleLike, toggleDenounce, hidePost, hideProfile, addToHistory, adminDeletePost, adminDeleteUser } = usePosts()
  const { toast } = useToast()
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const isOwnProfile = !username || (user && username === user.username)
  const profileUser = isOwnProfile ? user : { username, name: username, avatar: undefined, isAdmin: false }

  if (!isAuthenticated) {
    return <UnauthenticatedProfile username={username} />
  }

  const userPosts = posts.filter(post => 
    post.author.username === (username || user?.username)
  ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user && isOwnProfile) {
      setIsUploadingAvatar(true)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const avatarUrl = e.target?.result as string
        updateProfile({ avatar: avatarUrl })
        setIsUploadingAvatar(false)
        toast({
          title: "Foto atualizada",
          description: "Sua foto de perfil foi atualizada com sucesso!",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteUser = () => {
    if (user?.isAdmin && username) {
      adminDeleteUser(username)
      toast({
        title: "Usuário excluído",
        description: "O usuário e todos os seus dados foram excluídos do sistema.",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <User className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">
          {isOwnProfile ? "Meu Perfil" : `Perfil de @${username}`}
        </h1>
      </div>
      
      <ProfileHeader
        user={user}
        profileUser={profileUser}
        isOwnProfile={isOwnProfile}
        isUploadingAvatar={isUploadingAvatar}
        onAvatarUpload={handleAvatarUpload}
        onDeleteUser={user?.isAdmin && !isOwnProfile ? handleDeleteUser : undefined}
      />

      <ProfilePosts
        userPosts={userPosts}
        isOwnProfile={isOwnProfile}
        username={username}
        user={user}
        onLike={(postId) => user && toggleLike(postId, user.id)}
        onDenounce={(postId) => user && toggleDenounce(postId, user.id)}
        onHidePost={(postId) => user && hidePost(postId, user.id)}
        onHideProfile={(username) => user && hideProfile(username, user.id)}
        onVisit={(postId) => user && addToHistory(postId, user.id)}
        onAdminDelete={(postId) => user?.isAdmin && adminDeletePost(postId)}
      />
    </div>
  )
}
