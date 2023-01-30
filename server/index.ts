import * as dotenv from "dotenv";
import express from "express";
import compression from "compression";
import fetch from "node-fetch";
import Apollo from "@apollo/client";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { renderPage } from "vite-plugin-ssr";
import { createProxyMiddleware } from "http-proxy-middleware";

const { ApolloClient, InMemoryCache, createHttpLink } = Apollo;
const __dirname: string = dirname(fileURLToPath(import.meta.url));
const root: string = `${__dirname}/..`;
const nodeFetch: any = fetch;
const isProduction: boolean = process.env.NODE_ENV === "production";

dotenv.config();

const createApolloClient = () => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.REACT_APP_HOST_URL}api/graphql`,
      fetch: nodeFetch,
    }),
    cache: new InMemoryCache(),
  });
  return apolloClient;
};

const startServer = async () => {
  const app = express();

  app.use(compression());

  app.use(
    "/api/graphql",
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: {
        "^/api/graphql": "/graphql",
      },
      router: async () => {
        return process.env.REACT_APP_API_URL;
      },
    })
  );

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`));
  } else {
    const vite = await import("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    // It's important to create an entirely new instance of Apollo Client for each request.
    // Otherwise, our response to a request might include sensitive cached query results
    // from a previous request. Source: https://www.apollographql.com/docs/react/performance/server-side-rendering/#example
    const apolloClient = createApolloClient();

    const pageContextInit = {
      urlOriginal: req.originalUrl,
      apolloClient,
    };
    const pageContext = await renderPage(pageContextInit);

    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 3000;
  app.listen(port);
  if (!isProduction) console.log(`Server running at http://localhost:${port}`);
};

startServer();
