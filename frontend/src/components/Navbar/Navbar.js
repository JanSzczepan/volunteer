import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BiMenuAltLeft } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import decode from 'jwt-decode'

import { keepTrack, logOut } from '../../redux/auth'
import { cleanEvents } from '../../redux/events'
import Sidebar from './Sidebar/Sidebar'
import styles from './Navbar.module.scss'

const Navbar = () => {

   const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('profile')))
   const [isOpen, setIsOpen] = useState(false)

   const dispatch = useDispatch()

   const navigate = useNavigate()
   const location = useLocation()

   const menuButtonElement = useRef()
   const ref = useRef()

   const logout = () => {
      setUser(null)
      dispatch(logOut())
      navigate('/login')
   }

   // useEffect(() => {
   //    window.addEventListener('click', (e) => handleWindowClick(e))
   // }, [])

   useEffect(() => {
      const token = user?.token

      if (token) {
         const decodedToken = decode(token)
       
         if(decodedToken.exp * 1000 < new Date().getTime())
            logout()
      }
      
      dispatch(keepTrack())

      setUser(JSON.parse(window.localStorage.getItem('profile')))
      setIsOpen(false)
      dispatch(cleanEvents())
   }, [location, dispatch])

   // const handleWindowClick = (e) => {

   //    const clickX = e.clientX
   //    const clickY = e.clientY

   //    const menuButtonLeft = menuButtonElement.current.getBoundingClientRect().left
   //    const menuButtonRight = menuButtonLeft + menuButtonElement.current.offsetWidth
   //    const menuButtonTop = menuButtonElement.current.getBoundingClientRect().top 
   //    const menuButtonBottom = menuButtonTop + menuButtonElement.current.offsetHeight
      
   //    if (clickX >= menuButtonLeft && clickX <= menuButtonRight && clickY >= menuButtonTop && clickY <= menuButtonBottom)
   //       return
         

   //    if (!ref?.current) {
   //       setIsOpen(false)
   //       return
   //    }

   //    const sidebarLeft = ref.current.offsetLeft
   //    const sidebarRight = sidebarLeft + ref.current.offsetWidth
   //    const sidebarTop = ref.current.offsetTop 
   //    const sidebarBottom = sidebarTop + ref.current.offsetHeight

   //    if (clickX >= sidebarLeft && clickX <= sidebarRight && clickY >= sidebarTop && clickY <= sidebarBottom)
   //       return

   //    setIsOpen(false)
   // }

   return (  
      <nav className={styles.nav}>
         <div className={styles.container}>
            {!isOpen && (
               <button onClick={() => setIsOpen(!isOpen)} ref={menuButtonElement} className={styles.menuButton} type='button'>
                  <BiMenuAltLeft className={styles.menuIcon}/>
               </button>
            )}
            <Link to='/'>
               <h1 className={styles.logo}>Volunteer</h1>
            </Link>
            <div className={styles.buttonContainer}>
               { user?.user ? (
                  <>
                     <button onClick={logout} className={`${styles.authButton} ${styles.logoutButton}`} type='button'>
                     <FiLogOut className={styles.authLogoutIcon}/>
                     Logout
                     </button>
                     <div className={styles.user}>
                        <div className={styles.userLetter}>{user?.user.name[0]}</div>
                     </div>
                  </>
               ) : (
                  <>
                     <Link to='/login' className={`${styles.authButton} ${styles.loginButton}`} type='button'>Login</Link>
                     <Link to='/signup' className={`${styles.authButton} ${styles.signupButton}`} type='button'>Signup</Link>
                  </>
               )}
            </div>
         </div>
         {isOpen && <Sidebar logout={logout} setIsOpen={setIsOpen} ref={ref}/>}
      </nav>
   )
}
 
export default Navbar