/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Spinner from "../components/Spinner/Spinner"

function PrivateRoute({children}) {
    const { user, isLoading} = useSelector((state) => state.user)

    const location = useLocation()

    if(isLoading){
        return <Spinner/>
    }

    if(!user.email && !isLoading){
        return <Navigate to ='/login' state={{from : location}} replace />
    }

    return children
}

export default PrivateRoute