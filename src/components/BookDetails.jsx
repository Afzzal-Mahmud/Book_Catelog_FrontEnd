import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Review from "./Review";
import { useGetBookDetailsQuery } from "../Redux/book/bookDetailsSlice";

function BookDetails() {
  const { bookId } = useParams();
  /* it is not recommended to request if any data is could get from the store but I am doing this as part of my project requirment need using Rtk Query */
  const { data: filteredSingleBook } = useGetBookDetailsQuery(bookId);
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl sm:flex-row">
          <img
            className="h-96 w-full rounded-t-lg object-cover sm:h-auto md:!rounded-none md:!rounded-l-lg"
            src={filteredSingleBook?.data?.image}
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="text-xxl font-medium text-neutral-800 dark:text-neutral-50">
              {filteredSingleBook?.data?.title}
            </h5>
            <h1 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {filteredSingleBook?.data?.author}
            </h1>

            <div className="flex justify-between mb-3">
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                {filteredSingleBook?.data?.genre}
              </p>
              <p className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-300">
                Price {filteredSingleBook?.data?.price}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                Publication Year {filteredSingleBook?.data?.publicationYear}
              </p>
            </div>

            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {filteredSingleBook?.data?.details}
            </p>
          </div>
        </div>
      </div>
      <Review />
      <ReviewForm />
    </>
  );
}

export default BookDetails;
