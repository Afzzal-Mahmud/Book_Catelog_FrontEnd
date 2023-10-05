import { AiFillDelete } from "react-icons/ai";
import { BsFillBookmarkDashFill, BsBookmarkCheckFill } from "react-icons/bs"
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFavouriteBook, setBookmarkedBook } from "../../Redux/book/favouriteBookSlice";

function WishlistLink() {
  const dispatch = useDispatch()
  const { favouriteBooks } = useSelector((state) => state.favouriteBooks);
  return (
    <section className="bg-white sm:bg-gray-100 md:bg-gray-100 mt-[10%]">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl bg-white rounded-lg shadow-md p-6">
          <header className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your WishlistLink
            </h1>
            <MdFavorite className="text-center" size={25} />
            <p className="text-xl mt-2 dark:text-gray-800">
              click any of the book heart button to add to favorites and
              click the image to see more details and make a review
            </p>
          </header>

          {favouriteBooks.map((singleBook, index) => (
            <section key={index} className="md:bg-gray-100">
              <div className="container bg-gray-100 mx-auto px-2 pb-4 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl bg-white rounded-lg shadow-md p-1 md:p[2rem] sm:px-6">
                  <header className="text-center mb-8">
                    <h1 className="text-base md:text-xl font-bold text-gray-900 sm:text-2xl">
                      {singleBook?.title}
                    </h1>
                  </header>

                  <ul className="space-y-4">
                    <li className="flex flex-col sm:flex-row items-center mb-3 sm:gap-4">
                      <img
                        src={singleBook?.image}
                        alt="Product"
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div className="flex-1 mt-4 sm:mt-0">
                        <h3 className="text-base font-semibold text-gray-900">
                          {singleBook?.author}
                        </h3>

                        <dl className="mt-1 space-y-1 text-xs text-gray-600">
                          <div className="flex">
                            <span className="inline font-medium">Price:</span>
                            <span className="ml-1">{singleBook?.price}</span>
                          </div>

                          <div className="flex">
                            <span className="inline font-medium">Genre:</span>
                            <span className="ml-1">{singleBook?.genre}</span>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-col">
                        <button onClick={() => dispatch(deleteFavouriteBook(singleBook._id))} className="text-red-600 transition hover:text-red-800 mt-4 sm:mt-0">
                          <p className="flex">
                            <AiFillDelete size={25} />
                            <span>Delete</span>
                          </p>
                        </button>

                        <button onClick={() => dispatch(setBookmarkedBook(singleBook._id))} className="text-black-600 transition hover:text-black-800 mt-4">
                          {!singleBook.bookmark ?
                            <p className="flex">
                              <BsFillBookmarkDashFill size={25} /> <span>Reading</span>
                            </p>
                            :
                            <p className="flex">
                              <BsBookmarkCheckFill className="text-blue-600" size={25} /> <span>Complited</span>
                            </p>
                          }
                        </button>

                        <Link to={`/book-details/${singleBook._id}`}>
                          <h2 style={{ textDecoration: "underline" }} className="text-xl mt-3 sm:mt-1">Make Review</h2>
                        </Link>
                      </div>

                    </li>
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WishlistLink;
