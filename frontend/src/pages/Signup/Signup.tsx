import { FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { signUp } from '../../redux/auth'
import styles from './Signup.module.scss'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'
import { useAppDispatch } from '../../hooks/useTypedDispatch'
import { useAppSelector } from '../../hooks/useTypedSelector'

export type SignupFormData = {
   name: string
   email: string
   password: string
}

const Signup = () => {
   const [name, setName] = useState<string>('')
   const [email, setEmail] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [error, setError] = useState<string | null>(null)

   const dispatch = useAppDispatch()
   const { isLoading, error: err } = useAppSelector((store) => store.auth)

   const navigate = useNavigate()
   const location = useLocation()

   const handleOnSubmit = (e: FormEvent) => {
      e.preventDefault()

      const formData: SignupFormData = { name, email, password }

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
                  setError(null)
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
                  setError(null)
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
                  setError(null)
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
