import { Link, Outlet } from "react-router-dom";
import { MdDashboard, MdDashboardCustomize } from 'react-icons/md';
import { FaEdit, FaLocationArrow, FaPlusCircle, FaQuestionCircle, FaShoppingBag, FaUsers } from "react-icons/fa";
import Login from './../pages/Login/Login';
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/dashboard">
        <MdDashboard /> Dashboard
      </Link>
    </li>
    <li>
      <Link to="/product">
        <FaShoppingBag></FaShoppingBag> Product
      </Link>
    </li>
    <li>
      <Link to="/product">
        <FaLocationArrow></FaLocationArrow> Order Tracking
      </Link>
    </li>
    <li>
      <Link to="/product">
        <FaQuestionCircle></FaQuestionCircle> Customer Support
      </Link>
    </li>
  </>
);
const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  if (isAdminLoading) {
    return <p>Loading</p>
  }
    return (
      <div>
        {isAdmin ? (
          <div>
            <div className="drawer lg:drawer-open">
              <input
                id="my-drawer-2"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-2"
                  className="btn btn-primary drawer-button lg:hidden"
                >
                  <MdDashboardCustomize></MdDashboardCustomize>
                </label>
                <button className="btn rounded-full px-6 bg-green-500   text-white sm:hidden">
                  Logout
                </button>
                <div className="mt-5 md:mt-2 mx-4">
                  <Outlet></Outlet>
                </div>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-2"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <Link to="/dashboard" className="flex justify-start mb-3">
                      <h2>Logo</h2>
                      <span className="badge badge-primary">admin</span>
                    </Link>
                  </li>
                  <hr />
                  <li className="mt-3">
                    <Link to="/dashboard">
                      <MdDashboard /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <FaShoppingBag /> Manage Bookings
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <FaPlusCircle /> Add Product
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <FaEdit /> Manage Items
                    </Link>
                  </li>
                  <li className="mb-3">
                    <Link to="/dashboard/users">
                      <FaUsers /> All Users
                    </Link>
                  </li>
                  <hr />
                  {/* shared nav links */}
                  {sharedLinks}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Login></Login>
        )}
      </div>
    );
};

export default DashboardLayout;