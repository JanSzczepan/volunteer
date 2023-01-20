import { UserProfile } from '../App'

const getUserProfile = () => {
   let value: UserProfile
   const jsonValue = localStorage.getItem('profile')

   if (jsonValue == null) {
      value = {}
   } else {
      value = JSON.parse(jsonValue)
   }

   return value
}

export default getUserProfile
