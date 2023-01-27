import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";

import { GET_CMS_PAGE } from "@graphql/queries/getCmsPage";

const Page = () => {
  const storeConfig = useSelector((state: any) => state.app.storeConfig);
  const identifier: string = storeConfig?.cms_home_page ?? "";

  const { data } = useQuery(GET_CMS_PAGE, {
    variables: {
      identifier,
    },
  });

  return (
    <div>
      <h1>Welcome SSR</h1>
      <p>{data?.cmsPage?.title ?? ""}</p>
      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </div>
  );
};

export { Page };
