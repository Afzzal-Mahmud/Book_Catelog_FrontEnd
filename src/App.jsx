import { useDispatch } from "react-redux"
import MainLayout from "./Layout/MainLayout"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setUser } from "./Redux/userAuth/userAuthSlice"

function App() {

  const auth = getAuth()
  const dispatch = useDispatch()
  
  onAuthStateChanged(auth, (user) => {
    if(user){
      dispatch(setUser(user.email))
    }
  });

  return (
    <>
        <MainLayout/>
    </>
  )
}

export default App
