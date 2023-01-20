import { configureStore } from '@reduxjs/toolkit'

import eventsReducer from './events'
import authReducer from './auth'

export default configureStore({
   reducer: {
      events: eventsReducer,
      auth: authReducer,
   },
})
