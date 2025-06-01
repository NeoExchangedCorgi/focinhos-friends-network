
import { useAuth } from "@/contexts/AuthContext"
import { usePosts } from "@/contexts/PostsContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from "react-router-dom"
import { Bell, UserPlus, Heart, MessageCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function Notificacoes() {
  const { isAuthenticated, user } = useAuth()
  const { getUnreadNotifications, markNotificationAsRead } = usePosts()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="text-2xl">Notificações</CardTitle>
            <CardDescription>
              Acompanhe curtidas e comentários em suas postagens
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Para ver suas notificações, você precisa estar logado na plataforma.
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

  const notifications = user ? getUnreadNotifications(user.username) : []

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id)
    navigate(`/post/${notification.postId}`)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-primary">Notificações</h1>
      </div>
      
      {notifications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhuma notificação</h3>
            <p className="text-muted-foreground mb-4">
              Você será notificado quando receberem curtidas e comentários em suas postagens.
            </p>
            <Button asChild>
              <Link to="/nova-postagem">
                Criar Primeira Postagem
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.fromUser.avatar} alt={notification.fromUser.name} />
                    <AvatarFallback>{notification.fromUser.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {notification.type === 'like' ? (
                        <Heart className="h-4 w-4 text-red-500" />
                      ) : (
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="font-semibold text-sm">
                        {notification.fromUser.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {notification.type === 'like' ? 'curtiu' : 'comentou em'} seu post
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ptBR })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
