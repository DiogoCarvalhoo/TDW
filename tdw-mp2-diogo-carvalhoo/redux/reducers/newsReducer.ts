import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API_KEY = "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc";
const NEWS_API_HOST = "newscatcher.p.rapidapi.com";
const NEWS_API_BASE_URL = "https://newscatcher.p.rapidapi.com/v1";

export const newsAPI = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: NEWS_API_BASE_URL,
    prepareHeaders(headers) {
      headers.set("X-RapidAPI-Key", NEWS_API_KEY);
      headers.set("X-RapidAPI-Host", NEWS_API_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNews: builder.query<any, number>({
      query: (page: number) => {
        return `/search?q=NBA&page=${page}`;
      },
    }),
  }),
});

export const { useGetNewsQuery } = newsAPI;
