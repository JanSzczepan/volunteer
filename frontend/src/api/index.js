import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })
 
export const fetchUpcomingEvents = () => API.get('/events/upcoming')
export const fetchAllEvents = () => API.get('/events/all')

export const login = (formData) => API.post('/user/login', formData)
export const signup = (formData) => API.post('/user/signup', formData)