import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BiMenuAltLeft } from 'react-icons/bi'
import { FiLogOut } from 'react-icons/fi'
import decode from 'jwt-decode'

import { keepTrack, logOut } from '../../redux/auth'
import styles from './Navbar.module.scss'

const Navbar = () => {

   const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('profile')))
   
   const dispatch = useDispatch()

   const navigate = useNavigate()
   const location = useLocation()

   useEffect(() => {
      const token = user?.token

      if (token) {
         const decodedToken = decode(token)
       
         if(decodedToken.exp * 1000 < new Date().getTime())
            logout()
      }
      
      dispatch(keepTrack())

      setUser(JSON.parse(window.localStorage.getItem('profile')))
   }, [location])
   
   const logout = () => {
      setUser(null)
      dispatch(logOut())
      navigate('/login')
   }

   return (  
      <nav>
         <div className={styles.container}>
            <button className={styles.menuButton} type='button'>
               <BiMenuAltLeft className={styles.menuIcon}/>
            </button>
            <Link to='/'>
               <h1 className={styles.logo}>Volunteer</h1>
            </Link>
            <div className={styles.buttonContainer}>
               { user?.user ? (
                  <button onClick={logout} className={`${styles.authButton} ${styles.logoutButton}`} type='button'>
                     <FiLogOut className={styles.authLogoutIcon}/>
                     Logout
                  </button>
               ) : (
                  <>
                     <Link to='/login' className={`${styles.authButton} ${styles.loginButton}`} type='button'>Login</Link>
                     <Link to='/signup' className={`${styles.authButton} ${styles.signupButton}`} type='button'>Signup</Link>
                  </>
               )}
            </div>
         </div>
      </nav>
   )
}
 
export default Navbar