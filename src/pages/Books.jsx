import { useEffect } from "react";
import Wishlist from "./Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSelectedGenre } from "../Redux/book/bookSlice";
import { STATUSES } from "../Redux/enums/bookApiStatus";
import Spinner from "../components/Spinner/Spinner";
import BooksBody from "../components/BooksBody/BooksBody";
const Books = () => {
  /* setting the books into store */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const { books, status, selectedGenre } = useSelector((state) => state?.books);

  if (status === STATUSES.LOADING) {
    return <Spinner />;
  }

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
        {/* mapping the same component based on diffirent state */}
        {selectedGenre.length
          ? selectedGenre.map((singleBook, index) => (
              <BooksBody key={index} singleBook={singleBook} />
            ))
          : books.map((singleBook, index) => (
              <BooksBody key={index} singleBook={singleBook} />
            ))}
      </div>
      <Wishlist />
    </div>
  );
};

export default Books;
