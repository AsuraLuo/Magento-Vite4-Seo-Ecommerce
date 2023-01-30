import { Provider } from 'react-redux'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr'
import { getDataFromTree } from '@apollo/client/react/ssr'

import { GET_STORE_CONFIG } from '@graphql/queries/getStoreConfig'
import { createStore } from '@store/create'
import { asyncActions as appAsyncActions } from '@store/app'
import PageShell from '@components/PageShell'
import { PageContextServer } from '../types/pageType'

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = [
  'PRELOADED_STATE',
  'apolloIntialState',
  'documentProps',
  'pageProps',
  'pageHtml'
]

const render = async (pageContext: PageContextServer) => {
  const { pageHtml } = pageContext

  const { documentProps } = pageContext.exports
  const title = (documentProps && documentProps.title) || 'Vite SSR app'
  const desc =
    (documentProps && documentProps.description) ||
    'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  }
}

const onBeforeRender = async (pageContext: PageContextServer) => {
  const { Page, apolloClient } = pageContext
  const store: any = createStore()
  const { dispatch } = store

  await dispatch(
    appAsyncActions.fetchStoreConfig({
      apolloClient,
      query: GET_STORE_CONFIG
    })
  )

  // See https://www.apollographql.com/docs/react/performance/server-side-rendering/
  const tree = (
    <PageShell apolloClient={apolloClient} pageContext={pageContext}>
      <Provider store={store}>
        <Page />
      </Provider>
    </PageShell>
  )

  const pageHtml = await getDataFromTree(tree)
  const apolloIntialState = apolloClient.extract()

  // Grab the initial state from our Redux store
  const PRELOADED_STATE = store.getState()

  return {
    pageContext: {
      PRELOADED_STATE,
      apolloIntialState,
      pageHtml
    }
  }
}

export { passToClient, render, onBeforeRender }
