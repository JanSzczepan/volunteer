import { createAsyncThunk, createSlice  } from '@reduxjs/toolkit'

import * as api from '../api/index'

const initialState = {
   user: null,
   isLoading: false,
   error: null
}

export const logIn = createAsyncThunk(
   'auth/logIn',
   async (dataObj, thunkAPI) => {
      try {
         const { data } = await api.login(dataObj.formData)

         dataObj.navigate('/events')
         return data
      } catch (error) {
         throw thunkAPI.rejectWithValue(error.response.data)
      }
   }
)

export const signUp = createAsyncThunk(
   'auth/signUp',
   async (dataObj, thunkAPI) => {
      try {
         const { data } = await api.signup(dataObj.formData)

         dataObj.navigate('/events')
         return data
      } catch (error) {
         throw thunkAPI.rejectWithValue(error.response.data)
      }
   }
)

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logOut: (state) => {
         window.localStorage.clear()

         state.user = null
      }
   },
   extraReducers: {
      [logIn.pending]: (state) => {
         state.isLoading = true
         state.error = null
      },
      [logIn.fulfilled]: (state, action) => {
         window.localStorage.setItem('profile', JSON.stringify(action.payload))

         state.auth = action.paylaod
         state.isLoading = false
      },
      [logIn.rejected]: (state, action) => {
         console.log(action)
         state.error = action.payload.err
         state.isLoading = false
      },
      [signUp.pending]: (state) => {
         state.isLoading = true
         state.error = null
      },
      [signUp.fulfilled]: (state, action) => {
         window.localStorage.setItem('profile', JSON.stringify(action.payload))

         state.auth = action.paylaod
         state.isLoading = false
      },
      [signUp.rejected]: (state, action) => {
         console.log(action)
         state.error = action.payload.err
         state.isLoading = false
      }
   }
})

export const { logOut } = authSlice.actions
export default authSlice.reducer