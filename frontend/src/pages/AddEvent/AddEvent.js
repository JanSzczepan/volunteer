import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Switch from '../../components/Switch/Switch'
import { OPTIONS } from '../../constants'
import { createEvent } from '../../redux/events'
import ImageUpload from '../../components/ImageUpload/ImageUpload'
import styles from './AddEvent.module.scss'

const AddEvent = () => {

   const [formData, setFormData] = useState({ title: '', description: '', city: '', address: '', cathegory: OPTIONS[0].value, date: '', creator: '', anonymous: true, selectedFile: '' })
   const [isToggled, setIsToggled] = useState(false)

   const dispatch = useDispatch()
   const { isLoading, error } = useSelector(store => store.events)

   const navigate = useNavigate()

   const user = JSON.parse(window.localStorage.getItem('profile'))

   const handleImage = (image) => {
      setFormData({ ...formData, selectedFile: image })
   }

   const onSubmit = (e) => {
      e.preventDefault()
      
      if (isToggled)
         setFormData({ ...formData, anonymous: false })
      
      dispatch(createEvent({ formData, navigate }))
   }
   
   return (  
      <section className={`section ${styles.section}`}>
         <form onSubmit={(e) => onSubmit(e)} className='addEventForm'>
            <h2 className='addEventHeader'>Stwórz wolontariat</h2>
            <label className='addEventLabel' htmlFor='title'>Tytuł</label>
            <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={`addEventInput ${error?.emptyFields?.includes('title') && styles.inputError}`} id='title' type='text' />
            <label className='addEventLabel' htmlFor='description'>Opis</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={`addEventTextarea ${error?.emptyFields?.includes('description') && styles.inputError}`} id="description" rows="6"></textarea>
            <label className='addEventLabel' htmlFor="selectedFile">Zdjęcie</label>
            <ImageUpload handleImage={handleImage}/>
            <div className={styles.inputsContainer}>
               <div>
                  <label className={`addEventLabel ${styles.addEventLabel}`} htmlFor='city'>Miasto</label>
                  <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={`addEventInput ${error?.emptyFields?.includes('city') && styles.inputError}`} id='city' type='text' />
               </div>
               <div>
                  <label className='addEventLabel' htmlFor='address'>Adres</label>
                  <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className='addEventInput' id='address' type='text' />
               </div>
            </div>
            <label className='addEventLabel' htmlFor='cathegory'>Kategoria</label>
            <select value={formData.cathegory} onChange={(e) => setFormData({ ...formData, cathegory: e.target.value })} className={`addEventSelect ${error?.emptyFields?.includes('cathegory') && styles.inputError}`} id='cathegory'>
               {OPTIONS.map((option, i) => (
                  <option value={option.value} key={i}>{option.text}</option>
               ))}
            </select>
            <label className='addEventLabel' htmlFor='datetime'>Data i godzina</label>
            <input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={`addEventDateTime ${error?.emptyFields?.includes('date') && styles.inputError}`} type="datetime-local" id="datetime" />
            <label className={styles.switchLabel}>
               <Switch isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)}/>
               <p className={styles.switchText}>Zaznacz, że jesteś autorem</p>
            </label>
            {error && (
               <div className='addEventErrorContainer'>
                  <p className='addEventErrorText'>{error?.errorMessage}</p>
               </div>
            )}
            {user?.user ? (
               <button className={`addEventSubmitButton ${styles.addEventSubmitButton}`} type='submit'>Dodaj Event</button>
            ) : (
               <Link to='/volunteer/login' className={styles.addEventLink}>Dodaj Event</Link>
            )}
         </form>
      </section>
   )
}
 
export default AddEvent