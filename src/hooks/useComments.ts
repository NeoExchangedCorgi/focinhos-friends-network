
import { useState } from "react"
import { Comment } from "@/types/posts"
import { createPostId } from "@/utils/postUtils"

export const useCommentsState = () => {
  const [comments, setComments] = useState<Comment[]>([])

  const addComment = (postId: string, content: string, author: { name: string; username: string; avatar?: string }) => {
    const newComment: Comment = {
      id: createPostId(),
      postId,
      author,
      content,
      createdAt: new Date(),
      likes: 0,
      likedBy: []
    }
    setComments(prev => [...prev, newComment])
    return newComment
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

  const getPostComments = (postId: string): Comment[] => {
    return comments
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
  }

  const deleteCommentsByPostId = (postId: string) => {
    setComments(prev => prev.filter(comment => comment.postId !== postId))
  }

  const deleteCommentsByUsername = (username: string) => {
    setComments(prev => prev.filter(comment => comment.author.username !== username))
  }

  return {
    comments,
    setComments,
    addComment,
    toggleCommentLike,
    getPostComments,
    deleteCommentsByPostId,
    deleteCommentsByUsername
  }
}
