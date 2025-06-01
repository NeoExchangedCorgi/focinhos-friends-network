
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Edit, Upload, Shield, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { User } from "@/types/auth"
import { useRef } from "react"

interface ProfileHeaderProps {
  user: User | null
  profileUser: any
  isOwnProfile: boolean
  isUploadingAvatar: boolean
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteUser?: () => void
}

export function ProfileHeader({ 
  user, 
  profileUser, 
  isOwnProfile, 
  isUploadingAvatar, 
  onAvatarUpload, 
  onDeleteUser 
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
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
              onChange={onAvatarUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {profileUser?.name || profileUser?.username}
              {profileUser?.isAdmin && (
                <span>
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
          
          {user?.isAdmin && !isOwnProfile && onDeleteUser && (
            <Button 
              variant="destructive" 
              onClick={onDeleteUser}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir Usuário (Admin)
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
