import { createContext, useContext, ReactNode } from "react";
import type { PageContext } from "../types/page.type";

const Context = createContext<PageContext>(undefined as any);

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ReactNode;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  const pageContext = useContext(Context);
  return pageContext;
}

export { PageContextProvider };
export { usePageContext };
