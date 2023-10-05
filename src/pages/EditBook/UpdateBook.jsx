import { useEffect, useState } from 'react'
import Swal from "sweetalert2"
import BgImage from '../../assats/editBook.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBookDetailsQuery } from '../../Redux/api/apiSlice'
import bookValidation from '../../helper/addBookValidation'
import Spinner from '../../components/Spinner/Spinner'
import { useUpdateBookMutation } from '../../Redux/api/apiSlice'
function UpdateBook() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { data: response } = useGetBookDetailsQuery(id)
    const [responseBookInfo, setRsponseBookInfo] = useState({})
    const [updatedBookInfo, setUpdatedBookInfo] = useState({
        title: responseBookInfo?.title,
        author: responseBookInfo?.author,
        genre: responseBookInfo?.genre,
        price: responseBookInfo?.price,
        publicationYear: responseBookInfo?.publicationYear,
        image: responseBookInfo?.image,
        details: responseBookInfo?.details
    })
    /* it contain the book-object by useGetBookDetailsQuery(id) using Redux */
    useEffect(() => {
        setRsponseBookInfo(response?.data)
    }, [response])
    /* it set the default object-data such as title,author etc whenever the response changes as object do not repeat the value */
    useEffect(() => {
        setUpdatedBookInfo(responseBookInfo)
    }, [responseBookInfo])
    const [updateBook, { isLoading, isError, isSuccess, error, reset }] = useUpdateBookMutation()
    /* it setting the error response based on validation form */
    const [bookErrors, setBookErrors] = useState({})
    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        if (error.data.statusCode === 404) {
            Swal.fire({
                icon: "error",
                title: "Oops Unauthorized",
                text: "You can only update the book you added only",
                footer: "Try updating your book from edit book page",
            });
            reset()
        } else if (error.data.statusCode === 403) {
            Swal.fire({
                icon: "error",
                title: "Oops Unauthenticated",
                text: "Log out and login again",
            });
            reset()
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops",
                text: "An error occared while updating the book",
                footer: "Try again later or check your network connection",
            });
            reset()
        }
    }
    if (isSuccess) {
        Swal.fire(
            "Good job",
            "Your book updated successfully",
            "success"
        );
        reset()
        navigate(`/book-details/${id}`)
    }
    if (error) {
        console.log(error)
    }

    const handleUpdateBook = async () => {
        await setBookErrors({})
        const errors = bookValidation(updatedBookInfo)
        await setBookErrors(errors)
        if (!Object.keys(errors).length) {
            const updateBookOptions = {
                id: id,
                /* sending the data as which needed to update */
                data: {
                    title: updatedBookInfo?.title,
                    author: updatedBookInfo?.author,
                    genre: updatedBookInfo?.genre,
                    price: updatedBookInfo?.price,
                    publicationYear: updatedBookInfo?.publicationYear,
                    image: updatedBookInfo?.image,
                    details: updatedBookInfo?.details
                }
            }
            await updateBook(updateBookOptions)
        }
    }
    return (
        <>
            <div className="min-h-screen py-40" style={{
                backgroundImage: `linear-gradient(115deg, #9F7AEA, #FEE2FE)`
            }}>
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center" style={{
                            backgroundImage: `url(${BgImage})`
                        }}>
                            <h1 className="text-white text-3xl mb-3">Welcome</h1>
                            <div>
                                <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" className="text-purple-500 font-semibold">Learn more</a></p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 py-16 px-12">
                            <h2 className="text-3xl mb-4">Update a Book</h2>
                            <p className="mb-4">
                                Update Your Existing Book
                            </p>
                            <div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Book Title
                                    </label>
                                    <input
                                        value={updatedBookInfo?.title ?? ''}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, title: e.target.value })}
                                        type="text" placeholder="Title" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.title && <p className='text-red-700'>{bookErrors.title}</p>}
                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Author
                                    </label>
                                    <input
                                        value={updatedBookInfo?.author ?? ''}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, author: e.target.value })}
                                        type="text" placeholder="Author Name" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.author && <p className='text-red-700'>{bookErrors.author}</p>}
                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Genera
                                    </label>
                                    <select
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, genre: e.target.value })}
                                        type="text" placeholder="Genra Name" className="border border-gray-400 py-1 px-2 w-full" >
                                        <option selected value='Comedy'>Comedy</option>
                                        <option value='Romance'>Romance</option>
                                        <option value='Business'>Business</option>
                                        <option value='Horror'>Horror</option>
                                    </select>
                                </div>

                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Publication Year
                                    </label>
                                    <input
                                        value={updatedBookInfo?.publicationYear ?? ''}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, publicationYear: e.target.value })}
                                        type="text" placeholder="Publication Year" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.publicationYear && <p className='text-red-700'>{bookErrors.publicationYear}</p>}
                                </div>

                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Price
                                    </label>
                                    <input
                                        value={updatedBookInfo?.price ?? ''}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, price: e.target.value })}
                                        type="text" placeholder="Price" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.price && <p className='text-red-700'>{bookErrors.price}</p>}
                                </div>

                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Image Url
                                    </label>

                                    <input
                                        value={updatedBookInfo?.image}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, image: e.target.value })}
                                        type="text" placeholder="Image Url" className="border border-gray-400 py-1 px-2 w-full" />

                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Book Details
                                    </label>
                                    <textarea
                                        value={updatedBookInfo?.details ?? ''}
                                        onChange={(e) => setUpdatedBookInfo({ ...updatedBookInfo, details: e.target.value })}
                                        name="details"
                                        id="details"
                                        rows="4"
                                        cols="80"
                                        className="border-0 px-3 py-3 bg-gray-300 placeholder-black text-gray-800 rounded text-sm shadow focus:outline-none w-full"
                                    ></textarea>
                                    {bookErrors.details && <p className='text-red-700'>{bookErrors.details}</p>}
                                </div>

                                <div className="mt-5">
                                    <span>
                                        I accept the <p className="text-purple-500 font-semibold">Terms of Use</p> &  <p className="text-purple-500 font-semibold">Privacy Policy</p>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={handleUpdateBook}
                                        className="w-full bg-purple-500 py-3 text-center text-white">Update Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBook