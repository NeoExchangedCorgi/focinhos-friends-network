
import { useState } from "react"

export const useUserState = () => {
  const [hiddenPosts, setHiddenPosts] = useState<Record<string, string[]>>({})
  const [hiddenProfiles, setHiddenProfiles] = useState<Record<string, string[]>>({})
  const [visitHistory, setVisitHistory] = useState<Record<string, string[]>>({})

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
      [userId]: (prev[userId] || []).filter(u => u !== username)
    }))
  }

  const addToHistory = (postId: string, userId: string) => {
    setVisitHistory(prev => ({
      ...prev,
      [userId]: [...(prev[userId] || []).filter(id => id !== postId), postId]
    }))
  }

  const getHiddenPosts = (userId: string): string[] => {
    return hiddenPosts[userId] || []
  }

  const getHiddenProfiles = (userId: string): string[] => {
    return hiddenProfiles[userId] || []
  }

  const getVisitHistory = (userId: string): string[] => {
    return visitHistory[userId] || []
  }

  const removeUserFromAllStates = (username: string) => {
    setHiddenProfiles(prev => {
      const updated = { ...prev }
      Object.keys(updated).forEach(userId => {
        updated[userId] = updated[userId].filter(u => u !== username)
      })
      return updated
    })
    
    setVisitHistory(prev => {
      const updated = { ...prev }
      delete updated[username]
      return updated
    })
  }

  return {
    hiddenPosts,
    hiddenProfiles,
    visitHistory,
    hidePost,
    unhidePost,
    hideProfile,
    unhideProfile,
    addToHistory,
    getHiddenPosts,
    getHiddenProfiles,
    getVisitHistory,
    removeUserFromAllStates
  }
}
