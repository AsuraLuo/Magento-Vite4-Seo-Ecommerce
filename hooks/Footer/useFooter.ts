import { useEffect, useState } from 'react'

import { GET_CMS_BLOCK } from '@graphql/queries/getCmsBlock'
import { useAwaitQuery } from '../Apollo'

export const useFooter = () => {
  const fetchCmsBlock: any = useAwaitQuery(GET_CMS_BLOCK)
  const [blocks, setBlocks] = useState<any>(null)

  useEffect(() => {
    const getCmsBlock = async () => {
      const { data } = await fetchCmsBlock({
        variables: {
          identifiers: ['footer_link']
        }
      })
      console.warn(data)
      setBlocks(data?.cmsBlocks?.items?.[0] ?? null)
    }

    getCmsBlock()
  }, [fetchCmsBlock])

  return {
    blocks
  }
}
