import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home/Home';
import Main from '../layouts/Main';
import Products from '../pages/Products/Products/Products';
import Cart from '../pages/Products/Cart/Cart';
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
]);

export default Routes;
