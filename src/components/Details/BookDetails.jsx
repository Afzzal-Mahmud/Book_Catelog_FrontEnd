import { useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2"
import ReviewForm from "../ReviewComponents/ReviewForm";
import Review from "../ReviewComponents/Review";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { useDeleteBookMutation } from "../../Redux/api/apiSlice";
function BookDetails() {
  const { bookId } = useParams();
  const { userStatus } = useSelector((state) => state?.user);
  const [bookDetails, setBookDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteBook, { isLoading, isError, isSuccess, error, reset }] = useDeleteBookMutation()
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:5000/api/v1/books/${bookId}`);
        const data = await res.json();
        setBookDetails(data?.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error)
      }
    }
    fetchBookDetails()
  }, [bookId])

  if (isLoading) {
    return <Spinner />
  }

  if (loading) {
    return <Spinner />
  }

  if (isSuccess) {
    Swal.fire(
      "Humm!",
      "This Book Deleted successfully",
      "success"
    );
    reset()
  }

  if (isError) {
    if (error?.data?.statusCode === 404) {
      Swal.fire({
        icon: "error",
        title: "Opps! Unauthorized,You do not have the permission to delete someone else's book",
        text: "You can only delete the book you have added to our website",
        footer: "Either the book does not exist or you are unauthorized",
      });
      reset()
    } else if (error.data.statusCode === 403) {
      Swal.fire({
        icon: "error",
        title: "Oops Unauthenticated",
        text: "Make sure you are logged in",
        footer: "Or logout from the page and logged in again",
      });
      reset()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops",
        text: "An error occared while deleting",
        footer: "Make sure you have proper internet connection",
      });
      reset()
    }

  }
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })

      if (result.isConfirmed) {
        await deleteBook(id)
      }
    } catch (error) {
      console.log(error, 'under catch block')
    }
  }
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl sm:flex-row">
          <img
            className="h-96 w-full rounded-t-lg object-cover sm:h-auto md:!rounded-none md:!rounded-l-lg"
            src={bookDetails?.image}
            alt=""
          />
          <div className="flex flex-col justify-start p-6">
            <h5 className="text-xxl font-medium text-neutral-800 dark:text-neutral-50">
              {bookDetails?.title}
            </h5>
            <h1 className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {bookDetails?.author}
            </h1>

            <div className="flex justify-between mb-3">
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                {bookDetails?.genre}
              </p>
              <p className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-300">
                Price {bookDetails?.price}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                Publication Year {bookDetails?.publicationYear}
              </p>
            </div>

            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {bookDetails?.details}
            </p>

            {userStatus ?
              <span onClick={() => handleDelete(bookDetails?._id)} className="flex cursor-pointer">
                <AiFillDelete className="text-red-600 transition hover:text-red-800 mt-4" size={25} />
                <p className="mt-4">Delete Book</p>
              </span>
              : ''
            }
          </div>
        </div>
      </div>
      <Review idOfBook={bookId} />
      <ReviewForm idOfBook={bookId} />
    </>
  );
}

export default BookDetails;
