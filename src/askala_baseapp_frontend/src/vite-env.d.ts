/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DFX_NETWORK: string
  readonly CANISTER_ID_BACKEND: string
  readonly CANISTER_ID_FRONTEND: string
  // Add other environment variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module '*.md' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare global {
  interface Window {
    Buffer: typeof Buffer
  }
}
