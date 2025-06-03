
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
    <Card className="w-full mb-6 mx-auto max-w-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-3">
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-base md:text-lg">Nova Postagem</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4">
        <Textarea
          placeholder="Relate um caso de animal em situação crítica..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px] md:min-h-[120px] resize-none text-sm"
        />

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center space-x-1 text-sm">
            <MapPin className="h-4 w-4" />
            <span>Localização (opcional)</span>
          </Label>
          <Input
            id="location"
            placeholder="Ex: Rua das Flores, Centro - RJ"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="text-sm"
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
                  className="w-full h-24 md:h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 h-5 w-5 md:h-6 md:w-6 p-0 text-xs"
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
              className="w-full rounded-lg max-h-48 md:max-h-60"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1 text-xs"
              onClick={() => setVideo(null)}
            >
              Remover vídeo
            </Button>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
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
                className="text-xs md:text-sm"
              >
                <label htmlFor="image-upload" className="cursor-pointer">
                  <ImagePlus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
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
                className="text-xs md:text-sm"
              >
                <label htmlFor="video-upload" className="cursor-pointer">
                  <Video className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {video ? "Vídeo OK" : "Vídeo"}
                </label>
              </Button>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-primary hover:bg-primary/90 text-xs md:text-sm w-full md:w-auto"
          >
            <Send className="h-3 w-3 md:h-4 md:w-4 mr-1" />
            Publicar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
