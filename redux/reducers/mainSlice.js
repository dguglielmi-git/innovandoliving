import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    value: 0
  },
  reducers: {
    test: state => {
      state.value = 1
    }
  }
})

export const { test } = mainSlice.actions

export default mainSlice.reducer
