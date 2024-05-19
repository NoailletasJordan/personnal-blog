import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectToLocale = () => {
  const router = useRouter()

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage
    const targetLocale = userLang.startsWith('fr') ? '/fr' : '/en'
    router.replace(targetLocale)
  }, [router])

  return null
}

export default RedirectToLocale
