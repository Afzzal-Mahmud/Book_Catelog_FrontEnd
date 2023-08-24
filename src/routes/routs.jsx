import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import BookDetails from '../components/BookDetails';
import Hero from '../pages/Hero';
import NotFound from '../components/NotFound';
import LogIn from '../components/logIn';
import Register from '../components/Register';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Hero />,
      },
      {
        path: '/login',
        element: <LogIn/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/book-details/:bookId',
        element: <BookDetails/>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound/>,
  },
]);

export default routes;
