import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { signUp } from '../../redux/auth'
import styles from './Signup.module.scss'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'

const Signup = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState(false)

   const dispatch = useDispatch()
   const { isLoading, error: err } = useSelector((store) => store.auth)

   const navigate = useNavigate()
   const location = useLocation()

   const handleOnSubmit = (e) => {
      e.preventDefault()

      const formData = { name, email, password }

      dispatch(signUp({ formData, navigate }))
   }

   useEffect(() => {
      setError(err)
   }, [err])

   useEffect(() => {
      setError(null)
   }, [location])

   return (
      <section className={`${'section'} ${styles.section}`}>
         <form
            onSubmit={(e) => handleOnSubmit(e)}
            className='authForm'
         >
            <h2 className='authHeader'>Zarejestruj się</h2>
            <label
               className='authLabel'
               htmlFor='name'
            >
               Nazwa użytkownika
            </label>
            <input
               onChange={(e) => {
                  setError(false)
                  setName(e.target.value)
               }}
               className='authInput'
               id='name'
               type='text'
            />
            <label
               className='authLabel'
               htmlFor='email'
            >
               Adres email
            </label>
            <input
               onChange={(e) => {
                  setError(false)
                  setEmail(e.target.value)
               }}
               className='authInput'
               id='email'
               type='text'
            />
            <label
               className='authLabel'
               htmlFor='password'
            >
               Hasło
            </label>
            <input
               onChange={(e) => {
                  setError(false)
                  setPassword(e.target.value)
               }}
               className='authInput'
               id='password'
               type='password'
            />
            <div className='authAlreadyContainer'>
               <p className='authAlreadyText'>Masz już konto?</p>
               <Link
                  to='/volunteer/login'
                  className='authAlreadyButton'
               >
                  Zaloguj się
               </Link>
            </div>
            {error && (
               <div className='authErrorContainer'>
                  <p className='authErrorText'>{error}</p>
               </div>
            )}
            <button
               className='authSubmitButton'
               type='submit'
               disabled={isLoading}
            >
               {isLoading ? (
                  <Loader
                     height={30}
                     width={30}
                     color={COLORS.white}
                     secondaryColor={COLORS.white}
                     strokeWidth={3}
                     strokeWidthSecondary={3}
                  />
               ) : (
                  'Zarejestruj się'
               )}
            </button>
         </form>
      </section>
   )
}

export default Signup
