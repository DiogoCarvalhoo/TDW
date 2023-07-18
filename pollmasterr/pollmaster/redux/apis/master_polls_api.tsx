import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TWITTER_API_BASE_URL = "https://api.twitter.com/2/users";

export const userTweetsApi = createApi({
  reducerPath: "userTweetsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TWITTER_API_BASE_URL,
    prepareHeaders(headers) {
      headers.set("content-type", "application/json");
      headers.set(
        "Authorization",
        "Bearer AAAAAAAAAAAAAAAAAAAAAC44lAEAAAAASyImn8TyZNNTx8yk8lMxSYyv6J8%3D51pNo3D8QCOpHLTZF8sm9NSfJD2RQgcYt1FXHpeg3tKQpGRZkL"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserTweets: builder.query<any, number>({
      query: (userId: number) => {
        return `/${userId}/tweets`;
      },
    }),
  }),
});

export const { useGetUserTweetsQuery } = userTweetsApi;
