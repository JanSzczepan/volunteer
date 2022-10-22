import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logIn } from '../../redux/auth'
import styles from './Login.module.scss'

const Login = () => {

   const [login, setLogin] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState(false)

   const dispatch = useDispatch()
   const { isLoading, error: err } = useSelector(store => store.auth)

   const navigate = useNavigate()
   const location = useLocation()

   const handleOnSubmit = (e) => {
      e.preventDefault()

      const formData = { login, password }

      dispatch(logIn({ formData, navigate }))
   }

   useEffect(() => {
      setError(err)
   }, [err])

   useEffect(() => {
      setError(null)
   }, [location])

   return (  
      <section className={`${'section'} ${styles.section}`}>
         <form onSubmit={(e) => handleOnSubmit(e)} className='authForm'>
            <h2 className='authHeader'>Zaloguj się</h2>
            <label className='authLabel' htmlFor="name">Nazwa użytkownika lub email</label>
            <input onChange={(e) => {
                  setError(false)
                  setLogin(e.target.value)}
               } className='authInput' id="name" type="text"/>
            <label className='authLabel' htmlFor="password">Hasło</label>
            <input onChange={(e) => {
                  setError(false)
                  setPassword(e.target.value)}
               } className='authInput' id="password" type="password"/>
            <div className='authAlreadyContainer'>
               <p className='authAlreadyText'>Nie masz konta?</p>
               <Link to='/signup' className='authAlreadyButton'>Zarejestruj się</Link>
            </div>
            {error && (
               <div className='authErrorContainer'>
                  <p className='authErrorText'>{error}</p>
               </div>
            )}
            <button className='authSubmitButton' type='submit'>Zaloguj się</button>
         </form>
      </section>
   )
}
 
export default Login