import { useForm } from "react-hook-form";
import { createUser } from "../../Redux/userAuth/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function Register() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { error: firebaseError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitAction = async (data) => {
    try {
      if (firebaseError) {
        await Swal.fire({
          icon: "error",
          title: "Oops",
          text: "This email already in use",
          footer: "Use another email or log by clicking the login button",
        });
        return;
      }
      await dispatch(createUser({ email: data.mail, password: data.password }));
      Swal.fire(
        "Good job",
        "Your account has been created successfully",
        "success"
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-center mx-auto"></div>

      <form onSubmit={handleSubmit(submitAction)} className="mt-6">
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            {...register("mail", { required: "Email Address is required" })}
            aria-invalid={errors.mail ? "true" : "false"}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {errors.mail && <p role="alert">{errors.mail?.message}</p>}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm text-gray-800 dark:text-gray-200">
              Password
            </label>
            <a
              href="#"
              className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
            >
              Forget Password?
            </a>
          </div>

          <input
            {...register("password", {
              required: "Minimum 6 digit of password is required",
              minLength: 6,
            })}
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          {errors.password && <p role="alert">{errors.password?.message}</p>}
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-800 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Register Account
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a
          href="#"
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or login with Social Media
        </a>

        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <button
          type="button"
          className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-800 focus:bg-blue-400 focus:outline-none"
        >
          <span className="mx-2 sm:inline">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Register;
