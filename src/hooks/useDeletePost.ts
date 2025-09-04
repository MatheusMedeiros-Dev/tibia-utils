import { useState } from 'react'
import { db } from '../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

export const useDeletePost = (postCollection: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const deletePost = async (postId: string) => {
    setError(null)
    setLoading(true)

    try {
      await deleteDoc(doc(db, postCollection, postId))
    } catch {
      setError('Ocorreu um erro ao deletar o post. Tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return { deletePost, loading, error }
}
