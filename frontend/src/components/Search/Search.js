import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BsSearch } from 'react-icons/bs'

import { getEventsBySearch } from '../../redux/events'
import styles from './Search.module.scss'

const Search = () => {

   const [search, setSearch] = useState('')

   // const dispatch = useDispatch()

   const navigate = useNavigate()

   const searchEvents = () => {
      if (search.trim()) {
         navigate(`/events/search?search=${search.trim() || 'none'}`)
         // dispatch(getEventsBySearch(search.trim()))
      } else 
         navigate('/events/all')
   }

   const handleKeyDown = (e) => {
      if (e.keyCode === 13)
        searchEvents()
    }

   return (  
      <div className={styles.container}>
         <button onClick={searchEvents} className={styles.searchButton} type='button'>
            <BsSearch className={styles.icon}/>
         </button>
         <input 
            className={styles.input}
            type='text'
            placeholder='Szukaj eventu...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
         />
      </div>
   )
}
 
export default Search