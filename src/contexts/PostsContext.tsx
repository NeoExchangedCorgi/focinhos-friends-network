import { createContext, useContext, ReactNode } from "react"
import { Post, Comment, Notification } from "@/types/posts"
import { usePostsState } from "@/hooks/usePosts"
import { useCommentsState } from "@/hooks/useComments"
import { useNotificationsState } from "@/hooks/useNotifications"
import { useUserState } from "@/hooks/useUserState"
import { 
  filterVisiblePosts, 
  sortPostsByDate, 
  sortPostsByLikes, 
  filterPostsWithoutDenounced 
} from "@/utils/postUtils"

interface PostsContextType {
  posts: Post[]
  comments: Comment[]
  notifications: Notification[]
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => void
  editPost: (postId: string, content: string, images?: string[], video?: string, location?: string) => void
  addComment: (postId: string, content: string, author: { name: string; username: string; avatar?: string }) => void
  editComment: (commentId: string, content: string) => void
  deleteComment: (commentId: string) => void
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
  getUnreadNotifications: (userId: string) => Notification[]
  markNotificationAsRead: (notificationId: string) => void
  hasUnreadNotifications: (userId: string) => boolean
  adminDeletePost: (postId: string) => void
  adminDeleteUser: (username: string) => void
  hiddenPosts: Record<string, string[]>
  hiddenProfiles: Record<string, string[]>
  visitHistory: Record<string, string[]>
}

const PostsContext = createContext<PostsContextType | undefined>(undefined)

