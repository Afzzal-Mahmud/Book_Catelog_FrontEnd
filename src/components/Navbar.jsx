import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { setUser } from "../Redux/userAuth/userAuthSlice"
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

      {/* login/register button */}
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
