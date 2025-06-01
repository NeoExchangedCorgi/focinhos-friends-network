
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function UnauthenticatedComment() {
  return (
    <Card>
      <CardContent className="text-center py-6">
        <p className="text-muted-foreground mb-4">
          Faça login para comentar neste post.
        </p>
        <Button asChild>
          <Link to="/login">Fazer Login</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
