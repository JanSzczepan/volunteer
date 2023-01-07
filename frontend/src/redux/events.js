import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../api/index'

const initialState = {
   event: null,
   todayEvents: [],
   tomorrowEvents: [],
   allEvents: [],
   authorEvents: [],
   participantEvents: [],
   authorArchivalEvents: [],
   participantArchivalEvents: [],
   eventsBySearch: [],
   isLoading: true,
}

export const getUpcomingEvents = createAsyncThunk('events/getUpcomingEvents', async (thunkAPI) => {
   try {
      const { data } = await api.fetchUpcomingEvents()

      return data
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getAllEvents = createAsyncThunk('events/getAllEvents', async (thunkAPI) => {
   try {
      const { data } = await api.fetchAllEvents()

      return data
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getYourEvents = createAsyncThunk('events/getYourEvents', async (thunkAPI) => {
   try {
      const { data } = await api.fetchYourEvents()

      return data
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getEventsBySearch = createAsyncThunk('events/getEventsBySearch', async (search, thunkAPI) => {
   try {
      const { data } = await api.fetchEventsBySearch(search)

      return data
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getEvent = createAsyncThunk('events/getEvent', async (id, thunkAPI) => {
   try {
      const { data } = await api.fetchEvent(id)

      return data
   } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const joinEvent = createAsyncThunk('events/joinEvent', async (dataObj, thunkAPI) => {
   try {
      const { id, formData, navigate } = dataObj

      const { data } = await api.joinEvent(id, formData)

      navigate(`/volunteer/events/${id}/eventDetails`)

      return data
   } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const createEvent = createAsyncThunk('events/createEvent', async (dataObj, thunkAPI) => {
   try {
      const { data } = await api.createEvent(dataObj.formData)

      dataObj.navigate(`/volunteer/events/${data.data._id}/eventDetails`)

      return data
   } catch (error) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const eventsSlice = createSlice({
   name: 'events',
   initialState,
   reducers: {
      cleanEvents: (state) => {
         state.event = null
         state.todayEvents = []
         state.tomorrowEvents = []
         state.allEvents = []
         state.authorEvents = []
         state.participantEvents = []
         state.authorArchivalEvents = []
         state.participantArchivalEvents = []
         state.eventsBySearch = []
      },
      cleanError: (state) => {
         state.error = null
      },
   },
   extraReducers: {
      [getUpcomingEvents.pending]: (state) => {
         state.isLoading = true
      },
      [getUpcomingEvents.fulfilled]: (state, action) => {
         state.todayEvents = action.payload.data.todayEvents
         state.tomorrowEvents = action.payload.data.tomorrowEvents
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
         state.allEvents = action.payload.data
         state.isLoading = false
      },
      [getAllEvents.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
      },
      [getYourEvents.pending]: (state) => {
         state.isLoading = true
      },
      [getYourEvents.fulfilled]: (state, action) => {
         state.authorEvents = action.payload.data.authorEvents
         state.participantEvents = action.payload.data.participantEvents
         state.authorArchivalEvents = action.payload.data.authorArchivalEvents
         state.participantArchivalEvents = action.payload.data.participantArchivalEvents
         state.isLoading = false
      },
      [getYourEvents.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
      },
      [getEventsBySearch.pending]: (state) => {
         state.isLoading = true
      },
      [getEventsBySearch.fulfilled]: (state, action) => {
         state.eventsBySearch = action.payload.data
         state.isLoading = false
      },
      [getEventsBySearch.rejected]: (state, action) => {
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
         state.error = action.payload.error
      },
      [joinEvent.pending]: (state) => {
         state.error = null
         state.isLoading = true
      },
      [joinEvent.fulfilled]: (state, action) => {
         state.allEvents = state.allEvents.map((event) => (event._id === action.payload._id ? action.payload : event))
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
         state.allEvents = [...state.allEvents, action.payload.data]
         state.isLoading = false
      },
      [createEvent.rejected]: (state, action) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      },
   },
})

export const { cleanEvents, cleanError } = eventsSlice.actions
export default eventsSlice.reducer
