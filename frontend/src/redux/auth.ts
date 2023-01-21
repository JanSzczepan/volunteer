import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import * as api from '../api/index'
import { UserProfile } from '../App'
import { LoginFormData } from '../pages/Login/Login'
import { SignupFormData } from '../pages/Signup/Signup'

type InitialState = {
   user: UserProfile
   isLoading: boolean
   error: any
}

const initialState: InitialState = {
   user: {},
   isLoading: false,
   error: null,
}

export type LoginDataObj = {
   formData: LoginFormData
   navigate: (to: string) => void
}

export type SignupDataObj = {
   formData: SignupFormData
   navigate: (to: string) => void
}

export const logIn = createAsyncThunk('auth/logIn', async (dataObj: LoginDataObj, thunkAPI) => {
   try {
      const { data } = await api.login(dataObj.formData)

      dataObj.navigate('/volunteer/events')
      return data as UserProfile
   } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const signUp = createAsyncThunk('auth/signUp', async (dataObj: SignupDataObj, thunkAPI) => {
   try {
      const { data } = await api.signup(dataObj.formData)

      dataObj.navigate('/volunteer/events')
      return data as UserProfile
   } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data)
   }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state) => {
         window.localStorage.clear()

         state.user = {}
      },
      keepTrack: (state) => {
         const jsonValue = window.localStorage.getItem('profile')
         let value: UserProfile

         if (jsonValue) {
            value = JSON.parse(jsonValue)
         } else {
            value = {}
         }

         state.user = value
      },
   },
   extraReducers: (builder) => {
      builder.addCase(logIn.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(logIn.fulfilled, (state, action: PayloadAction<UserProfile>) => {
         window.localStorage.setItem('profile', JSON.stringify(action.payload))

         state.user = action.payload
         state.isLoading = false
      })
      builder.addCase(logIn.rejected, (state, action: PayloadAction<any>) => {
         console.log(action)
         state.error = action.payload.err
         state.isLoading = false
      })
      builder.addCase(signUp.pending, (state) => {
         state.isLoading = true
         state.error = null
      })
      builder.addCase(signUp.fulfilled, (state, action: PayloadAction<UserProfile>) => {
         window.localStorage.setItem('profile', JSON.stringify(action.payload))

         state.user = action.payload
         state.isLoading = false
      })
      builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
         console.log(action)
         state.error = action.payload.err
         state.isLoading = false
      })
   },
})

export const { logOut, keepTrack } = authSlice.actions
export default authSlice.reducer
