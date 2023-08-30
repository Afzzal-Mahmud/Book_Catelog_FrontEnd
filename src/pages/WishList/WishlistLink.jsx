
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
function WishlistLink() {
  return (
    <section className="bg-white sm:bg-gray-100 md:bg-gray-100 mt-[10%]">
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl bg-white rounded-lg shadow-md p-6">
          <Link to={'/wishlist'}>
          <header className="text-center mb-8">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
             See Your Wishlist Page
            </h1>
            <MdFavorite className="text-center" size={25} />
            <p className="text-xl mt-2 dark:text-gray-800">
              click any of the above book heart button to add to favorites and
              click the image to see more details and make a review
            </p>
          </header>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WishlistLink;
