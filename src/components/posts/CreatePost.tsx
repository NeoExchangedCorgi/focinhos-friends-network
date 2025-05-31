
import { useState } from "react"
import { ImagePlus, Video, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatePostProps {
  userName?: string
  userAvatar?: string
  onSubmit?: (data: {
    content: string
    images: File[]
    video?: File
    location?: string
  }) => void
}

export function CreatePost({ 
  userName = "Usuário", 
  userAvatar, 
  onSubmit 
}: CreatePostProps) {
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [video, setVideo] = useState<File | null>(null)
  const [location, setLocation] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length <= 4) {
      setImages([...images, ...files])
      
      // Create preview URLs
      const newUrls = files.map(file => URL.createObjectURL(file))
      setImageUrls([...imageUrls, ...newUrls])
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideo(file)
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    const newUrls = imageUrls.filter((_, i) => i !== index)
    setImages(newImages)
    setImageUrls(newUrls)
  }

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit?.({
        content,
        images,
        video: video || undefined,
        location: location || undefined
      })
      
      // Reset form
      setContent("")
      setImages([])
      setVideo(null)
      setLocation("")
      setImageUrls([])
    }
  }

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-lg">Nova Postagem</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Relate um caso de animal em situação crítica..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none"
        />

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>Localização (opcional)</span>
          </Label>
          <Input
            id="location"
            placeholder="Ex: Rua das Flores, Centro - Rio de Janeiro"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Image previews */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-6 w-6 p-0"
                  onClick={() => removeImage(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Video preview */}
        {video && (
          <div className="relative">
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full rounded-lg max-h-60"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1"
              onClick={() => setVideo(null)}
            >
              Remover vídeo
            </Button>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                disabled={images.length >= 4}
              />
              <Button
                variant="outline"
                size="sm"
                asChild
                disabled={images.length >= 4}
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImagePlus className="h-4 w-4 mr-1" />
                  Fotos ({images.length}/4)
                </label>
              </Button>
            </div>

            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden"
                id="video-upload"
                disabled={!!video}
              />
              <Button
                variant="outline"
                size="sm"
                asChild
                disabled={!!video}
              >
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Video className="h-4 w-4 mr-1" />
                  {video ? "Vídeo adicionado" : "Vídeo"}
                </label>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4 mr-1" />
            Publicar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
