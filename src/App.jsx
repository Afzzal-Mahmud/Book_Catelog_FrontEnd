import Hero from "./pages/Hero/Hero";
import WishList from "./pages/WishList/WishList";
import Navbar from "./components/Navbar";
import BookDetails from "./components/DetailsComponents/BookDetails";
import LogIn from "./components/Form/LogIn";
import Register from "./components/Form/Register";
import NotFound from "./components/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewBook from "./pages/AddBook/AddNewBook";
import { EditBook } from "./pages/EditBook/EditBook";
import UpdateBook from "./pages/EditBook/UpdateBook";
import PrivateRoute from "./routes/PrivateRoute";
import BookDetailsAfterUpdate from "./components/DetailsComponents/BookDetailsAfterUpdate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/addbook" element={
            <PrivateRoute>
              <AddNewBook />
            </PrivateRoute>
          } />
          <Route path="/editbook" element={
            <PrivateRoute>
              <EditBook />
            </PrivateRoute>
          } />
          <Route path="/update-book/:id" element={
            <PrivateRoute>
              <UpdateBook />
            </PrivateRoute>
          } />
          <Route path="/updated-book-info/:id" element={
            <PrivateRoute>
              <BookDetailsAfterUpdate />
            </PrivateRoute>
          } />
          <Route path="/book-details/:bookId" element={<BookDetails />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
