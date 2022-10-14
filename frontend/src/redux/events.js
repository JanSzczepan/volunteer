import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../api/index'

const initialState = {
   event: null,
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

export const getEvent = createAsyncThunk(
   'events/getEvent',
   async (id, thunkAPI) => {
      try {
         const { data } = await api.fetchEvent(id)
         console.log(`The event (${id}) fetched:`, data)

         return data
      } catch (error) {
         return thunkAPI.rejectWithValue(error)
      }
   }
)

export const joinEvent = createAsyncThunk(
   'events/joinEvent',
   async (dataObj, thunkAPI) => {
      try {
         const { id, formData, navigate } = dataObj

         const { data } = await api.joinEvent(id, formData)
         
         if (formData.motivation)
            console.log('Event joined:', data)
         else 
            console.log('Event resigned:', data)
         
         navigate(`/events/${id}/eventDetails`)

         return data
      } catch (error) {
         throw thunkAPI.rejectWithValue(error.response.data)
      }
   }
)

export const createEvent = createAsyncThunk(
   'events/createEvent',
   async (dataObj, thunkAPI) => {
      try {
         const { data } = await api.createEvent(dataObj.formData)
         console.log(`Event created:`, data)
         
         dataObj.navigate(`/events/${data.data._id}/eventDetails`)

         return data
      } catch (error) {
         throw thunkAPI.rejectWithValue(error.response.data)
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
      [getEvent.pending]: (state) => {
         state.isLoading = true
      },
      [getEvent.fulfilled]: (state, action) => {
         state.event = action.payload.data
         state.isLoading = false
      },
      [getEvent.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
      },
      [joinEvent.pending]: (state) => {
         state.error = null
         state.isLoading = true
      },
      [joinEvent.fulfilled]: (state, action) => {
         state.events = state.events.map(event => event._id === action.payload._id ? action.payload : event)
         state.isLoading = false
      },
      [joinEvent.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      },
      [createEvent.pending]: (state) => {
         state.error = null
         state.isLoading = true
      },
      [createEvent.fulfilled]: (state, action) => {
         state.events = [...state.events, action.payload.data]
         state.isLoading = false
      },
      [createEvent.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      },
   }
})

export default eventsSlice.reducer