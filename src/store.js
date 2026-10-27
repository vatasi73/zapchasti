import { configureStore } from '@reduxjs/toolkit'
import { searchReducer } from './search/searchSlice.js'

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
})
