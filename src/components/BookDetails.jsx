import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { bookId } = useParams();

  const [books, setbooks] = useState([]);

  useEffect(() => {
    fetch("https://book-catalouge.vercel.app/api/v1/books")
      .then((Response) => Response.json())
      .then((book) => setbooks(book.data));
  }, []);

  const filteredSingleBook = books?.find(
    (singleBook) => singleBook._id === bookId
  );
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl sm:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover sm:h-auto md:!rounded-none md:!rounded-l-lg"
          src={filteredSingleBook?.image}
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="text-xxl font-medium text-neutral-800 dark:text-neutral-50">
            {filteredSingleBook?.title}
          </h5>
          <h1 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
            {filteredSingleBook?.author}
          </h1>

          <div className="flex justify-between mb-3">
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              {filteredSingleBook?.genre}
            </p>
            <p className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-300">
             Price {filteredSingleBook?.price}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              Publication Year {filteredSingleBook?.publicationYear}
            </p>
          </div>

          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            {filteredSingleBook?.details}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
