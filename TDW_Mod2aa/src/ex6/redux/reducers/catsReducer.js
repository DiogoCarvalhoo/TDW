import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CATS_API_KEY = "4d77d867-e37e-4f9d-a28d-72c17995f5f8";

export const catsAPI = createApi({
  reducerPath: "catApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.thecatapi.com/v1",
    // prepareHeaders(headers) {
    //   headers.set("x-api-key", CATS_API_KEY);
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getAllCats: builder.query({
      query: (fetchInfo = { limit: 20, page: 0 }) => {
        const { limit, page } = fetchInfo;
        return `/images/search?limit=${limit}&page=${page}&api_key=${CATS_API_KEY}`;
      },
    }),
  }),
});

export const { useGetAllCatsQuery } = catsAPI;
