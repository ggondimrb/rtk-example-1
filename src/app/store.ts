import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { pokemonApi } from '../api/api'
import { rickAndMortyApi } from '../api/rickMortyApi'
import { serverApi } from '../api/serverApi'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    [serverApi.reducerPath]: serverApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware).concat(rickAndMortyApi.middleware).concat(serverApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch