import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as api from '../api/index'
import { CreateEventFormData } from '../pages/AddEvent/AddEvent'

export type Event = Partial<{
   address: string
   anonymous: boolean
   banned: string[]
   cathegory: string
   city: string
   comments: Object[]
   createdAt: string
   creator: string
   date: string
   description: string
   motivations: string[]
   participants: string[]
   participantsNames: string[]
   resignations: string[]
   selectedFile: string
   title: string
   updatedAt: string
   _id: string
}>

type UpcominEvents = {
   todayEvents: Event[]
   tomorrowEvents: Event[]
}

type YourEvents = {
   authorEvents: Event[]
   participantEvents: Event[]
   authorArchivalEvents: Event[]
   participantArchivalEvents: Event[]
}

type InitialState = {
   event: Event
   todayEvents: Event[]
   tomorrowEvents: Event[]
   allEvents: Event[]
   authorEvents: Event[]
   participantEvents: Event[]
   authorArchivalEvents: Event[]
   participantArchivalEvents: Event[]
   eventsBySearch: Event[]
   isLoading: boolean
   error: any
}

type JoinEventData = {
   id: string
   formData: Object
   setIsLoading: (isLoading: boolean) => void
   navigate: (to: string) => void
}

type CreateEventData = {
   formData: CreateEventFormData
   navigate: (to: string) => void
}

const initialState: InitialState = {
   event: {},
   todayEvents: [],
   tomorrowEvents: [],
   allEvents: [],
   authorEvents: [],
   participantEvents: [],
   authorArchivalEvents: [],
   participantArchivalEvents: [],
   eventsBySearch: [],
   isLoading: true,
   error: null,
}

export const getUpcomingEvents = createAsyncThunk('events/getUpcomingEvents', async (_, thunkAPI) => {
   try {
      const { data } = await api.fetchUpcomingEvents()

      return data as { data: UpcominEvents }
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getAllEvents = createAsyncThunk('events/getAllEvents', async (_, thunkAPI) => {
   try {
      const { data } = await api.fetchAllEvents()

      return data as { data: Event[] }
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getYourEvents = createAsyncThunk('events/getYourEvents', async (_, thunkAPI) => {
   try {
      const { data } = await api.fetchYourEvents()

      return data as { data: YourEvents }
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getEventsBySearch = createAsyncThunk('events/getEventsBySearch', async (search: string, thunkAPI) => {
   try {
      const { data } = await api.fetchEventsBySearch(search)

      return data as { data: Event[] }
   } catch (error) {
      return thunkAPI.rejectWithValue(error)
   }
})

export const getEvent = createAsyncThunk('events/getEvent', async (id, thunkAPI) => {
   try {
      const { data } = await api.fetchEvent(id)

      return data as { data: Event }
   } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const joinEvent = createAsyncThunk('events/joinEvent', async (dataObj: JoinEventData, thunkAPI) => {
   const { id, formData, navigate, setIsLoading } = dataObj

   try {
      const { data } = await api.joinEvent(id, formData)

      setIsLoading(false)
      navigate(`/volunteer/events/${id}/eventDetails`)

      return data as { _id: string }
   } catch (error: any) {
      setIsLoading(false)
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const createEvent = createAsyncThunk('events/createEvent', async (dataObj: CreateEventData, thunkAPI) => {
   try {
      const { data } = await api.createEvent(dataObj.formData)

      dataObj.navigate(`/volunteer/events/${data.data._id}/eventDetails`)

      return data as { data: Event }
   } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const eventsSlice = createSlice({
   name: 'events',
   initialState,
   reducers: {
      cleanEvents: (state) => {
         state.event = {}
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
   extraReducers: (builder) => {
      builder.addCase(getUpcomingEvents.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getUpcomingEvents.fulfilled, (state, action: PayloadAction<{ data: UpcominEvents }>) => {
         state.todayEvents = action.payload.data.todayEvents
         state.tomorrowEvents = action.payload.data.tomorrowEvents
         state.isLoading = false
      })
      builder.addCase(getUpcomingEvents.rejected, (state, action) => {
         console.log(action)
         state.isLoading = false
      })
      builder.addCase(getAllEvents.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getAllEvents.fulfilled, (state, action: PayloadAction<{ data: Event[] }>) => {
         state.allEvents = action.payload.data
         state.isLoading = false
      })
      builder.addCase(getAllEvents.rejected, (state, action) => {
         console.log(action)
         state.isLoading = false
      })
      builder.addCase(getYourEvents.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getYourEvents.fulfilled, (state, action: PayloadAction<{ data: YourEvents }>) => {
         state.authorEvents = action.payload.data.authorEvents
         state.participantEvents = action.payload.data.participantEvents
         state.authorArchivalEvents = action.payload.data.authorArchivalEvents
         state.participantArchivalEvents = action.payload.data.participantArchivalEvents
         state.isLoading = false
      })
      builder.addCase(getYourEvents.rejected, (state, action) => {
         console.log(action)
         state.isLoading = false
      })
      builder.addCase(getEventsBySearch.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getEventsBySearch.fulfilled, (state, action: PayloadAction<{ data: Event[] }>) => {
         state.eventsBySearch = action.payload.data
         state.isLoading = false
      })
      builder.addCase(getEventsBySearch.rejected, (state, action) => {
         console.log(action)
         state.isLoading = false
      })
      builder.addCase(getEvent.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getEvent.fulfilled, (state, action: PayloadAction<{ data: Event }>) => {
         state.event = action.payload.data
         state.isLoading = false
      })
      builder.addCase(getEvent.rejected, (state, action: PayloadAction<any>) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      })
      builder.addCase(joinEvent.pending, (state) => {
         state.error = null
         state.isLoading = true
      })
      builder.addCase(joinEvent.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
         state.allEvents = state.allEvents.map((event) => (event._id === action.payload._id ? action.payload : event))
         state.isLoading = false
      })
      builder.addCase(joinEvent.rejected, (state, action: PayloadAction<any>) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      })
      builder.addCase(createEvent.pending, (state) => {
         state.error = null
         state.isLoading = true
      })
      builder.addCase(createEvent.fulfilled, (state, action: PayloadAction<{ data: Event }>) => {
         state.allEvents = [...state.allEvents, action.payload.data]
         state.isLoading = false
      })
      builder.addCase(createEvent.rejected, (state, action: PayloadAction<any>) => {
         console.log(action)
         state.isLoading = false
         state.error = action.payload.error
      })
   },
})

export const { cleanEvents, cleanError } = eventsSlice.actions
export default eventsSlice.reducer
