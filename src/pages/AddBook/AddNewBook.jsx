import { useState } from 'react'
import Swal from "sweetalert2"
import BgImage from '../../assats/editBook.jpg'
import bookValidation from '../../helper/addBookValidation'
import { usePostBookMutation } from '../../Redux/api/apiSlice'
import Spinner from '../../components/Spinner/Spinner'
import { useNavigate } from 'react-router-dom'
function AddNewBook() {
    const navigate = useNavigate()
    const [newBookInfo, setNewBookInfo] = useState({
        title: '',
        author: '',
        genre: '',
        price: '',
        publicationYear: '',
        image: '',
        details: ''
    })

    const [postBook,{isLoading,isError,isSuccess,error,reset}] = usePostBookMutation()
    const [bookErrors, setBookErrors] = useState({})
    
    if(isLoading){
        return <Spinner/>
    }
    if(isError){
        Swal.fire({
            icon: "error",
            title: "Oops",
            text: "An error occared while posting the book",
            footer: "Try again later or check your network connection",
          });
          reset()
    }
    if(isSuccess){
        Swal.fire(
            "Good job",
            "Your book added successfully",
            "success"
          );
          reset()
          navigate('/editbook')
    }
    if(error){
        console.log(error)
        reset()
    }
    
    const handleAddBook = async () => {
        await setBookErrors({})
        const errors = bookValidation(newBookInfo)
        await setBookErrors(errors)
        if(!Object.keys(errors).length){
            await postBook(newBookInfo)
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
                            <h2 className="text-3xl mb-4">Register</h2>
                            <p className="mb-4">
                                Add a new Book to our list
                            </p>
                            <div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Book Title
                                    </label>
                                    <input
                                        value={newBookInfo.title ?? ''}
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, title: e.target.value })}
                                        type="text" placeholder="Title" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.title && <p className='text-red-700'>{bookErrors.title}</p>}
                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Author
                                    </label>
                                    <input
                                        value={newBookInfo.author ?? ''}
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, author: e.target.value })}
                                        type="text" placeholder="Author Name" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.author && <p className='text-red-700'>{bookErrors.author}</p>}
                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Genera
                                    </label>
                                    <select                                     
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, genre: e.target.value })}
                                        type="text" placeholder="Genra Name" className="border border-gray-400 py-1 px-2 w-full" >
                                            <option value='Comedy'>Comedy</option>
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
                                        value={newBookInfo.publicationYear ?? ''}
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, publicationYear: e.target.value })}
                                        type="text" placeholder="Publication Year" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.publicationYear && <p className='text-red-700'>{bookErrors.publicationYear}</p>}
                                </div>

                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Price
                                    </label>
                                    <input
                                        value={newBookInfo.price ?? ''}
                                        pattern="[0-9]*"
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, price: e.target.value })}
                                        type="text" placeholder="Price" className="border border-gray-400 py-1 px-2 w-full" />
                                    {bookErrors.price && <p className='text-red-700'>{bookErrors.price}</p>}
                                </div>

                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Image Url
                                    </label>

                                    <input
                                        value={newBookInfo.image}
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, image: e.target.value })}
                                        type="text" placeholder="Image Url" className="border border-gray-400 py-1 px-2 w-full" />

                                </div>
                                <div className="mt-5">
                                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                        Book Details
                                    </label>
                                    <textarea
                                        value={newBookInfo.details ?? ''}
                                        onChange={(e) => setNewBookInfo({ ...newBookInfo, details: e.target.value })}
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
                                        I accept the <a href="#" className="text-purple-500 font-semibold">Terms of Use</a> &  <a href="#" className="text-purple-500 font-semibold">Privacy Policy</a>
                                    </span>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={handleAddBook}
                                        className="w-full bg-purple-500 py-3 text-center text-white">Add Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNewBook