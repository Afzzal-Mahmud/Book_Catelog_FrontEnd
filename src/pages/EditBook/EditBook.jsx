import { useEffect, useState } from "react";
import axiosInstance from "../../interseptors/axios";
import UserBook from "../../components/cards/UserBook";
import Spinner from "../../components/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

export const EditBook = () => {
  const navigate = useNavigate()
  const [registeredBook, setRegisteredBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        await setIsLoading(true)
        const response = await axiosInstance.get('http://localhost:5000/api/v1/books/userbook');
        setRegisteredBook(response?.data?.data)
        await setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    })();
  }, []);

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="w-full">
      <div className="max-w-[1240px] mx-auto px-2 py-16">
        <h2 className="pb-4 mt-1">Your Added Book List</h2>
        <p className="text-xl tracking-widest text-[#51d4e5] mb-7">
          You Can Add Business,Comedy,Horror,Romance or Whatever you want
        </p>
        <div className={registeredBook?.length ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : ""}>
          {
            registeredBook?.length ? registeredBook?.map((product, index) => (
              <UserBook key={index} cardObject={product} />
            )) :
              <div>
                <h1 className="text-4xl">
                  Welcome! If you are seeing this page, it means you have not added any books to our website yet. If you have added a book, please wait patiently for the network request to complete.
                </h1>
                <br />
                <h2 className="text-5xl">Important Note:</h2>
                <br />
                <p className="text-xl">
                  Remember, you can only modify or delete the books you have added. You do not have permission to update or delete someone elses books.
                </p>
                <br />
                <button
                  onClick={() => navigate('/addbook')}
                  id="feedbackBtn"
                  className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                >
                  Add Book
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  )
}
