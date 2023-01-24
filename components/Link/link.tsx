import { ReactNode } from "react";
import { clsx } from "clsx";

import { usePageContext } from "../../renderer/usePageContext";

const Link = ({
  children,
  className,
  href,
  ...props
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) => {
  const pageContext = usePageContext() as { urlPathname: string };
  const { urlPathname } = pageContext;
  const isActive: boolean =
    href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  return (
    <a
      href={href}
      className={clsx(className, {
        "is-active": isActive,
      })}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
