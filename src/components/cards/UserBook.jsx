/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UserBook = ({ cardObject }) => {
  return (
    <div className="relative flex items-center justify-center h-auto w-full shadow-xl shadow-gray-400 rounded-xl group hover:bg-gradient-to-r from-[#774874] to-[#91478d]">
      <img
        className="rounded-xl group-hover:opacity-10"
        src={cardObject?.image}
        alt="featured category image"
      />
      <div className="hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h3 className="text-2xl text-white tracking-wider text-center">
          {cardObject?.title}
        </h3>
        <p className="pb-4 pt-2 text-white text-center">
          {cardObject?.genre}
        </p>
        <div className="mb-3">
        <Link to={`/book-details/${cardObject._id}`} key={cardObject._id}>
          <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
            Detail
          </p>
        </Link>
        </div>
        <div>
        <Link to={`/update-book/${cardObject._id}`} onClick={() => console.log('clicked')}>
          <p className="text-center py-3 rounded-lg bg-white text-gray-700 font-bold text-lg cursor-pointer">
            Update Book
          </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default UserBook;