export function PostsProvider({ children }: { children: ReactNode }) {
  const postsState = usePostsState()
  const commentsState = useCommentsState()
  const notificationsState = useNotificationsState()
  const userState = useUserState()

  const toggleLike = (postId: string, userId: string) => {
    console.log("Toggling like for post:", postId, "user:", userId)
    const post = postsState.getPostById(postId)
    if (!post) return

    // Check if post is denounced - if so, don't allow likes
    if (post.denouncedBy.length > 0) {
      console.log("Cannot like denounced post")
      return
    }

    const isLiked = post.likedBy.includes(userId)
    const updatedPost = {
      ...post,
      likedBy: isLiked 
        ? post.likedBy.filter(id => id !== userId)
        : [...post.likedBy, userId],
      likes: isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !isLiked
    }

    postsState.updatePost(postId, updatedPost)

    // Add to history when liking
    if (!isLiked) {
      userState.addToHistory(postId, userId)
    }

    // Create notification for post author if liked
    if (!isLiked && post.author.username !== userId) {
      const currentUser = JSON.parse(localStorage.getItem("pata-amiga-user") || '{}')
      if (currentUser.username) {
        notificationsState.addNotification({
          type: 'like',
          postId,
          fromUser: {
            name: currentUser.name || 'Usuário',
            username: currentUser.username,
            avatar: currentUser.avatar
          },
          toUserId: post.author.username
        })
      }
    }
  }

  const toggleDenounce = (postId: string, userId: string) => {
    console.log("Toggling denounce for post:", postId, "user:", userId)
    const post = postsState.getPostById(postId)
    if (!post) return

    const isDenounced = post.denouncedBy.includes(userId)
    const updatedPost = {
      ...post,
      denouncedBy: isDenounced 
        ? post.denouncedBy.filter(id => id !== userId)
        : [...post.denouncedBy, userId],
      isDenounced: !isDenounced
    }

    postsState.updatePost(postId, updatedPost)
  }

  const addComment = (postId: string, content: string, author: { name: string; username: string; avatar?: string }) => {
    console.log("Adding comment to post:", postId, "content:", content)
    
    // Check if post is denounced - if so, don't allow comments
    const post = postsState.getPostById(postId)
    if (post && post.denouncedBy.length > 0) {
      console.log("Cannot comment on denounced post")
      return
    }

    const newComment = commentsState.addComment(postId, content, author)
    
    // Update post comment count
    if (post) {
      postsState.updatePost(postId, { comments: post.comments + 1 })
    }

    // Create notification for post author
    if (post && post.author.username !== author.username) {
      notificationsState.addNotification({
        type: 'comment',
        postId,
        fromUser: author,
        toUserId: post.author.username
      })
    }
  }

  const editComment = (commentId: string, content: string) => {
    const comment = commentsState.comments.find(c => c.id === commentId)
    if (!comment) return

    // Check if the post is denounced - if so, don't allow editing
    const post = postsState.getPostById(comment.postId)
    if (post && post.denouncedBy.length > 0) {
      console.log("Cannot edit comment on denounced post")
      return
    }

    commentsState.editComment(commentId, content)
  }

  const deleteComment = (commentId: string) => {
    const comment = commentsState.comments.find(c => c.id === commentId)
    if (!comment) return

    // Check if the post is denounced - if so, don't allow deletion
    const post = postsState.getPostById(comment.postId)
    if (post && post.denouncedBy.length > 0) {
      console.log("Cannot delete comment on denounced post")
      return
    }

    commentsState.deleteComment(commentId)
    
    // Update post comment count
    if (post) {
      postsState.updatePost(comment.postId, { comments: Math.max(0, post.comments - 1) })
    }
  }

  const editPost = (postId: string, content: string, images: string[] = [], video?: string, location?: string) => {
    const post = postsState.getPostById(postId)
    if (!post) return

    // Check if post is denounced - if so, don't allow editing
    if (post.denouncedBy.length > 0) {
      console.log("Cannot edit denounced post")
      return
    }

    postsState.editPost(postId, content, images, video, location)
  }

  const getFilteredPosts = (filter: 'recent' | 'liked' | 'denounced', userId?: string) => {
    console.log("Getting filtered posts:", filter, "for user:", userId)
    let filteredPosts = postsState.posts

    if (userId) {
      const userHiddenPosts = userState.getHiddenPosts(userId)
      const userHiddenProfiles = userState.getHiddenProfiles(userId)
      
      // For denounced filter, show all denounced posts (including hidden ones)
      if (filter === 'denounced') {
        return filteredPosts.filter(post => post.denouncedBy.includes(userId))
      }

      filteredPosts = filterVisiblePosts(postsState.posts, userId, userHiddenPosts, userHiddenProfiles)
    }

    switch (filter) {
      case 'liked':
        return sortPostsByLikes(filterPostsWithoutDenounced(filteredPosts, userId))
      case 'recent':
      default:
        return sortPostsByDate(filterPostsWithoutDenounced(filteredPosts, userId))
    }
  }

  const getHiddenPosts = (userId: string) => {
    const userHiddenPosts = userState.getHiddenPosts(userId)
    return postsState.posts.filter(post => userHiddenPosts.includes(post.id))
  }

  const getVisitedPosts = (userId: string) => {
    const userHistory = userState.getVisitHistory(userId)
    return postsState.posts.filter(post => userHistory.includes(post.id))
      .sort((a, b) => {
        const aIndex = userHistory.indexOf(a.id)
        const bIndex = userHistory.indexOf(b.id)
        return bIndex - aIndex
      })
  }

  const adminDeletePost = (postId: string) => {
    console.log("Admin deleting post:", postId)
    postsState.deletePost(postId)
    commentsState.deleteCommentsByPostId(postId)
    notificationsState.deleteNotificationsByPostId(postId)
  }

  const adminDeleteUser = (username: string) => {
    console.log("Admin deleting user:", username)
    // Remove all posts by the user
    postsState.setPosts(prev => prev.filter(post => post.author.username !== username))
    
    // Remove all comments by the user
    commentsState.deleteCommentsByUsername(username)
    
    // Remove all notifications related to the user
    notificationsState.deleteNotificationsByUsername(username)
    
    // Remove user from hidden profiles and visit history
    userState.removeUserFromAllStates(username)
  }

  return (
    <PostsContext.Provider value={{
      posts: postsState.posts,
      comments: commentsState.comments,
      notifications: notificationsState.notifications,
      addPost: postsState.addPost,
      editPost,
      addComment,
      editComment,
      deleteComment,
      toggleLike,
      toggleCommentLike: commentsState.toggleCommentLike,
      toggleDenounce,
      hidePost: userState.hidePost,
      unhidePost: userState.unhidePost,
      hideProfile: userState.hideProfile,
      unhideProfile: userState.unhideProfile,
      getFilteredPosts,
      getHiddenPosts,
      getHiddenProfiles: userState.getHiddenProfiles,
      getVisitedPosts,
      addToHistory: userState.addToHistory,
      getPostById: postsState.getPostById,
      getPostComments: commentsState.getPostComments,
      getUnreadNotifications: notificationsState.getUnreadNotifications,
      markNotificationAsRead: notificationsState.markNotificationAsRead,
      hasUnreadNotifications: notificationsState.hasUnreadNotifications,
      adminDeletePost,
      adminDeleteUser,
      hiddenPosts: userState.hiddenPosts,
      hiddenProfiles: userState.hiddenProfiles,
      visitHistory: userState.visitHistory
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
