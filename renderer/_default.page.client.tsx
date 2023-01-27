import { createRoot, hydrateRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { createStore } from "@store/create";
import PageShell from "@components/PageShell";
import type { PageContextClient } from "../types/pageType";

// To enable Client-side Routing:
const clientRouting = true;

const hydrationCanBeAborted = true;

let root: Root;

const createApolloClient = (apolloIntialState: any) => {
  return new ApolloClient({
    link: createHttpLink({
      // uri: "http://82.157.172.168/graphql",
      uri: "http://localhost:3000/api/graphql",
    }),
    cache: new InMemoryCache().restore(apolloIntialState),
  });
};

const render = async (pageContext: PageContextClient) => {
  const { Page, apolloIntialState, pageProps, PRELOADED_STATE } = pageContext;
  const apolloClient = createApolloClient(apolloIntialState);
  // We initilaize the store on every render because we use Server Routing. If we use Client Routing, then we should initialize the store only once instead.
  // (See https://vite-plugin-ssr.com/server-routing-vs-client-routing for more information about Client Routing and Server Routing.)
  const store = createStore(PRELOADED_STATE);
  const page = (
    <Provider store={store}>
      <PageShell apolloClient={apolloClient} pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </Provider>
  );

  const container = document.getElementById("page-view")!;

  if (pageContext.isHydration) {
    root = hydrateRoot(container, page);
  } else {
    if (!root) {
      root = createRoot(container);
    }
    root.render(page);
  }
};

export { clientRouting, hydrationCanBeAborted, render };
