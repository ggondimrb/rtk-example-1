import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type CharacterType = {
  key?: number;
  id: number;
  name: string;
  gender: string;
  origin: { name: string; url: string; }
  location: { name: string; url: string; }
  image: string;
  episode: string[];
}

type PaginatedResponse = {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
  },
  results: CharacterType[]
}

type GetCharactersParams = {
  name: string;
  gender: string;
}

export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<CharacterType, number>({
      query: (id) => (
        {
          url: `character/${id}`,
          method: 'GET'
        }
      ),
    }),
    getCharacterByFilters: builder.query<PaginatedResponse, GetCharactersParams>({
      query: (params) => (
        {
          url: 'character',
          method: 'GET',
          params //{ name, gender }
        }
      ),
      transformResponse: (response: PaginatedResponse) => {
        response.results.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        })
        return response;
      }
    }),
  })
})

export const { useGetCharacterByIdQuery, useGetCharacterByFiltersQuery, } = rickAndMortyApi