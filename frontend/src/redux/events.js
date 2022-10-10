import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../api/index'

const initialState = {
   events: [],
   isLoading: true
}

export const getUpcomingEvents = createAsyncThunk(
   'events/getUpcomingEvents',
   async (thunkAPI) => {
      try {
         const { data } = await api.fetchUpcomingEvents()
         console.log('Events fetched:', data)

         return data
      } catch (error) {
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const eventsSlice = createSlice({
   name: 'events',
   initialState,
   reducers: {},
   extraReducers: {
      [getUpcomingEvents.pending]: (state) => {
         state.isLoading = true
      },
      [getUpcomingEvents.fulfilled]: (state, action) => {
         state.events = action.payload.data
         state.isLoading = false
      },
      [getUpcomingEvents.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
      },
   }
})

export default eventsSlice.reducer