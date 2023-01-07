import styles from './Switch.module.scss'

const Switch = ({ isToggled, onToggle }) => {
   return (
      <label className={styles.switch}>
         <input
            className={styles.input}
            checked={isToggled}
            onChange={onToggle}
            type='checkbox'
         />
         <span className={styles.slider}></span>
      </label>
   )
}

export default Switch
