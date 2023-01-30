import type { PageContextBuiltIn } from 'vite-plugin-ssr'
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing

type PageProps = {}
type Page = (pageProps: PageProps) => React.ReactElement

export type PageContextCustom = {
  Page: Page
  PRELOADED_STATE: any
  apolloClient: any
  apolloIntialState: any
  pageProps?: PageProps
  pageHtml?: any
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom
type PageContext = PageContextClient | PageContextServer

export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }
