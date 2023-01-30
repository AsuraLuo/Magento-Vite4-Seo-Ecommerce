import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchStoreConfig = createAsyncThunk(
  'app/fetchStoreConfig',
  async ({ apolloClient, query }: any) => {
    const { data } = await apolloClient.query({
      query
    })
    return data
  }
)
