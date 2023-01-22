import { createRoot, hydrateRoot, Root } from "react-dom/client";
import { Provider } from "react-redux";

import { createStore } from "../store/create";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "../types/page.type";

// To enable Client-side Routing:
const clientRouting = true;

const hydrationCanBeAborted = true;

let root: Root;

const render = async (pageContext: PageContextClient) => {
  const { Page, pageProps } = pageContext;
  // We initilaize the store on every render because we use Server Routing. If we use Client Routing, then we should initialize the store only once instead.
  // (See https://vite-plugin-ssr.com/server-routing-vs-client-routing for more information about Client Routing and Server Routing.)
  const store = createStore(pageContext.PRELOADED_STATE);
  const page = (
    <Provider store={store}>
      <PageShell pageContext={pageContext}>
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
