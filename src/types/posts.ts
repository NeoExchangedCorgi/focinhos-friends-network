
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
    isAdmin?: boolean
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
