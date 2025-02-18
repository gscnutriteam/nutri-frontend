'use client'
import { useRouter } from 'next/navigation'

export function useAppRouter() {
  const router = useRouter()

  return {
    ...router,
    push: (path: string) => {
      // Jika path sudah ada /app atau dimulai dengan http/https, gunakan path asli
      if (path.startsWith('/app') || path.startsWith('http')) {
        router.push(path)
      } else {
        // Tambahkan /app di depan path
        router.push(`/app${path.startsWith('/') ? path : `/${path}`}`)
      }
    },
    replace: (path: string) => {
      if (path.startsWith('/app') || path.startsWith('http')) {
        router.replace(path)
      } else {
        router.replace(`/app${path.startsWith('/') ? path : `/${path}`}`)
      }
    }
  }
}