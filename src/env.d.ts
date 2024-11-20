/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MISTRAL_API_KEY: string;
    // Add other environment variables here if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }