import { GoogleAuth } from "google-auth-library";

let accessToken: string | null = null;
let expiresAt = 0;

export async function getGoogleAccessToken(): Promise<string> {
  // Reuse token until it's close to expiring
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const rawPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!rawPrivateKey) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY is missing in environment variables.");
  }

  // OpenSSL requires actual newline characters instead of literal string '\\n'
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n").replace(/^"(.*)"$/, "$1");

  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const client = await auth.getClient();

  const tokenResponse = await client.getAccessToken();

  if (!tokenResponse.token) {
    throw new Error("Failed to obtain Google access token.");
  }

  accessToken = tokenResponse.token;

  // Access tokens are valid for ~1 hour.
  // Refresh 5 minutes early.
  expiresAt = Date.now() + 55 * 60 * 1000;

  return accessToken;
}