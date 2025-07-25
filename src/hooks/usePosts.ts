
import { useState } from "react"
import { Post } from "@/types/posts"
import { createPostId } from "@/utils/postUtils"

export const usePostsState = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments' | 'likedBy' | 'denouncedBy'>) => {
    console.log("Adding new post:", postData)
    const newPost: Post = {
      ...postData,
      id: createPostId(),
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      likedBy: [],
      denouncedBy: []
    }
    console.log("Created post object:", newPost)
    setPosts(prev => {
      const updated = [newPost, ...prev]
      console.log("Updated posts array:", updated)
      return updated
    })
  }

  const deletePost = (postId: string) => {
    console.log("Deleting post:", postId)
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  const updatePost = (postId: string, updates: Partial<Post>) => {
    console.log("Updating post:", postId, "with:", updates)
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ))
  }

  const editPost = (postId: string, content: string, images: string[] = [], video?: string, location?: string) => {
    console.log("Editing post:", postId)
    setPosts(prev => prev.map(post => 
      post.id === postId ? { 
        ...post, 
        content, 
        images, 
        video, 
        location 
      } : post
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
    editPost,
    getPostById
  }
}
