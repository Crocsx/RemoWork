declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
      NEXT_PUBLIC_GOOGLE_MAP_API: string;
      NEXT_FIREBASE_ADMIN_PRIVATE_CLIENT_EMAIL: string;
      NEXT_FIREBASE_ADMIN_PRIVATE_KEY: string;
      NEXT_PUBLIC_API_ENDPOINT: string;
      NEXT_CSFR_TOKEN: string;
      SENTRY_AUTH_TOKEN: string;
      NEXT_GOOGLE_MAIL_ADDRESS: string;
      NEXT_GOOGLE_MAIL_PASSWORD: string;
    }
  }
}
export {};
