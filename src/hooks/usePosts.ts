
import { useState } from "react"
import { Post } from "@/types/posts"
import { createPostId } from "@/utils/postUtils"

export const usePostsState = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => {
    const newPost: Post = {
      ...postData,
      id: createPostId(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      likedBy: [],
      denouncedBy: []
    }
    setPosts(prev => [newPost, ...prev])
  }

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  const updatePost = (postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ))
  }

  const getPostById = (postId: string): Post | undefined => {
    return posts.find(post => post.id === postId)
  }

  return {
    posts,
    setPosts,
    addPost,
    deletePost,
    updatePost,
    getPostById
  }
}
