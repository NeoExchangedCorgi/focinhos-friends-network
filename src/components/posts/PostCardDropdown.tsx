
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, EyeOff, UserX, Trash2, Edit } from "lucide-react"

interface PostCardDropdownProps {
  isOwner: boolean
  isAdmin: boolean
  isDenounced: boolean
  authorUsername: string
  onEdit?: () => void
  onDelete?: () => void
  onHidePost?: () => void
  onHideProfile?: () => void
  onAdminDelete?: () => void
}

export function PostCardDropdown({
  isOwner,
  isAdmin,
  isDenounced,
  authorUsername,
  onEdit,
  onDelete,
  onHidePost,
  onHideProfile,
  onAdminDelete
}: PostCardDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border">
        {isOwner ? (
          <>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onEdit?.() }}
              disabled={isDenounced}
              className="flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete?.() }}
              className="text-destructive"
              disabled={isDenounced}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onHidePost?.() }}
              className="flex items-center"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Ocultar este post
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onHideProfile?.() }}
              className="flex items-center text-orange-600"
            >
              <UserX className="h-4 w-4 mr-2" />
              Ocultar meu perfil
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onHidePost?.() }}
              className="flex items-center"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Ocultar este post
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onHideProfile?.() }}
              className="flex items-center text-orange-600"
            >
              <UserX className="h-4 w-4 mr-2" />
              Ocultar @{authorUsername}
            </DropdownMenuItem>
          </>
        )}
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onAdminDelete?.() }}
              className="flex items-center text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir (Admin)
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
