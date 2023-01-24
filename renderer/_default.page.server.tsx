import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";

import { createStore } from "@store/create";
import PageShell from "@components/PageShell";
import { PageContextServer } from "@types/pageType";
import { asyncActions as appAsyncActions } from "@store/app";

// See https://vite-plugin-ssr.com/data-fetching
const passToClient = ["PRELOADED_STATE", "documentProps", "pageProps"];

const render = async (pageContext: PageContextServer) => {
  const { Page, pageProps } = pageContext;

  const pageHtml = renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

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
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  };
};

const onBeforeRender = async (pageContext: PageContextServer) => {
  const { Page } = pageContext;

  const store: any = createStore();
  const { dispatch } = store;
  await dispatch(appAsyncActions.fetchStoreConfig());

  const pageHtml = renderToString(
    <Provider store={store}>
      <Page />
    </Provider>
  );

  // Grab the initial state from our Redux store
  const PRELOADED_STATE = store.getState();

  return {
    pageContext: {
      PRELOADED_STATE,
      pageHtml,
    },
  };
};

export { passToClient, render, onBeforeRender };
