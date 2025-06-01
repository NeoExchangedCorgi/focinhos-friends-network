
import { useParams } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { PostCard } from "@/components/posts/PostCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Link } from "react-router-dom"
import { User, UserPlus, Calendar, Edit, Upload, Shield, Trash2 } from "lucide-react"
import { useState, useRef } from "react"

export default function Perfil() {
  const { username } = useParams<{ username: string }>()
  const { isAuthenticated, user, updateProfile } = useAuth()
  const { posts, toggleLike, toggleDenounce, hidePost, hideProfile, addToHistory, adminDeletePost, adminDeleteUser } = usePosts()
  const { toast } = useToast()
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Se não há username na URL, é o perfil do usuário logado
  const isOwnProfile = !username || (user && username === user.username)
  const profileUser = isOwnProfile ? user : { username, name: username, avatar: undefined, isAdmin: false }

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">
              {username ? `Perfil de @${username}` : "Meu Perfil"}
            </CardTitle>
            <CardDescription>
              Visualize e gerencie suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para acessar perfis, você precisa estar logado na plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link to="/login">
                  Fazer Login
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/cadastro">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Criar Conta
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get user posts
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
      
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className={`h-20 w-20 ${isOwnProfile ? 'cursor-pointer' : ''}`} onClick={isOwnProfile ? () => fileInputRef.current?.click() : undefined}>
                <AvatarImage src={profileUser?.avatar} alt={profileUser?.name} />
                <AvatarFallback className="text-lg">
                  {profileUser?.name?.charAt(0).toUpperCase() || profileUser?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isOwnProfile && (
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              )}
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl flex items-center gap-2">
                {profileUser?.name || profileUser?.username}
                {profileUser?.isAdmin && (
                  <span title="Administrador">
                    <Shield className="h-5 w-5 text-blue-600 fill-current" />
                  </span>
                )}
              </CardTitle>
              <CardDescription className="text-base">
                @{profileUser?.username}
              </CardDescription>
              <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Membro desde hoje</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            <p className="text-muted-foreground">
              {user?.bio || (isOwnProfile 
                ? "Defensor dos animais na plataforma Pata Amiga."
                : `Perfil de ${profileUser?.name || profileUser?.username} na plataforma Pata Amiga.`
              )}
            </p>
          </div>
          
          <div className="flex gap-3">
            {isOwnProfile && (
              <Button asChild>
                <Link to="/dados-usuario">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Link>
              </Button>
            )}
            
            {user?.isAdmin && !isOwnProfile && username && (
              <Button 
                variant="destructive" 
                onClick={handleDeleteUser}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Excluir Usuário (Admin)
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

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
                  onLike={() => user && toggleLike(post.id, user.id)}
                  onDenounce={() => user && toggleDenounce(post.id, user.id)}
                  onHidePost={() => user && hidePost(post.id, user.id)}
                  onHideProfile={() => user && hideProfile(post.author.username, user.id)}
                  onVisit={() => user && addToHistory(post.id, user.id)}
                  onAdminDelete={() => user?.isAdmin && adminDeletePost(post.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
