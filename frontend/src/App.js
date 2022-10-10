import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import About from './pages/About/About'
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents'
import AllEvents from './pages/AllEvents/AllEvents'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import AddEvent from './pages/AddEvent/AddEvent'
import styles from './App.module.scss'

function App() {
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
            <Route path='/events/add-event' element={<AddEvent />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
         </Routes>
         </main>
      </BrowserRouter>
   )
}

export default App