import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import {BiEdit,BiSolidBookmarkAltPlus} from "react-icons/bi"
import {AiOutlineMenu,AiOutlineClose,AiFillHeart} from "react-icons/ai"
import { Link } from "react-router-dom";
import { setUser } from "../Redux/userAuth/userAuthSlice"
import { SwitchTabs } from "./SwitchTabs/SwitchTabs";
import { useState } from "react";
const Navbar = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch()
  const [nav,setNav] = useState(false)
  const auth = getAuth();
  const { user } = useSelector((state) => state.user);
  const onTabChange = (tab) => {
    if (tab === "login") {
      navigateTo("/login");
    } else {
      navigateTo("/register");
    }
  };
  const onNavigateTo = async(navigationLink) => {
   await navigateTo(`/${navigationLink}`)
   await setNav(!nav)
  }
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
      <div onClick={()=> setNav(!nav)} className='cursor-pointer md:hidden'>
          <AiOutlineMenu size={30} />
        </div>
        <Link to={"/"}>
          <h1 className="text-xl sm:text-3xl lg:text-4xl px-2">
            Gray <span className="font-bold">Books</span>
          </h1>
        </Link>
        <div className='hidden md:flex items-centers p-1 text-[16px]'>
          <Link to={'/wishlist'} className='pt-[12px] px-3 font-bold flex'><AiFillHeart size={25} className="mr-2"/>Wishlist</Link>
          <Link to={'/addbook'} className='pt-[12px] px-3 font-bold flex'><BiSolidBookmarkAltPlus size={25} className="mr-2"/>Add New Book</Link>
          <Link to={'/editbook'} className='pt-[12px] px-3 font-bold flex'><BiEdit size={25} className="mr-3"/>Edit Book</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      

      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
        <AiOutlineClose
          onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 mt-2 cursor-pointer'
        />
        <h2 className='text-2xl p-4 mt-2'>
          Gray <span className='font-bold'>Books</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                
                <li onClick={()=>onNavigateTo('wishlist')} className='text-xl py-4 flex'><AiFillHeart size={25} className='mr-4' />Wishlist</li>
                
                <li onClick={()=>onNavigateTo('addbook')} className='text-xl py-4 flex'><BiSolidBookmarkAltPlus size={25} className='mr-4' />Add new Book</li>
                
                <li onClick={()=>onNavigateTo('editbook')} className='text-xl py-4 flex'><BiEdit size={25} className='mr-4' />Edit Book</li>    
                
            </ul>
        </nav>
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
