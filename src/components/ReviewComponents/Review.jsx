/* eslint-disable react/prop-types */
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useGetBookReviewQuery } from "../../Redux/api/apiSlice";

function Review({ idOfBook }) {
  const { data: matchedBook } = useGetBookReviewQuery(idOfBook);
  return (
    <div className="my-12 mx-8 md:mx-[8rem] max-w-screen-lg">
      <article>
        <div className="flex items-center mb-4 space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src="https://miro.medium.com/v2/resize:fill:44:44/2*3Wf4WhFJaTBbeObzpq1JIQ.png"
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white">
            <p>
              Jese Leos{" "}
              <time className="block text-sm text-gray-500 dark:text-gray-400">
                Joined on August 2014
              </time>
            </p>
          </div>
        </div>
        <div className="flex items-center mb-1">
          <BsStarFill className="text-yellow-300" />
          <BsStarFill className="text-yellow-300" />
          <BsStarFill className="text-yellow-300" />
          <BsStarFill className="text-yellow-300" />
          <BsStarHalf className="text-yellow-300" />

          <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
            Thinking to buy another one!
          </h3>
        </div>
        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed in the United Kingdom on <time>March 3, 2017</time>
          </p>
        </footer>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          This is my third time watching their book list one by one. They are
          just fantastic value for money. This one arrived yesterday and the
          first thing I did was set the time, popped on an identical strap from
          another Invicta and went in the shower with it to test the
          waterproofing.... No problems.
        </p>
        <a
          href="#"
          className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Read more
        </a>
        <aside>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            19 people found this helpful
          </p>
          <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a
              href="#"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Helpful
            </a>
            <a
              href="#"
              className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Report abuse
            </a>
          </div>
        </aside>
      </article>
      {matchedBook?.data?.review?.map((eachReview, index) => (
        <article className="mt-12" key={index}>
          <div className="flex items-center mb-4 space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src="https://miro.medium.com/v2/resize:fill:44:44/2*3Wf4WhFJaTBbeObzpq1JIQ.png"
              alt=""
            />
            <div className="space-y-1 font-medium dark:text-white">
              <p>
                Jese Leos{" "}
                <time className="block text-sm text-gray-500 dark:text-gray-400">
                  Joined on August 2014
                </time>
              </p>
            </div>
          </div>
          <div className="flex items-center mb-1">
            <BsStarFill className="text-yellow-300" />
            <BsStarFill className="text-yellow-300" />
            <BsStarFill className="text-yellow-300" />
            <BsStarFill className="text-yellow-300" />
            <BsStarHalf className="text-yellow-300" />

            <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
              Thinking to buy another one!
            </h3>
          </div>
          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Reviewed in the United Kingdom on <time>March 3, 2017</time>
            </p>
          </footer>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {eachReview}
          </p>
          <a
            href="#"
            className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read more
          </a>
          <aside>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              19 people found this helpful
            </p>
            <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
              <a
                href="#"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Helpful
              </a>
              <a
                href="#"
                className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Report abuse
              </a>
            </div>
          </aside>
        </article>
      ))
      }
    </div>
  );
}

export default Review;
