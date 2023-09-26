/* eslint-disable react/prop-types */
import { BsBookmarkHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setWarning,
  clearWarning,
  setFavouriteBooks,
} from "../../Redux/book/favouriteBookSlice";
import Swal from "sweetalert2";
import { WARNING_STATUSES } from "../../Redux/enums/warningStatus";
function BooksBody({ singleBook }) {
  /* reciving a single book object in both Components and handler*/
  const { favouriteBooks } = useSelector((state) => state.favouriteBooks);
  const dispatch = useDispatch();

  const handleFavouriteBook = (bookObject) => {
    if (favouriteBooks.includes(bookObject)) {
      dispatch(setWarning(WARNING_STATUSES.WARNING_TRUE));
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "You have already added this book to your wishlist",
        footer: "See Your Wishlist below this page",
      });
    } else {
      dispatch(setFavouriteBooks(bookObject));
      dispatch(clearWarning());
      Swal.fire(
        "Good job!",
        "You added this book to your Wishlist,see below this page!",
        "success"
      );
    }
  };

  return (
    <>
      <div
        key={singleBook._id}
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
          <p onClick={() => handleFavouriteBook(singleBook)}>
            <BsBookmarkHeartFill size={25} />
          </p>
        </div>
      </div>
    </>
  );
}

export default BooksBody;
