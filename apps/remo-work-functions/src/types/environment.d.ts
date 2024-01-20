declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_FIREBASE_ADMIN_PRIVATE_CLIENT_EMAIL: string;
      NEXT_FIREBASE_ADMIN_PRIVATE_KEY: string;
    }
  }
}
export {};
