import { useEffect, useState } from "react";

const Books = () => {
    const [books, setbooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/books")
    .then(Response => Response.json())
    .then(book => setbooks(book.data));
  }, []);
  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Books
      </h1>

      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Fliter Type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type : Genera</p>
          <div className="flex justfiy-between flex-wrap">
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              All
            </button>
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Romance
            </button>
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Horror
            </button>
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Comedy
            </button>
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Business
            </button>
          </div>
        </div>

        {/* Filter By Year */}
        <div>
          <p className="font-bold text-gray-700">Filter By Year</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              Before 1999
            </button>
            <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
              After 2000
            </button>
            
          </div>
        </div>
      </div>

      {/* Display books */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4">
        {books.map((singleBook, index) => (
          <div
            key={index}
            className="border shadow-lg rounded-lg hover:scale-105 duration-300"
          >
            <img
              src={singleBook.image}
              alt={singleBook.title}
              className="w-full h-[500px] sm:h-[300px] md:h-[380px] lg:h-[400px] object-cover rounded-t-lg"
            />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">{singleBook.title}</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  ${singleBook.price}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
