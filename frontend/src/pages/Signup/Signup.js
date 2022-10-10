import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../../redux/auth'
import styles from './Signup.module.scss'

const Signup = () => {
 
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()
   const { isLoading, error } = useSelector(store => store.auth)

   const navigate = useNavigate()

   const handleOnSubmit = (e) => {
      e.preventDefault()

      const formData = { name, email, password }

      dispatch(signUp({ formData, navigate }))
   }
   
   // if (isLoading) return

   return (  
      <section className={`${'section'} ${styles.section}`}>
         <form onSubmit={(e) => handleOnSubmit(e)} className='authForm'>
            <h2 className='authHeader'>Zarejestruj się</h2>
            <label className='authLabel' htmlFor="name">Nazwa użytkownika</label>
            <input onChange={(e) => setName(e.target.value)} className='authInput' id="name" type="text"/>
            <label className='authLabel' htmlFor="email">Adres email</label>
            <input onChange={(e) => setEmail(e.target.value)} className='authInput' id="email" type="text"/>
            <label className='authLabel' htmlFor="password">Hasło</label>
            <input onChange={(e) => setPassword(e.target.value)} className='authInput' id="password" type="password"/>
            <div className='authAlreadyContainer'>
               <p className='authAlreadyText'>Masz już konto?</p>
               <Link to='/login' className='authAlreadyButton'>Zaloguj się</Link>
            </div>
            {error && (
               <div className='authErrorContainer'>
                  <p className='authErrorText'>{error}</p>
               </div>
            )}
            <button className='authSubmitButton' type='submit'>Zarejestruj się</button>
         </form>
      </section>
   )
}
 
export default Signup