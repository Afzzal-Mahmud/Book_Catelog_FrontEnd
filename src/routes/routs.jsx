import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookDetails from "../components/BookDetails";
import Hero from "../pages/Hero";
import NotFound from "../components/NotFound";
import WishList from "../pages/WishList/WishList";
import PrivateRoute from "./PrivateRoute";
import LogIn from "../components/Form/LogIn";
import Register from "../components/Form/Register";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <WishList />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book-details/:bookId",
        element: <BookDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
