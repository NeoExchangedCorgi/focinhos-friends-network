
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Post } from "@/types/posts"

interface EditPostDialogProps {
  post: Post
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (content: string, images: string[], video?: string, location?: string) => void
}

export function EditPostDialog({ post, open, onOpenChange, onSave }: EditPostDialogProps) {
  const [content, setContent] = useState(post.content)
  const [location, setLocation] = useState(post.location || "")

  const handleSave = () => {
    onSave(content, post.images || [], post.video, location || undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="O que você quer compartilhar?"
              className="min-h-32"
            />
          </div>
          <div>
            <Label htmlFor="location">Localização (opcional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Onde foi tirada a foto/vídeo?"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!content.trim()}>
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
