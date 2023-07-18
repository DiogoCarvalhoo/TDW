import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TEAMS_API_KEY = "ce2a9741fbmshc7f82170a3ebc45p133e91jsn43e9d15777bc";
const TEAMS_API_HOST = "api-nba-v1.p.rapidapi.com";
const TEAMS_API_BASE_URL = "https://api-nba-v1.p.rapidapi.com";

export const teamsAPI = createApi({
  reducerPath: "teamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TEAMS_API_BASE_URL,
    prepareHeaders(headers) {
      headers.set("X-RapidAPI-Key", TEAMS_API_KEY);
      headers.set("X-RapidAPI-Host", TEAMS_API_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTeams: builder.query<any, void>({
      query: () => `/teams`,
    }),
    getTeamsByConference: builder.query<any, string>({
      query: (conference: string) => `/teams/confName/${conference}`,
    }),
  }),
});

export const { useGetTeamsQuery, useGetTeamsByConferenceQuery } = teamsAPI;
