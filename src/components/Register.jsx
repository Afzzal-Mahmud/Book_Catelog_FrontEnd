import { useForm } from "react-hook-form";
function Register() {
  const { handleSubmit, register } = useForm();
  const submitAction = (data) => {
    console.log(data.name);
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
            {...register("name")}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
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
            {...register("password")}
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
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
