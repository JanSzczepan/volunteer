import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EventsInputButtonContainer from '../../components/EventsInputButtonContainer/EventsInputButtonContainer'
import EventCard from '../UpcomingEvents/EventCard/EventCard'
import useQuery from '../../hooks/useQuery'
import { getEventsBySearch } from '../../redux/events'
import Loader from '../../components/Loader/Loader'
import { COLORS } from '../../constants'
import styles from './SearchEvents.module.scss'

const SearchEvents = () => {
   const dispatch = useDispatch()
   const { eventsBySearch, isLoading } = useSelector((store) => store.events)

   const query = useQuery('search')

   useEffect(() => {
      dispatch(getEventsBySearch(query))
   }, [query, dispatch])

   return (
      <section className={`section ${styles.searchEventsSection}`}>
         <EventsInputButtonContainer />
         <div className={styles.headerContainer}>
            <h2 className={styles.header}>
               Eventy:&nbsp;&nbsp;
               <br className={styles.headerBr} />"{query}"
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
               {Boolean(eventsBySearch?.length) ? (
                  eventsBySearch.map((e, i) => (
                     <EventCard
                        event={e}
                        isAllEvents={true}
                        key={i}
                     />
                  ))
               ) : (
                  <div>
                     <p>Nie znaleziono eventów dla wyszukiwania:&nbsp;&nbsp;"{query}"</p>
                  </div>
               )}
            </div>
         )}
      </section>
   )
}

export default SearchEvents
