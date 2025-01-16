import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOutUser()
      .then(() => {
        // Sign-out successful.
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logout Successful',
          text: 'You have successfully logged out of your account.',
          showConfirmButton: false,
          timer: 2000,
        });

        navigate('/login');
      })
      .catch(error => {
        // An error happened.
        console.error(error);
      });
  };
  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user && user.photoURL ? (
                <img src={user.photoURL} alt="" />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to="/updateUserProfile">Profile</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={() => handleLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
