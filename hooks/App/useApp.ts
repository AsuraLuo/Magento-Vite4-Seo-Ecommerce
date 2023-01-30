import { useEffect, useState } from 'react'
import { createClient } from 'contentful'

export const useApp = () => {
  const [content, setContent] = useState<any>(null)

  const client = createClient({
    space: import.meta.env.REACT_CONTENTFUL_SPACE_ID,
    environment: import.meta.env.REACT_CONTENTFUL_ENVIRONMENT,
    accessToken: import.meta.env.REACT_CONTENTFUL_ACCESS_TOKEN
  })

  useEffect(() => {
    client
      .getEntry('52QiaxHdNPCne5qt9Q0IC5')
      .then((entry: any) => {
        const rawRichTextField = entry.fields.message
        setContent(rawRichTextField)
      })
      .catch((error) => console.warn(error))
  }, [])

  return {
    content
  }
}
