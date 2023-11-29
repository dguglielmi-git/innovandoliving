import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../reducers/mainSlice'

export default configureStore({
  reducer: {
    main: mainReducer
  }
})
