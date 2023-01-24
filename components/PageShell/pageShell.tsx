import { ReactNode, StrictMode } from "react";

import { PageContextProvider } from "../../renderer/usePageContext";
import { PageContext } from "@types/pageType";
import Link from "@components/Link";

const PageShell = ({
  children,
  pageContext,
}: {
  children: ReactNode;
  pageContext: PageContext;
}) => {
  return (
    <StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Link className="navitem" href="/">
          Home
        </Link>
        <br />
        <Link className="navitem" href="/about">
          About
        </Link>
        {children}
      </PageContextProvider>
    </StrictMode>
  );
};

export default PageShell;
