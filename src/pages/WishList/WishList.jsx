// import { AiFillDelete } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WishlistLink() {
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
              click any of the above book heart button to add to favorites and
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

                      {/* Due to react mount and unmount problem, Currently skipping the delete option */}

                      {/* <button onClick={dispatch(deleteFavouriteBook(singleBook._id))} className="text-red-600 transition hover:text-red-800 mt-4 sm:mt-0">
                        <AiFillDelete size={25} />
                      </button> */}

                      <Link to={`/book-details/${singleBook._id}`}>
                        <h2 style={{textDecoration:"underline"}} className="text-xl mt-3 sm:mt-1">Make Review</h2>
                      </Link>
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
