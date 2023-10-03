import axios from "axios";
import Swal from "sweetalert2"
import Spinner from "../Spinner/Spinner";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import validateLogin from "../../helper/validateLogin";
import { useDispatch } from "react-redux";
import { setUserStatus } from "../../Redux/userAuth/userAuthSlice";
function LogIn() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const from = location?.state?.from || '/'
  const [isLoading, setIsLoading] = useState(false)
  const [userErrors, setUserErrors] = useState({})

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  if (isLoading) {
    return <Spinner />
  }

  const onLogin = async () => {
    try {
      /* removing the error if user has previous error store in userErrors state */
      await setUserErrors({})
      /* checking the new input again and setting the eroors if requirment do not match again */
      const errors = validateLogin(user)
      await setUserErrors(errors)

      if (!Object.keys(errors).length) {
        setIsLoading(true)
        const response = await axios.post('http://localhost:5000/api/v1/auth/login', user, { withCredentials: true })
        const { accessToken } = await response.data.data
        const token = await `Bearer ${accessToken}`
        axios.defaults.headers.common['Authorization'] = token;
        if (response.data?.statusCode === 200) {
          await setIsLoading(false)
          Swal.fire(
            "Good job",
            "Loged In successfull",
            "success"
          );
          await dispatch(setUserStatus(true))
          navigate(from)
        }
      }
    } catch (error) {
      setIsLoading(false)
      await dispatch(setUserStatus(false))
      const errorData = await error
      if (errorData.response?.data?.statusCode === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "Password is incorrect",
          footer: "Try again",
        });
      } else if (errorData.response?.data?.statusCode === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "User not found",
          footer: "Register your account",
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: "An error occared while login",
          footer: "Make sure you have proper internet connection or try again",
        });
      }
    }
  }
  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-center mx-auto"></div>

      <div className="mt-6">
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            value={user.email ?? ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {userErrors.email && <p className="text-red-700">{userErrors.email}</p>}

        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm text-gray-800 dark:text-gray-200">
              Password
            </label>
            <a className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Forget Password?
            </a>
          </div>

          <input
            value={user.password ?? ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-gray-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {userErrors.password && <p className="text-red-700">{userErrors.password}</p>}

        </div>

        <div className="mt-6">
          <button
            onClick={onLogin}
            className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-800 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50">
            Log In
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <p
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or login with Social Media
        </p>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          type="button"
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:bg-gray-600 focus:outline-none"
        >
          <span className="mx-2 sm:inline">Sign in with Google</span>
        </button>
      </div>

      <p className="mt-8 text-xs font-light text-center text-gray-400">
        {" "}
        Do not have an account?{" "}
        <Link to={"/register"}>
          <p
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Create One
          </p>
        </Link>
      </p>
    </div>
  );
}

export default LogIn;
