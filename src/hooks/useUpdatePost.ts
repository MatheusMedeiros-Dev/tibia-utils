import { useState } from 'react'
import { db } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

type PostUpdateData = {
  title: string
  imageUrl: string
  body: string
  tagsArray: string[]
}

export const useUpdatePost = (postCollection: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const updatePost = async (postId: string, postUpdateData: PostUpdateData) => {
    setError(null)
    setLoading(true)

    try {
      const postRef = doc(db, postCollection, postId)
      await updateDoc(postRef, postUpdateData)
    } catch {
      setError('Ocorreu um erro ao editar o post. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return { updatePost, loading, error }
}
