interface ImportMetaEnv {
  readonly REACT_APP_HOST_URL: string;
  readonly REACT_APP_API_URL: string;
  readonly REACT_CONTENTFUL_SPACE_ID: string;
  readonly REACT_CONTENTFUL_ENVIRONMENT: string;
  readonly REACT_CONTENTFUL_ACCESS_TOKEN: string;
  readonly REACT_CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
  readonly REACT_CONTENTFUL_PREVIEW_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
