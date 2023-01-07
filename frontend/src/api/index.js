import axios from 'axios'

const devUrl = 'http://localhost:8080'
// const prodUrl = 'https://volunteer-production.up.railway.app/'

const API = axios.create({ baseURL: devUrl })

API.interceptors.request.use((req) => {
   if (window.localStorage.getItem('profile')) req.headers.authorization = `Bearer ${JSON.parse(window.localStorage.getItem('profile')).token}`

   return req
})

export const fetchUpcomingEvents = () => API.get('/events/upcoming')
export const fetchAllEvents = () => API.get('/events/all')
export const fetchYourEvents = () => API.get('/events/yours')
export const fetchEventsBySearch = (search) => API.get(`/events/search?search=${search || 'none'}`)
export const fetchEvent = (id) => API.get(`/events/${id}`)
export const joinEvent = (id, formData) => API.patch(`/events/${id}/join`, formData)
export const createEvent = (formData) => API.post('/events', formData)

export const login = (formData) => API.post('/user/login', formData)
export const signup = (formData) => API.post('/user/signup', formData)
