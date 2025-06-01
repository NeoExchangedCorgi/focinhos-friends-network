
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export function PostDetailHeader() {
  return (
    <Button variant="ghost" asChild>
      <Link to="/">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Feed
      </Link>
    </Button>
  )
}
