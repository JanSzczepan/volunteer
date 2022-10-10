import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logIn } from '../../redux/auth'
import styles from './Login.module.scss'

const Login = () => {

   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()
   const { isLoading, error } = useSelector(store => store.auth)

   const navigate = useNavigate()

   const handleOnSubmit = (e) => {
      e.preventDefault()

      const formData = { login, password }

      dispatch(logIn({ formData, navigate }))
   }
   
   // if (isLoading) return

   return (  
      <section>
         <form onSubmit={(e) => handleOnSubmit(e)}>
            <h2>Zaloguj się</h2>
            <label htmlFor="name">Nazwa użytkownika lub email</label>
            <input onChange={(e) => setLogin(e.target.value)} id="name" type="text"/>
            <label htmlFor="password">Hasło</label>
            <input onChange={(e) => setPassword(e.target.value)} id="password" type="password"/>
            <div>
               <p>Nie masz konta?</p>
               <Link to='/signup'>Zarejestruj się</Link>
            </div>
            {error && (
               <div>
                  <p>{error}</p>
               </div>
            )}
            <button type='submit'>Zaloguj się</button>
         </form>
      </section>
   )
}
 
export default Login