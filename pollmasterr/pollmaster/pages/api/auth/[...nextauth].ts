import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import TwitterProvider from "next-auth/providers/twitter";
import { Session } from "next-auth";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {

  try {
    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + token.access_token
      },
      method: "POST",
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'client_id': 'MjFISFdQN0pKZHVIemNHa29BRzY6MTpjaQ',
        'refresh_token': token.refresh_token
      })
    })
    console.log(token.refresh_token);
    console.log(token.access_token);
    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }
    token.access_token = refreshedTokens.access_token;
    token.refresh_token = refreshedTokens.refresh_token;
    token.access_token_expires = Date.now() + refreshedTokens.expires_in * 1000;
    return {
      ...token
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID
        ? process.env.TWITTER_CLIENT_ID
        : "",
      clientSecret: process.env.TWITTER_CLIENT_SECRET
        ? process.env.TWITTER_CLIENT_SECRET
        : "",
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "users.read tweet.read follows.read offline.access follows.write like.write tweet.write",
        },
      }

    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
      if (account && user && account.expires_at && account.access_token && account.refresh_token) {
        console.log("New token: ", account);
        token = {
          access_token: account.access_token,
          access_token_expires: account.expires_at * 1000,
          refresh_token: account.refresh_token,
          account_id: account.providerAccountId,
          user: user,
          error: ""
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.access_token_expires) {
        return token
      }
      console.log("Token will be refreshed.");
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = token.user;
      session.error = token.error;

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET : "",
});
