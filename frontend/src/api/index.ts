import axios, { AxiosRequestConfig } from 'axios'
import { CreateEventFormData } from '../pages/AddEvent/AddEvent'
import { JoinEventFormData } from '../pages/JoinEvent/JoinEvent'
import { LoginFormData } from '../pages/Login/Login'
import { SignupFormData } from '../pages/Signup/Signup'

const devUrl = 'http://localhost:8080'
// const prodUrl = 'https://volunteer-production.up.railway.app/'

const API = axios.create({ baseURL: devUrl })

API.interceptors.request.use((req: AxiosRequestConfig) => {
   if (window.localStorage.getItem('profile')) req.headers!.authorization = `Bearer ${JSON.parse(window.localStorage.getItem('profile')!).token}`

   return req
})

export const fetchUpcomingEvents = () => API.get('/events/upcoming')
export const fetchAllEvents = () => API.get('/events/all')
export const fetchYourEvents = () => API.get('/events/yours')
export const fetchEventsBySearch = (search: string) => API.get(`/events/search?search=${search || 'none'}`)
export const fetchEvent = (id: string) => API.get(`/events/${id}`)
export const joinEvent = (id: string, formData: JoinEventFormData) => API.patch(`/events/${id}/join`, formData)
export const createEvent = (formData: CreateEventFormData) => API.post('/events', formData)

export const login = (formData: LoginFormData) => API.post('/user/login', formData)
export const signup = (formData: SignupFormData) => API.post('/user/signup', formData)
