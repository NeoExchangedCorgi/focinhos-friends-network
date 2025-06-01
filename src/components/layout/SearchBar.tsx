
import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { getRegisteredUsers } = useAuth()

  useEffect(() => {
    if (searchTerm.trim()) {
      const allUsers = getRegisteredUsers()
      const results = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchTerm, getRegisteredUsers])

  const handleUserClick = (username: string) => {
    navigate(`/perfil/${username}`)
    setSearchTerm("")
    setShowResults(false)
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar perfis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          onBlur={() => {
            // Delay hiding results to allow clicking on them
            setTimeout(() => setShowResults(false), 200)
          }}
          onFocus={() => {
            if (searchTerm.trim()) {
              setShowResults(true)
            }
          }}
        />
      </div>

      {showResults && searchResults.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto">
          <CardContent className="p-2">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handleUserClick(user.username)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {showResults && searchResults.length === 0 && searchTerm.trim() && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum perfil encontrado para "{searchTerm}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
