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
      <section>
         <form onSubmit={(e) => handleOnSubmit(e)}>
            <h2>Zarejestruj się</h2>
            <label htmlFor="name">Nazwa użytkownika</label>
            <input onChange={(e) => setName(e.target.value)} id="name" type="text"/>
            <label htmlFor="email">Adres email</label>
            <input onChange={(e) => setEmail(e.target.value)} id="email" type="text"/>
            <label htmlFor="password">Hasło</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>
            <div>
               <p>Masz już konto?</p>
               <Link to='/login'>Zaloguj się</Link>
            </div>
            {error && (
               <div>
                  <p>{error}</p>
               </div>
            )}
            <button type='submit'>Zarejestruj się</button>
         </form>
      </section>
   )
}
 
export default Signup