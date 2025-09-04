import { useEffect, useState } from 'react'
import { db } from '../firebase/config'
import { doc, getDoc } from 'firebase/firestore'

export const useFetchPost = (postCollection: string, postId: string) => {
  const [post, setPost] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function loadPost() {
      setError(null)
      setLoading(true)
      try {
        const docRef = doc(db, postCollection, postId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setPost(docSnap.data())
        } else {
          setError('Post não encontrado.')
        }
      } catch {
        setError(
          'Ocorreu um erro ao buscar o post. Tente novamente mais tarde.'
        )
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [postCollection, postId])

  return { post, loading, error }
}
