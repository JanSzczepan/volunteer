import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import About from './pages/About/About'
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents'
import AllEvents from './pages/AllEvents/AllEvents'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AddEvent from './pages/AddEvent/AddEvent'
import JoinEvent from './pages/JoinEvent/JoinEvent'
import EventDetails from './pages/EventDetails/EventDetails'
import YourEvents from './pages/YourEvents/YourEvents'
import ArchivalEvents from './pages/ArchivalEvents/ArchivalEvents'
import SearchEvents from './pages/SearchEvents/SearchEvents'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import styles from './App.module.scss'
import useLocalStorage from './hooks/useLocalStorage'
import { useAppSelector } from './hooks/useTypedSelector'
import { useEffect } from 'react'
import getUserProfile from './functions/getUserProfile'

export type User = {
   _id: string
   name: string
   email: string
   password: string
}

export type UserProfile = Partial<{
   token: string
   user: User
}>

function App() {
   const [user, setUser] = useLocalStorage<UserProfile>('profile', {})
   const { user: auth } = useAppSelector((store) => store.auth)

   useEffect(() => {
      setUser(getUserProfile())
   }, [auth, setUser])

   return (
      <BrowserRouter>
         <Navbar />
         <main className={styles.main}>
            <Routes>
               <Route
                  path='/'
                  element={<Navigate to='/volunteer/about' />}
               />
               <Route
                  path='/volunteer'
                  element={<Navigate to='/volunteer/about' />}
               />
               <Route
                  path='/volunteer/about'
                  element={<About />}
               />
               <Route
                  path='/volunteer/events'
                  element={<Navigate to='/volunteer/events/upcoming' />}
               />
               <Route
                  path='/volunteer/events/upcoming'
                  element={<UpcomingEvents />}
               />
               <Route
                  path='/volunteer/events/all'
                  element={<AllEvents />}
               />
               <Route
                  path='/volunteer/events/yours'
                  element={user?.user ? <YourEvents /> : <Navigate to='/volunteer/login' />}
               />
               <Route
                  path='/volunteer/events/archival'
                  element={user?.user ? <ArchivalEvents /> : <Navigate to='/volunteer/login' />}
               />
               <Route
                  path='/volunteer/events/search'
                  element={<SearchEvents />}
               />
               <Route
                  path='/volunteer/events/add-event'
                  element={user?.user ? <AddEvent /> : <Navigate to='/volunteer/login' />}
               />
               <Route
                  path='/volunteer/events/:id/eventDetails'
                  element={<EventDetails />}
               />
               <Route
                  path='/volunteer/events/:id/join'
                  element={user?.user ? <JoinEvent /> : <Navigate to='/volunteer/login' />}
               />
               <Route
                  path='/volunteer/login'
                  element={!user?.user ? <Login /> : <Navigate to='/volunteer' />}
               />
               <Route
                  path='/volunteer/signup'
                  element={!user?.user ? <Signup /> : <Navigate to='/volunteer' />}
               />
               <Route
                  path='*'
                  element={<PageNotFound />}
               />
            </Routes>
         </main>
      </BrowserRouter>
   )
}

export default App
