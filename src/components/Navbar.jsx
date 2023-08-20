import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      {/* Left side */}
      <div className="flex items-center">
        <div className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2">
          Gray <span className="font-bold">Books</span>
        </h1>
      </div>

      {/* Search Input */}
      <div className="hidden bg-gray-200 rounded-full md:flex lg:flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search Books"
        />
      </div>
      {/* Cart button */}
      <button className="bg-black text-white flex items-center py-2 rounded-full">
        Log In
      </button>
    </div>
  );
};

export default Navbar;
