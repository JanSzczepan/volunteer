import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import { BiHome } from 'react-icons/bi'
import { MdOutlineEventAvailable, MdOutlineEventNote } from 'react-icons/md'
import { IoCloseCircleOutline } from 'react-icons/io5'

import styles from './Sidebar.module.scss'

const EXPLORE_ROUTES = [
   {
      path: '/about',
      name: 'O nas',
      icon: <BiHome className={styles.icon}/>
   },
   {
      path: '/events',
      name: 'Eventy',
      icon: <MdOutlineEventNote className={styles.icon}/>
   }
]

const EVENTS_ROUTES = [
   {
      path: '/events/yours',
      name: 'Twoje Eventy',
      icon: <MdOutlineEventAvailable className={styles.icon}/>
   }
]

const Sidebar = forwardRef(({ logout, setIsOpen }, ref) => {

   const user = JSON.parse(window.localStorage.getItem('profile'))

   return (  
      <section ref={ref} className={styles.sidebarSection}>
         {user?.user && (
            <div className={styles.userContainer}>
               <div className={styles.user}>
                  <p className={styles.userLetter}>{user?.user.name[0]}</p>
               </div>
               <p className={styles.userName}>{user?.user.name}</p>
            </div>
         )}
         <div className={styles.linkContainer}>
            <p className={styles.underSectionText}>Odkryj</p>
            {EXPLORE_ROUTES.map((route, i) => (
               <Link className={styles.link} to={route.path} key={i}>{route.icon} {route.name}</Link>
            ))}
         </div>
         {user?.user && (
            <div>
               <p className={styles.underSectionText}>Twoje eventy</p>
               {EVENTS_ROUTES.map((route, i) => (
                  <Link className={styles.link} to={route.path} key={i}>{route.icon} {route.name}</Link>
               ))}
            </div>
         )}
         <div>
            <p className={styles.underSectionText}>Użytkownik</p>
            {user?.user && (
               <>
               <Link to='/events/add-event' className={styles.addEventButton}>Dodaj Event</Link>
               <button onClick={logout} className={`${styles.authButton} ${styles.logoutButton}`} type='button'>
                  <FiLogOut className={styles.authLogoutIcon}/>
                  Logout
               </button>
               </>
            )}
            {!user?.user && (
               <>
                  <Link to='/signup' className={`${styles.authButton} ${styles.signupButton}`} type='button'>Signup</Link>
                  <Link to='/login' className={`${styles.authButton} ${styles.loginButton}`} type='button'>Login</Link>
               </>
            )}
         </div>
         <div className={styles.closeButtonContainer}>
            <button onClick={() => setIsOpen(false)} className={styles.closeButton} type='button'>
               <IoCloseCircleOutline className={styles.closeIcon}/>
            </button>
         </div>
      </section>
   )
})
 
export default Sidebar