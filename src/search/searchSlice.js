import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchGoods } from '../api/fetchGoods.js'
import {
  getBrandChoices,
  getCachedOffers,
  getOffersCacheKey,
  getWarehouseOffers,
} from './searchData.js'

export const searchBrands = createAsyncThunk(
  'search/brands',
  async (article) => {
    const goods = await fetchGoods({ number: article })
    return getBrandChoices(goods)
  },
)

export const searchOffers = createAsyncThunk(
  'search/offers',
  async ({ article, brand }, { getState }) => {
    const cachedOffers = getCachedOffers(getState().search.offersCache, article, brand)

    if (cachedOffers) {
      return cachedOffers
    }

    const goods = await fetchGoods({
      number: article,
      brand,
      analogues: true,
    })
    return getWarehouseOffers(goods)
  },
)

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    article: '',
    brands: [],
    brandsStatus: 'idle',
    brandsError: '',
    selectedBrand: '',
    offers: [],
    offersStatus: 'idle',
    offersError: '',
    offersCache: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBrands.pending, (state, action) => {
        state.article = action.meta.arg
        state.brands = []
        state.brandsStatus = 'loading'
        state.brandsError = ''
        state.selectedBrand = ''
        state.offers = []
        state.offersStatus = 'idle'
        state.offersError = ''
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        state.brands = action.payload
        state.brandsStatus = 'success'
      })
      .addCase(searchBrands.rejected, (state, action) => {
        state.brandsStatus = 'error'
        state.brandsError = action.error.message || 'Не удалось найти производителей'
      })
      .addCase(searchOffers.pending, (state, action) => {
        const { article, brand } = action.meta.arg
        const cachedOffers = getCachedOffers(state.offersCache, article, brand)

        state.selectedBrand = brand
        state.offersError = ''

        if (cachedOffers) {
          state.offers = cachedOffers
          state.offersStatus = 'success'
          return
        }

        state.offers = []
        state.offersStatus = 'loading'
      })
      .addCase(searchOffers.fulfilled, (state, action) => {
        const { article, brand } = action.meta.arg

        state.offers = action.payload
        state.offersStatus = 'success'
        state.offersCache[getOffersCacheKey(article, brand)] = action.payload
      })
      .addCase(searchOffers.rejected, (state, action) => {
        state.offersStatus = 'error'
        state.offersError = action.error.message || 'Не удалось загрузить предложения'
      })
  },
})

export const searchReducer = searchSlice.reducer
