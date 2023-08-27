import {useNavigate} from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";

import { Link } from "react-router-dom";
import {SwitchTabs} from './SwitchTabs/SwitchTabs'
const Navbar = () => {

  const navigateTo = useNavigate()
    const onTabChange = (tab) =>{
      if(tab==='login'){
          navigateTo('/login')
      }else{
        navigateTo('/register')
      }
  }
  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
      {/* Left side */}
      <div className="flex items-center">
        <Link to={'/'}>
          <h1 className="text-xl sm:text-3xl lg:text-4xl px-2">
          Gray <span className="font-bold">Books</span>
        </h1></Link>
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
      {/* login/register button */}
      <SwitchTabs data={["login","register"]} onTabChange={onTabChange}/>
    </div>
  );
};

export default Navbar;
