import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home/Home';
import Main from '../layouts/Main';
import Products from '../pages/Products/Products/Products';
import Cart from '../pages/Products/Cart/Cart';
import SignUp from '../pages/SignUp/SignUp';
import Login from '../pages/Login/Login';
import UpdateUserProfile from '../components/UpdateUserProfile';
import DashboardLayout from '../layouts/DashboardLayout';

import Users from '../pages/dashboard/admin/Users';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import AddMenu from '../pages/dashboard/admin/AddProduct';
import ManageItems from '../pages/dashboard/admin/ManageItems';
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
    element: <SignUp></SignUp>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/updateUserProfile',
    element: <UpdateUserProfile></UpdateUserProfile>,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '',
        element: <Dashboard></Dashboard>,
      },
      {
        path: 'users',
        element: <Users></Users>,
      },
      {
        path: 'addMenu',
        element: <AddMenu></AddMenu>,
      },
      {
        path: 'manageItems',
        element: <ManageItems></ManageItems>,
      },
    ],
  },
]);

export default Routes;
