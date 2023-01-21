import { FormEvent, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Loader from '../../components/Loader/Loader'
import { logIn } from '../../redux/auth'
import styles from './Login.module.scss'
import { COLORS } from '../../constants'
import { useAppDispatch } from '../../hooks/useTypedDispatch'
import { useAppSelector } from '../../hooks/useTypedSelector'

export type LoginFormData = {
   login: string
   password: string
}

const Login = () => {
   const [login, setLogin] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [error, setError] = useState<string | null>(null)

   const dispatch = useAppDispatch()
   const { isLoading, error: err } = useAppSelector((store) => store.auth)

   const navigate = useNavigate()
   const location = useLocation()

   const handleOnSubmit = (e: FormEvent) => {
      e.preventDefault()

      const formData: LoginFormData = { login, password }

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
         <form
            onSubmit={(e) => handleOnSubmit(e)}
            className='authForm'
         >
            <h2 className='authHeader'>Zaloguj się</h2>
            <label
               className='authLabel'
               htmlFor='name'
            >
               Nazwa użytkownika lub email
            </label>
            <input
               onChange={(e) => {
                  setError(null)
                  setLogin(e.target.value)
               }}
               className='authInput'
               id='name'
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
                  setError(null)
                  setPassword(e.target.value)
               }}
               className='authInput'
               id='password'
               type='password'
            />
            <div className='authAlreadyContainer'>
               <p className='authAlreadyText'>Nie masz konta?</p>
               <Link
                  to='/volunteer/signup'
                  className='authAlreadyButton'
               >
                  Zarejestruj się
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
                  'Zaloguj się'
               )}
            </button>
         </form>
      </section>
   )
}

export default Login
