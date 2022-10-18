import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

function App() {

   const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('profile')))
   
   const { user: auth } = useSelector(store => store.auth)

   useEffect(() => {
      setUser(JSON.parse(window.localStorage.getItem('profile')))
   }, [auth])
   
   return (
      <BrowserRouter>
         <Navbar />
         <main className={styles.main}>
         <Routes>
            <Route path='/' element={<Navigate to='/about'/>}/>
            <Route path='/about' element={<About />}/>
            <Route path='/events' element={<Navigate to='/events/upcoming'/>}/>
            <Route path='/events/upcoming' element={<UpcomingEvents />}/>
            <Route path='/events/all' element={<AllEvents />}/>
            <Route path='/events/yours' element={user?.user ? <YourEvents /> : <Navigate to='/login'/>}/>
            <Route path='/events/archival' element={user?.user ? <ArchivalEvents /> : <Navigate to='/login'/>}/>
            <Route path='/events/search' element={<SearchEvents />}/>
            <Route path='/events/add-event' element={user?.user ? <AddEvent /> : <Navigate to='/login'/>}/>
            <Route path='events/:id/eventDetails' element={<EventDetails />}/>
            <Route path='events/:id/join' element={user?.user ? <JoinEvent /> : <Navigate to='/login'/>}/>
            <Route path='/login' element={!user?.user ? <Login /> : <Navigate to='/'/>}/>
            <Route path='/signup' element={!user?.user ? <Signup /> : <Navigate to='/'/>}/>
            <Route path='*' element={<PageNotFound />}/>
         </Routes>
         </main>
      </BrowserRouter>
   )
}

export default App