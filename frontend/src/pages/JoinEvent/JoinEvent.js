import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { cleanEvents, getEvent, joinEvent } from '../../redux/events'
import PageNotFound from '../PageNotFound/PageNotFound'
import styles from './JoinEvent.module.scss'

const JoinEvent = () => {

   const [motivation, setMotivation] = useState('')
   const [error, setError] = useState(false)

   const { id } = useParams()
   const navigate = useNavigate()

   const dispatch = useDispatch()
  
   const { event, isLoading, error: err } = useSelector(store => store.events)
   
   const user = JSON.parse(window.localStorage.getItem('profile'))
   
   const join = Boolean(!event?.participants?.includes(user?.user._id))

   const handleSubmit = (e) => {
      e.preventDefault()

      if (!user?.user) return

      if (!motivation) {
         const errorText = join ? 'Podaj motywację' : 'Podaj rezygnację' 
         setError(errorText)
         return
      }

      let formData

      if (join)
         formData = {motivation}
      else {
         const resignation = motivation
         formData = {resignation}
      }

      dispatch(cleanEvents())
      dispatch(joinEvent({ id, formData, navigate }))
   }

   useEffect(() => {
      setError(err)
   }, [err])

   useEffect(() => {
      dispatch(getEvent(id))
   }, [id, dispatch])

   if (error === 'Event id is not valid')
      return <PageNotFound />

   if (!event) return

   if (event?.banned?.includes(user?.user._id)) 
      return (
         <section className={`section ${styles.section}`}>
            <div>
               <h2 className={styles.resignText}>Zrezygnowałeś już z tego eventu...</h2>
            </div>
         </section>
      )
        
   return (  
      <section className={`section ${styles.section}`}>
         <form onSubmit={(e) => handleSubmit(e)} className='joinForm'>
            {join && <h2 className='joinHeader'>Dlaczego chcesz dołączyć do eventu?</h2>}
            {!join && <h2 className='joinHeader'>Dlaczego chcesz zrezygnować z eventu?</h2>}
            <label className='joinLabel' htmlFor='motivation'>{join ? 'Twoja motywacja' : 'Twoja rezygnacja'}</label>
            <input value={motivation} onChange={(e) => setMotivation(e.target.value)} className='joinInput' id='motivation' type='text' />
            {error && (
               <div className='joinErrorContainer'>
                  <p className='joinErrorText'>{error}</p>
               </div>
            )}
            {user?.user ? (
               <button className={join ? 'joinSubmitButton' : styles.resignSubmitButton} type='submit'>{join ? 'Dołącz' : 'Zrezygnuj'}</button>
            ) : (
               <Link to='/volunteer/login' className={styles.joinLink}>Dołącz</Link>
            )}
         </form>
      </section>
   )
}
 
export default JoinEvent