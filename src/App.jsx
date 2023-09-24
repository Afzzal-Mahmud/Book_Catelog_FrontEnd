import { useDispatch } from "react-redux"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { setUser } from "./Redux/userAuth/userAuthSlice"
import Hero from "./pages/Hero/Hero"
import WishList from "./pages/WishList/WishList";
import Navbar from "./components/Navbar"
import BookDetails from "./components/BookDetails";
import LogIn from "./components/Form/LogIn";
import Register from "./components/Form/Register";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Hero/>}/>
          <Route path="/wishlist" element={<WishList/>}/>
          <Route path="/book-details/:bookId" element={<BookDetails/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
