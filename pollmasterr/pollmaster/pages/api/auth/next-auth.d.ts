import { Session } from "inspector";
import { User } from "next-auth";
import { auth } from "twitter-api-sdk";

declare module "next-auth/jwt" {
  interface JWT {
    refresh_token: string;
    access_token_expires: number;
    access_token: string;
    account_id: string;
    user: User;
    error: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
  };
  expires: ISODateString;
  error?: string;
  }
}
