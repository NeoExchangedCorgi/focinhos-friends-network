
import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  id: string
  name: string
  username: string
  email: string
  avatar?: string
  bio?: string
  phone?: string
  password?: string
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  updatePassword: (newPassword: string) => void
  resetPassword: (email: string, newPassword: string) => boolean
  getRegisteredUsers: () => User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("pata-amiga-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário salvo:", error)
        localStorage.removeItem("pata-amiga-user")
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("pata-amiga-user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pata-amiga-user")
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("pata-amiga-user", JSON.stringify(updatedUser))
      
      // Update user data in all stored users
      const allUsers = JSON.parse(localStorage.getItem("pata-amiga-all-users") || "[]")
      const userIndex = allUsers.findIndex((u: User) => u.id === user.id)
      if (userIndex !== -1) {
        allUsers[userIndex] = updatedUser
        localStorage.setItem("pata-amiga-all-users", JSON.stringify(allUsers))
      }
    }
  }

  const updatePassword = (newPassword: string) => {
    if (user) {
      const updatedUser = { ...user, password: newPassword }
      setUser(updatedUser)
      localStorage.setItem("pata-amiga-user", JSON.stringify(updatedUser))
      
      // Update password in all stored users
      const allUsers = JSON.parse(localStorage.getItem("pata-amiga-all-users") || "[]")
      const userIndex = allUsers.findIndex((u: User) => u.id === user.id)
      if (userIndex !== -1) {
        allUsers[userIndex] = updatedUser
        localStorage.setItem("pata-amiga-all-users", JSON.stringify(allUsers))
      }
    }
  }

  const resetPassword = (email: string, newPassword: string) => {
    const allUsers = JSON.parse(localStorage.getItem("pata-amiga-all-users") || "[]")
    const userIndex = allUsers.findIndex((u: User) => u.email === email)
    
    if (userIndex !== -1) {
      allUsers[userIndex].password = newPassword
      localStorage.setItem("pata-amiga-all-users", JSON.stringify(allUsers))
      return true
    }
    
    return false
  }

  const getRegisteredUsers = (): User[] => {
    const allUsers = JSON.parse(localStorage.getItem("pata-amiga-all-users") || "[]")
    return allUsers
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      updateProfile, 
      updatePassword, 
      resetPassword,
      getRegisteredUsers 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
