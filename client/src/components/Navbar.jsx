import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

const Navbar = () => {
  const {user} = useAuth();
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);
  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <details>
          <summary>
            <NavLink to="/products">Products</NavLink>
          </summary>
          <ul className="p-2">
            <li>
              <NavLink to="/products">All</NavLink>
            </li>
            <li>
              <NavLink to="/man">Man</NavLink>
            </li>
            <li>
              <NavLink to="/man">Woman</NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to='/login' className=" flex md:hidden bg-base-100 text-base font-bold">
          Login
        </Link>
      </li>
    </>
  );

  return (
    <div className="section-container fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50">
      <div
        className={`navbar w-full ${
          isSticky
            ? 'shadow-sm bg-base-300 transition-all ease-in-out duration-300'
            : ''
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown hidden md:flex">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="font-bold bebas-neue-regular text-xl">
            Fashion
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end text-5xl">
          <div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <Link to="/cart" className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">8</span>
              </Link>
            </div>
          </div>
          {
            user? <Profile></Profile> : <Link to='/login' className="btn btn-ghost text-base hidden md:flex font-bold">
            Login
          </Link>
          }
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content right-1 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
