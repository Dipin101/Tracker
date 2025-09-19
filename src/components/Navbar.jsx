import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar flex justify-between items-center text-sm bg-gray-800 text-white px-4 py-2 w-full">
        <div className="navbar-left flex items-start gap-x-4">
          <NavLink to="/home">OneApp</NavLink>
        </div>
        <div className="navbar-center ">
          <ul className="nav-links flex justify-center items-center gap-x-4">
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-right flex justify-end items-end gap-x-4">
          <NavLink
            to="/signup"
            className="signup bg-green-400 text-white px-3 py-1 rounded transition-transform duration-150 active:scale-95 hover:bg-green-500"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/signin"
            className="signin  bg-green-400 text-white px-3 py-1 rounded transition-transform duration-150 active:scale-95 hover:bg-green-500"
          >
            Sign In
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
