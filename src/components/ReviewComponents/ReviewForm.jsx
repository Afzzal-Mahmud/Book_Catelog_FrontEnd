/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePostBookReviewMutation } from "../../Redux/api/apiSlice";
import Swal from "sweetalert2"
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function ReviewForm({ idOfBook }) {
  const navigate = useNavigate()
  const { userStatus } = useSelector((state) => state.user)
  const [userReview, setUserReview] = useState({
    email: '',
    message: ''
  })
  const [postBookReview, { isError, isSuccess, isLoading }] = usePostBookReviewMutation()

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    Swal.fire(
      "Good job",
      "Your review added successfully",
      "success"
    );
  }

  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops",
      text: "An error occared while posting the review",
      footer: "Try again later or check your network connection",
    });
  }

  const onSubmitReview = async () => {
    try {
      const reviewOptions = await {
        id: idOfBook,
        data: { review: [userReview.message] }
      }
      await postBookReview(reviewOptions)
    } catch (error) {
      console.log(error)
    } finally {
      setUserReview({})
    }
  };
  return (
    <section>
      <div className="bg-black text-white py-10 mt-10">
        <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-12">
          <div className="flex flex-col w-full lg:w-1/3 p-8">
            <p className="ml-6 text-yellow-300 text-lg uppercase tracking-loose">
              REVIEW
            </p>
            <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">
              Leave us a feedback!
            </p>
            <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
              Please provide your valuable book review and your opinion
            </p>
          </div>
          <div className="flex flex-col w-full lg:w-2/3 justify-center">
            <div className="container w-full px-4">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                    <div className="flex-auto p-5 lg:p-10">
                      <h4 className="text-2xl mb-4 text-black font-semibold">
                        Write Review about this book

                      </h4>
                      <div
                        id="feedbackForm"
                      >
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={userReview.email ?? ""}
                            onChange={(e) => setUserReview({ ...userReview, email: e.target.value })}
                            className="border-0 px-3 py-3 rounded text-sm shadow w-full
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                            placeholder="example@gmail.com"
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Message
                          </label>
                          <textarea
                            value={userReview.message ?? ""}
                            onChange={(e) => setUserReview({ ...userReview, message: e.target.value })}
                            name="message"
                            id="message"
                            rows="4"
                            cols="80"
                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                          ></textarea>
                        </div>
                        <div className="text-center mt-6">
                          {userStatus ?
                            <button
                              onClick={onSubmitReview}
                              id="feedbackBtn"
                              className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="submit"
                            >
                              Submit
                            </button>
                            :
                            <button
                              onClick={() => navigate('/login')}
                              id="feedbackBtn"
                              className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="submit"
                            >
                              Submit
                            </button>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;
