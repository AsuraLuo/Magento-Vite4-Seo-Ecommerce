import { ReactNode, StrictMode } from "react";
import { ApolloProvider } from "@apollo/client";

import { PageContextProvider } from "../../renderer/usePageContext";
import { PageContext } from "../../types/pageType";

import Footer from "@components/Footer";
import Link from "@components/Link";

const PageShell = ({
  children,
  apolloClient,
  pageContext,
}: {
  children: ReactNode;
  apolloClient: any;
  pageContext: PageContext;
}) => {
  return (
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <PageContextProvider pageContext={pageContext}>
          <Link className="navitem" href="/">
            Home
          </Link>
          <br />
          <Link className="navitem" href="/about">
            About
          </Link>
          {children}
          <Footer />
        </PageContextProvider>
      </ApolloProvider>
    </StrictMode>
  );
};

export default PageShell;
