import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getAllEvents } from '../../redux/events'
import EventsInputButtonContainer from '../../components/EventsInputButtonContainer/EventsInputButtonContainer'
import EventCard from '../UpcomingEvents/EventCard/EventCard'
import styles from './AllEvents.module.scss'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'
import { useAppDispatch } from '../../hooks/useTypedDispatch'
import { useAppSelector } from '../../hooks/useTypedSelector'

const AllEvents = () => {
   const dispatch = useAppDispatch()
   const { isLoading, allEvents } = useAppSelector((store) => store.events)

   const location = useLocation()

   useEffect(() => {
      dispatch(getAllEvents())
   }, [dispatch, location])

   return (
      <section className={`section ${styles.allEventsSection}`}>
         <EventsInputButtonContainer />
         <div className={styles.headerContainer}>
            <h2 className={styles.header}>
               Wszystkie <br className={styles.headerBr} /> Wolontariaty
            </h2>
         </div>
         {isLoading ? (
            <div className='loaderSpinnerContainer'>
               <Loader
                  height={40}
                  width={40}
                  color={COLORS.green}
                  secondaryColor={COLORS.green}
                  strokeWidth={3}
                  strokeWidthSecondary={3}
               />
            </div>
         ) : (
            <div className='cardsContainer'>
               {Boolean(allEvents?.length) &&
                  allEvents.map((e, i) => (
                     <EventCard
                        event={e}
                        isAllEvents={true}
                        key={i}
                     />
                  ))}
            </div>
         )}
      </section>
   )
}

export default AllEvents
