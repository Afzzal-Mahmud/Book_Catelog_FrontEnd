/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom"

function PrivateRoute({ children }) {
  const location = useLocation()
  let userStatus
  const userState = document.cookie
    .split('; ')
    .find(row => row.startsWith('userState='));

  if (userState) {
    const status = userState.split('=')[1];
    if (status === '') {
      userStatus = false
    } else {
      userStatus = true
    }
  }

  if (!userStatus) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  
  return children
}

export default PrivateRoute