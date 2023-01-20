import { configureStore } from '@reduxjs/toolkit'

import eventsReducer from './events'
import authReducer from './auth'

const store = configureStore({
   reducer: {
      events: eventsReducer,
      auth: authReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
