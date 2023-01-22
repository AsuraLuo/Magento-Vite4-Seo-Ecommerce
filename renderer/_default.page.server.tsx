import { renderToString } from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vite-plugin-ssr";

import { PageShell } from "./PageShell";
import type { PageContextServer } from "../types/page.type";

async function render(pageContext: PageContextServer) {
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
}

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps"];
