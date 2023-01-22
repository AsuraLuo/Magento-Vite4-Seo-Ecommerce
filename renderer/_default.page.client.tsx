import { hydrateRoot } from "react-dom/client";

import { PageShell } from "./PageShell";
import type { PageContextClient } from "../types/page.type";

async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  hydrateRoot(
    document.getElementById("page-view")!,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}

// To enable Client-side Routing:
export const clientRouting = true;
export { render };
