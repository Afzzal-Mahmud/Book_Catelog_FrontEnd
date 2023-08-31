import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import {setUser} from "../Redux/userAuth/userAuthSlice"
import { SwitchTabs } from "./SwitchTabs/SwitchTabs";
const Navbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const auth = getAuth();
  const { user } = useSelector((state) => state.user);
  const onTabChange = (tab) => {
    if (tab === "login") {
      navigateTo("/login");
    } else {
      navigateTo("/register");
    }
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null))
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      {/* Left side */}
      <div className="flex items-center">
        <Link to={"/"}>
          <h1 className="text-xl sm:text-3xl lg:text-4xl px-2">
            Gray <span className="font-bold">Books</span>
          </h1>
        </Link>
      </div>

      {/* Search Input */}
      <div className="hidden bg-gray-200 rounded-full md:flex lg:flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch size={25} />
        <input
          className="bg-transparent p-2 w-full focus:outline-none"
          type="text"
          placeholder="Search Books"
        />
        {/* Logout Button */}
        {/* login/register button */}
      </div>
      {user.email ? (
        <button
          onClick={handleLogout}
          className="bg-black text-white flex items-center py-1 rounded-full"
        >
          Log Out
        </button>
      ) : (
        <SwitchTabs data={["login", "register"]} onTabChange={onTabChange} />
      )}
    </div>
  );
};

export default Navbar;
