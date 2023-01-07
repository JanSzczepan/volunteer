import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

import styles from './Search.module.scss'

const Search = () => {
   const [search, setSearch] = useState('')

   const navigate = useNavigate()

   const searchEvents = () => {
      if (search.trim()) {
         navigate(`/volunteer/events/search?search=${search.trim() || 'none'}`)
      } else navigate('/volunteer/events/all')

      setSearch('')
   }

   const handleKeyDown = (e) => {
      if (e.keyCode === 13) searchEvents()
   }

   return (
      <div className={styles.container}>
         <button
            onClick={searchEvents}
            className={styles.searchButton}
            type='button'
         >
            <BsSearch className={styles.icon} />
         </button>
         <input
            className={styles.input}
            type='text'
            placeholder='Szukaj wolontariatu...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
         />
      </div>
   )
}

export default Search
