declare module NodeJS {
  interface ProcessEnv {
    VOTOGETHER_BASE_URL: string;
    VOTOGETHER_MOCKING_URL: string;
    VOTOGETHER_REST_API_KEY: string;
    VOTOGETHER_SERVER_REDIRECT_URL: string;
  }
}
