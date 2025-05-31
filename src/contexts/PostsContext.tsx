
import { createContext, useContext, useState, ReactNode } from "react"

export interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  content: string
  images?: string[]
  video?: string
  location?: string
  createdAt: Date
  likes: number
  comments: number
  isLiked?: boolean
  isDenounced?: boolean
  likedBy: string[]
  denouncedBy: string[]
}

interface PostsContextType {
  posts: Post[]
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => void
  toggleLike: (postId: string, userId: string) => void
  toggleDenounce: (postId: string, userId: string) => void
  hidePost: (postId: string, userId: string) => void
  hideProfile: (username: string, userId: string) => void
  getFilteredPosts: (filter: 'recent' | 'liked' | 'denounced', userId?: string) => Post[]
  getHiddenPosts: (userId: string) => Post[]
  getVisitedPosts: (userId: string) => Post[]
  addToHistory: (postId: string, userId: string) => void
  hiddenPosts: Record<string, string[]>
  hiddenProfiles: Record<string, string[]>
  visitHistory: Record<string, string[]>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [hiddenPosts, setHiddenPosts] = useState<Record<string, string[]>>({})
  const [hiddenProfiles, setHiddenProfiles] = useState<Record<string, string[]>>({})
  const [visitHistory, setVisitHistory] = useState<Record<string, string[]>>({})

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => {
    const newPost: Post = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      likedBy: [],
      denouncedBy: []
    }
    setPosts(prev => [newPost, ...prev])
  }

  const toggleLike = (postId: string, userId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(userId)
        return {
          ...post,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== userId)
            : [...post.likedBy, userId],
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !isLiked
        }
      }
      return post
    }))
  }

  const toggleDenounce = (postId: string, userId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isDenounced = post.denouncedBy.includes(userId)
        return {
          ...post,
          denouncedBy: isDenounced 
            ? post.denouncedBy.filter(id => id !== userId)
            : [...post.denouncedBy, userId],
          isDenounced: !isDenounced
        }
      }
      return post
    }))
  }

  const hidePost = (postId: string, userId: string) => {
    setHiddenPosts(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), postId]
    }))
  }

  const hideProfile = (username: string, userId: string) => {
    setHiddenProfiles(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), username]
    }))
  }

  const addToHistory = (postId: string, userId: string) => {
    setVisitHistory(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []).filter(id => id !== postId), postId]
    }))
  }

  const getFilteredPosts = (filter: 'recent' | 'liked' | 'denounced', userId?: string) => {
    let filteredPosts = posts

    if (userId) {
      // Remove posts ocultos e de perfis ocultos
      const userHiddenPosts = hiddenPosts[userId] || []
      const userHiddenProfiles = hiddenProfiles[userId] || []
      
      filteredPosts = posts.filter(post => 
        !userHiddenPosts.includes(post.id) && 
        !userHiddenProfiles.includes(post.author.username)
      )
    }

    switch (filter) {
      case 'liked':
        return filteredPosts
          .filter(post => !post.denouncedBy.some(id => id === userId))
          .sort((a, b) => {
            if (b.likes !== a.likes) return b.likes - a.likes
            return b.createdAt.getTime() - a.createdAt.getTime()
          })
      
      case 'denounced':
        return filteredPosts.filter(post => userId && post.denouncedBy.includes(userId))
      
      case 'recent':
      default:
        return filteredPosts
          .filter(post => !post.denouncedBy.some(id => id === userId))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    }
  }

  const getHiddenPosts = (userId: string) => {
    const userHiddenPosts = hiddenPosts[userId] || []
    const userHiddenProfiles = hiddenProfiles[userId] || []
    
    return posts.filter(post => 
      userHiddenPosts.includes(post.id) || 
      userHiddenProfiles.includes(post.author.username)
    )
  }

  const getVisitedPosts = (userId: string) => {
    const userHistory = visitHistory[userId] || []
    return posts.filter(post => userHistory.includes(post.id))
      .sort((a, b) => {
        const aIndex = userHistory.indexOf(a.id)
        const bIndex = userHistory.indexOf(b.id)
        return bIndex - aIndex
      })
  }

  return (
    <PostsContext.Provider value={{
      posts,
      addPost,
      toggleLike,
      toggleDenounce,
      hidePost,
      hideProfile,
      getFilteredPosts,
      getHiddenPosts,
      getVisitedPosts,
      addToHistory,
      hiddenPosts,
      hiddenProfiles,
      visitHistory
    }}>
      {children}
    </PostsContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostsContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostsProvider")
  }
  return context
}
