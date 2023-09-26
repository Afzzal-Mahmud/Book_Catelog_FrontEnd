import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../Redux/enums/bookApiStatus";
import { fetchBooks, setBooksBasedOnSearch, setSelectedGenre } from "../../Redux/book/bookSlice";

import Spinner from "../../components/Spinner/Spinner";
import BooksBody from "../../components/BooksBody/BooksBody";
import { AiOutlineInfoCircle, AiOutlineSearch } from "react-icons/ai";

const Books = () => {
  /* setting the books into store */
  const dispatch = useDispatch();
  const inputRef = useRef('')
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);


  const { books, status, selectedGenre, searchedBasedBooks } = useSelector((state) => state?.books);
  const filterOnSearch = () => {
    dispatch(setBooksBasedOnSearch(inputRef.current.value.toLowerCase()))
    console.log(inputRef.current.value.toLowerCase())
  }

  if (status === STATUSES.LOADING) {
    return <Spinner />;
  }

  /* Rendaring the book-body components based on */

  let booksToRender;

  if (searchedBasedBooks.length) {
    booksToRender = searchedBasedBooks;
  } else if (selectedGenre.length) {
    booksToRender = selectedGenre;
  } else {
    booksToRender = books;
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
        {/* Search Input */}

        <div className="rounded-lg pt-5 pb-3 py-2 mb-4">
          <div className="flex items-center bg-gray-200 rounded-md">
            <div className="pl-2">
              <AiOutlineSearch />
            </div>
            <input
              className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
              ref={inputRef}
              onChange={filterOnSearch}
              type="text" placeholder="Search books by name" />
          </div>
          <div className="flex justify-between lg:items-center mt-3">
            <AiOutlineInfoCircle className="mt-1" />
            <p className="ml-2">If your search result does not match any book name you will see the all books</p>
          </div>
        </div>
      </div>

      {/* Display books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {/* mapping the same component based on diffirent state */}

        {
          booksToRender.map((singleBook, index) => (
            <BooksBody key={index} singleBook={singleBook} />
          ))
        }

      </div>
    </div>
  );
};

export default Books;
