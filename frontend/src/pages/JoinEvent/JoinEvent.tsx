import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { cleanEvents, getEvent, joinEvent } from '../../redux/events'
import PageNotFound from '../PageNotFound/PageNotFound'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'
import styles from './JoinEvent.module.scss'
import { useAppDispatch } from '../../hooks/useTypedDispatch'
import { useAppSelector } from '../../hooks/useTypedSelector'
import useLocalStorage from '../../hooks/useLocalStorage'
import { UserProfile } from '../../App'

export type JoinEventFormData = {
   [key: string]: string
}

const JoinEvent = () => {
   const [motivation, setMotivation] = useState<string>('')
   const [error, setError] = useState<string>('')
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const { id } = useParams()
   const navigate = useNavigate()

   const dispatch = useAppDispatch()
   const { event, isLoading: isEventLoading, error: err } = useAppSelector((store) => store.events)

   const [user] = useLocalStorage<UserProfile>('profile', {})

   const join = useMemo(() => Boolean(!event?.participants?.includes(user?.user?._id!)), [event?.participants, user?.user?._id])

   const handleSubmit = (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)

      if (!user?.user || !id) return

      if (!motivation) {
         const errorText = join ? 'Podaj motywację' : 'Podaj rezygnację'
         setError(errorText)
         return
      }

      let formData: JoinEventFormData

      if (join) formData = { motivation }
      else {
         const resignation = motivation
         formData = { resignation }
      }

      dispatch(cleanEvents())
      dispatch(joinEvent({ id, formData, navigate, setIsLoading }))
   }

   useEffect(() => {
      setError(err)
   }, [err])

   useEffect(() => {
      if (id) dispatch(getEvent(id))
   }, [id, dispatch])

   if (error === 'Event id is not valid') return <PageNotFound />

   if (isEventLoading && !isLoading)
      return (
         <div className='loaderSpinnerBigContainer'>
            <Loader
               height={40}
               width={40}
               color={COLORS.green}
               secondaryColor={COLORS.green}
               strokeWidth={3}
               strokeWidthSecondary={3}
            />
         </div>
      )

   if (event?.banned?.includes(user?.user?._id!))
      return (
         <section className={`section ${styles.section}`}>
            <div>
               <h2 className={styles.resignText}>Zrezygnowałeś już z tego eventu...</h2>
            </div>
         </section>
      )

   return (
      <section className={`section ${styles.section}`}>
         <form
            onSubmit={(e) => handleSubmit(e)}
            className='joinForm'
         >
            {join && <h2 className='joinHeader'>Dlaczego chcesz dołączyć do eventu?</h2>}
            {!join && <h2 className='joinHeader'>Dlaczego chcesz zrezygnować z eventu?</h2>}
            <label
               className='joinLabel'
               htmlFor='motivation'
            >
               {join ? 'Twoja motywacja' : 'Twoja rezygnacja'}
            </label>
            <input
               value={motivation}
               onChange={(e) => setMotivation(e.target.value)}
               className='joinInput'
               id='motivation'
               type='text'
            />
            {!!error && (
               <div className='joinErrorContainer'>
                  <p className='joinErrorText'>{error}</p>
               </div>
            )}
            {user?.user ? (
               <button
                  className={join ? 'joinSubmitButton' : styles.resignSubmitButton}
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
                  ) : join ? (
                     'Dołącz'
                  ) : (
                     'Zrezygnuj'
                  )}
               </button>
            ) : (
               <Link
                  to='/volunteer/login'
                  className={styles.joinLink}
               >
                  Dołącz
               </Link>
            )}
         </form>
      </section>
   )
}

export default JoinEvent
