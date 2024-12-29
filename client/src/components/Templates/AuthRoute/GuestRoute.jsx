import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"


const GuestRoute = ({ children }) => {

  const token = useSelector((state) => state.auth.token)

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return children

}


export default GuestRoute
