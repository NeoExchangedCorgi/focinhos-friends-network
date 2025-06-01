
import { Post } from "@/types/posts"

export const createPostId = (): string => Date.now().toString()

export const createNotificationId = (type: string): string => 
  Date.now().toString() + '_' + type

export const filterPostsByUser = (posts: Post[], username: string): Post[] => 
  posts.filter(post => post.author.username === username)

export const filterVisiblePosts = (
  posts: Post[], 
  userId: string, 
  hiddenPosts: string[], 
  hiddenProfiles: string[]
): Post[] => {
  return posts.filter(post => 
    !hiddenPosts.includes(post.id) && 
    !hiddenProfiles.includes(post.author.username)
  )
}

export const sortPostsByDate = (posts: Post[]): Post[] => 
  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

export const sortPostsByLikes = (posts: Post[]): Post[] => 
  posts.sort((a, b) => {
    if (b.likes !== a.likes) return b.likes - a.likes
    return b.createdAt.getTime() - a.createdAt.getTime()
  })

export const filterPostsWithoutDenounced = (posts: Post[], userId?: string): Post[] => 
  posts.filter(post => !post.denouncedBy.some(id => id === userId))
