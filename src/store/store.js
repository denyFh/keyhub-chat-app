import { configureStore } from "@reduxjs/toolkit";

/** Reducer */
import rootReducer from './reducers'

export default configureStore({
  reducer: {
    darkMode: rootReducer,
  }
})