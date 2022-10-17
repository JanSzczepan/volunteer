import { useLocation } from "react-router-dom"

const useQuery = (search) => {
   
   const location = useLocation()
   
   const query = (new URLSearchParams(location.search)).get(search)

   return query
}

export default useQuery