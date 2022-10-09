import { BiMenuAltLeft } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.scss'

const Navbar = () => {
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
               <Link to='/login' className={`${styles.authButton} ${styles.loginButton}`} type='button'>Login</Link>
               <Link to='/signup' className={`${styles.authButton} ${styles.signupButton}`} type='button'>Signup</Link>
            </div>
         </div>
      </nav>
   )
}
 
export default Navbar