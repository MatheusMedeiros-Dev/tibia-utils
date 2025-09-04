import { useState } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useAuthValue } from '../context/AuthContext'

type PostInput = {
  title: string
  imageUrl: string
  body: string
  tagsArray: string[]
}

export const useInsertPost = (postCollection: string) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useAuthValue()

  const insertPost = async (postInput: PostInput) => {
    setError(null)
    setLoading(true)

    try {
      const newPost = {
        ...postInput,
        uid: user?.uid,
        createdBy: user?.displayName,
        createdAt: Timestamp.now(),
      }
      await addDoc(collection(db, postCollection), newPost)
    } catch {
      setError('Ocorreu um erro ao criar o post. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return { insertPost, loading, error }
}
