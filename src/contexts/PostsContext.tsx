
import { createContext, useContext, useState, ReactNode } from "react"

export interface Comment {
  id: string
  postId: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  content: string
  createdAt: Date
  likes: number
  likedBy: string[]
}

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

export interface Notification {
  id: string
  type: 'like' | 'comment'
  postId: string
  fromUser: {
    name: string
    username: string
    avatar?: string
  }
  toUserId: string
  createdAt: Date
  read: boolean
}

interface PostsContextType {
  posts: Post[]
  comments: Comment[]
  notifications: Notification[]
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => void
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'postId'>) => void
  toggleLike: (postId: string, userId: string) => void
  toggleCommentLike: (commentId: string, userId: string) => void
  toggleDenounce: (postId: string, userId: string) => void
  hidePost: (postId: string, userId: string) => void
  unhidePost: (postId: string, userId: string) => void
  hideProfile: (username: string, userId: string) => void
  unhideProfile: (username: string, userId: string) => void
  getFilteredPosts: (filter: 'recent' | 'liked' | 'denounced', userId?: string) => Post[]
  getHiddenPosts: (userId: string) => Post[]
  getHiddenProfiles: (userId: string) => string[]
  getVisitedPosts: (userId: string) => Post[]
  addToHistory: (postId: string, userId: string) => void
  getPostById: (postId: string) => Post | undefined
  getPostComments: (postId: string) => Comment[]
  getUserNotifications: (userId: string) => Notification[]
  markNotificationAsRead: (notificationId: string) => void
  getUnreadNotificationsCount: (userId: string) => number
  hiddenPosts: Record<string, string[]>
  hiddenProfiles: Record<string, string[]>
  visitHistory: Record<string, string[]>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
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

  const addComment = (postId: string, commentData: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'likedBy' | 'postId'>) => {
    const newComment: Comment = {
      ...commentData,
      id: Date.now().toString(),
      postId,
      createdAt: new Date(),
      likes: 0,
      likedBy: []
    }
    setComments(prev => [...prev, newComment])
    
    // Update post comments count
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ))

    // Create notification for post author
    const post = posts.find(p => p.id === postId)
    if (post && post.author.username !== commentData.author.username) {
      const notification: Notification = {
        id: Date.now().toString() + '_comment',
        type: 'comment',
        postId,
        fromUser: commentData.author,
        toUserId: post.author.username,
        createdAt: new Date(),
        read: false
      }
      setNotifications(prev => [notification, ...prev])
    }
  }

  const toggleLike = (postId: string, userId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(userId)
        const updatedPost = {
          ...post,
          likedBy: isLiked 
            ? post.likedBy.filter(id => id !== userId)
            : [...post.likedBy, userId],
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !isLiked
        }

        // Create notification for post author when liked
        if (!isLiked && post.author.username !== userId) {
          const notification: Notification = {
            id: Date.now().toString() + '_like',
            type: 'like',
            postId,
            fromUser: {
              name: 'Usuário',
              username: userId,
              avatar: undefined
            },
            toUserId: post.author.username,
            createdAt: new Date(),
            read: false
          }
          setNotifications(prev => [notification, ...prev])
        }

        return updatedPost
      }
      return post
    }))
  }

  const toggleCommentLike = (commentId: string, userId: string) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.likedBy.includes(userId)
        return {
          ...comment,
          likedBy: isLiked 
            ? comment.likedBy.filter(id => id !== userId)
            : [...comment.likedBy, userId],
          likes: isLiked ? comment.likes - 1 : comment.likes + 1
        }
      }
      return comment
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

  const unhidePost = (postId: string, userId: string) => {
    setHiddenPosts(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter(id => id !== postId)
    }))
  }

  const hideProfile = (username: string, userId: string) => {
    setHiddenProfiles(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []), username]
    }))
  }

  const unhideProfile = (username: string, userId: string) => {
    setHiddenProfiles(prev => ({
      ...prev,
      [userId]: (prev[userId] || []).filter(name => name !== username)
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
    return posts.filter(post => userHiddenPosts.includes(post.id))
  }

  const getHiddenProfiles = (userId: string) => {
    return hiddenProfiles[userId] || []
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

  const getPostById = (postId: string) => {
    return posts.find(post => post.id === postId)
  }

  const getPostComments = (postId: string) => {
    return comments.filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  const getUserNotifications = (userId: string) => {
    return notifications.filter(notification => notification.toUserId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const getUnreadNotificationsCount = (userId: string) => {
    return notifications.filter(notification => 
      notification.toUserId === userId && !notification.read
    ).length
  }

  return (
    <PostsContext.Provider value={{
      posts,
      comments,
      notifications,
      addPost,
      addComment,
      toggleLike,
      toggleCommentLike,
      toggleDenounce,
      hidePost,
      unhidePost,
      hideProfile,
      unhideProfile,
      getFilteredPosts,
      getHiddenPosts,
      getHiddenProfiles,
      getVisitedPosts,
      addToHistory,
      getPostById,
      getPostComments,
      getUserNotifications,
      markNotificationAsRead,
      getUnreadNotificationsCount,
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
