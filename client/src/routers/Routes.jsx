import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home/Home';
import Main from '../layouts/Main';
import Products from '../pages/Products/Products/Products';
import Cart from '../pages/Products/Cart/Cart';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import UpdateUserProfile from '../components/UpdateUserProfile';
const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/products',
        element: <Products></Products>,
      },
      {
        path: '/cart',
        element: <Cart></Cart>,
      },
    ],
  },
  {
    path: '/signUp',
    element: <SignUp></SignUp>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/updateUserProfile',
    element: <UpdateUserProfile></UpdateUserProfile>
  }
]);

export default Routes;
