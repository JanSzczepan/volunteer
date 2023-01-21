import styles from './Switch.module.scss'

type SwitchProps = {
   isToggled: boolean
   onToggle: () => void
}

const Switch = ({ isToggled, onToggle }: SwitchProps) => {
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
