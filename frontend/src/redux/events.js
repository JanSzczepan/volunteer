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
         console.log('Upcoming Events fetched:', data)

         return data
      } catch (error) {
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const getAllEvents = createAsyncThunk(
   'events/getAllEvents',
   async (thunkAPI) => {
      try {
         const { data } = await api.fetchAllEvents()
         console.log('All Events fetched:', data)

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
      [getAllEvents.pending]: (state) => {
         state.isLoading = true
      },
      [getAllEvents.fulfilled]: (state, action) => {
         state.events = action.payload.data
         state.isLoading = false
      },
      [getAllEvents.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
      },
   }
})

export default eventsSlice.reducer