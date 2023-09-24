/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { usePostBookReviewMutation } from "../Redux/book/bookDetailsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
function ReviewForm({idOfBook}) {

  const {user} = useSelector((state) => state.user)
  const [postBookReview] = usePostBookReviewMutation()
  const { handleSubmit, register } = useForm();
  const handleReview = async(data) => {
    const reviewOptions = {
      id : idOfBook,
      data : {review : [data.message]}
    }
    await postBookReview(reviewOptions)
    await Swal.fire(
      "Good job",
      "Your review added successfully",
      "success"
    );
    // await window.location.reload()
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
                      <form
                        onSubmit={handleSubmit(handleReview)}
                        id="feedbackForm"
                      >
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Email
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            name="email"
                            id="email"
                            className="border-0 px-3 py-3 rounded text-sm shadow w-full
                    bg-gray-300 placeholder-black text-gray-800 outline-none focus:bg-gray-400"
                            placeholder=" "
                            required
                          />
                        </div>
                        <div className="relative w-full mb-3">
                          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                            Message
                          </label>
                          <textarea
                            {...register("message", {
                              required: "Minimum 120 carecter of message is required to submit",
                              minLength: 120,
                            })}
                            name="message"
                            id="message"
                            rows="4"
                            cols="80"
                            className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                            required
                          ></textarea>
                        </div>
                        <div className="text-center mt-6">
                          {user?.email ? 
                          <button
                            id="feedbackBtn"
                            className="bg-yellow-300 text-black text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1" 
                            type="submit"
                          >
                            Submit
                          </button> : <h2 className="text-black">To submit a review make sure you <Link style={{textDecoration:"underline"}} to={'/login'}>logIn</Link> first</h2>
                          }
                        </div>
                      </form>
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
