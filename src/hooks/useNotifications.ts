
import { useState } from "react"
import { Notification } from "@/types/posts"
import { createNotificationId } from "@/utils/postUtils"

export const useNotificationsState = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: createNotificationId(notification.type),
      createdAt: new Date(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const getUnreadNotifications = (userId: string): Notification[] => {
    return notifications
      .filter(notification => notification.toUserId === userId && !notification.read)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }

  const hasUnreadNotifications = (userId: string): boolean => {
    return notifications.some(notification => notification.toUserId === userId && !notification.read)
  }

  const deleteNotificationsByPostId = (postId: string) => {
    setNotifications(prev => prev.filter(notification => notification.postId !== postId))
  }

  const deleteNotificationsByUsername = (username: string) => {
    setNotifications(prev => prev.filter(notification => 
      notification.fromUser.username !== username && notification.toUserId !== username
    ))
  }

  return {
    notifications,
    setNotifications,
    addNotification,
    markNotificationAsRead,
    getUnreadNotifications,
    hasUnreadNotifications,
    deleteNotificationsByPostId,
    deleteNotificationsByUsername
  }
}
