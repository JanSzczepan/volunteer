import { configureStore } from '@reduxjs/toolkit'

import eventsReducer from './events'

export default configureStore({
   reducer: {
      events: eventsReducer
   }
})