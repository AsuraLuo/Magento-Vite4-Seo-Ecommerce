import { createContext, useContext, ReactNode } from 'react'
import type { PageContext } from '../types/pageType'

const Context = createContext<PageContext>(undefined as any)

function PageContextProvider({
  pageContext,
  children
}: {
  pageContext: PageContext
  children: ReactNode
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

const usePageContext = () => {
  const pageContext = useContext(Context)
  return pageContext
}

export { PageContextProvider }
export { usePageContext }
