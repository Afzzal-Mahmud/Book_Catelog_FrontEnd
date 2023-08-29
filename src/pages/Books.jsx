import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import Wishlist from "./Wishlist";
import AlertComponent from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSelectedGenre } from "../Redux/book/bookSlice";

const Books = () => {
  // const [books, setBooks] = useState([]);
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  // const [selectedGenre, setSelectedGenre] = useState(null);
  const [warning, setWarning] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(fetchBooks())
  },[dispatch])
  const {books,selectedGenre} = useSelector((state) => state?.books) 

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Books
      </h1>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Fliter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type : Genera</p>
          <div className="flex justfiy-between flex-wrap">
            <button
              onClick={() => dispatch(setSelectedGenre(null))}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              All
            </button>
            <button
              onClick={() => dispatch(setSelectedGenre("Romance"))}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Romance
            </button>
            <button
              onClick={() => dispatch(setSelectedGenre("Horror"))}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Horror
            </button>
            <button
              onClick={() => dispatch(setSelectedGenre("Comedy"))}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Comedy
            </button>
            <button
              onClick={() => dispatch(setSelectedGenre("Business"))}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Business
            </button>
          </div>
        </div>
      </div>

      {/* Display books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        { selectedGenre.length ? selectedGenre.map((singleBook, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <Link to={`book-details/${singleBook._id}`} key={singleBook._id}>
              <img
                src={singleBook.image}
                alt={singleBook.title}
                className="w-full h-[500px] sm:h-[300px] md:h-[380px] lg:h-[400px] object-cover rounded-t-lg"
              />
            </Link>
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{singleBook.title}</p>
              {/* <p onClick={() => handleFavouriteBook(singleBook)}>
                <MdFavorite size={25} />
              </p> */}
            </div>
          </div>
        )) : books.map((singleBook, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <Link to={`book-details/${singleBook._id}`} key={singleBook._id}>
              <img
                src={singleBook.image}
                alt={singleBook.title}
                className="w-full h-[500px] sm:h-[300px] md:h-[380px] lg:h-[400px] object-cover rounded-t-lg"
              />
            </Link>
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{singleBook.title}</p>
              {/* <p onClick={() => handleFavouriteBook(singleBook)}>
                <MdFavorite size={25} />
              </p> */}
            </div>
          </div>
        ))}
      </div>
      {warning && (
        <AlertComponent
          alertTextBold="Well Done, You already added this book to the wishlist"
          alertTextSmall={"see your favourite wishlist below this page"}
        />
      )}
      <Wishlist allFavouriteBookList={favouriteBooks} />
    </div>
  );
};

export default Books;

    // const handleFavouriteBook = (bookObject) => {
    //   const existingFavouriteBook = favouriteBooks?.find(
    //     (book) => book._id === bookObject._id
    //   );
    //   if (existingFavouriteBook) {
    //     setWarning(true);
    //     setTimeout(() => {
    //       setWarning(false);
    //     }, 3000);
    //     return;
    //   } else {
    //     setFavouriteBooks([...favouriteBooks, bookObject]);
    //   }
    // };