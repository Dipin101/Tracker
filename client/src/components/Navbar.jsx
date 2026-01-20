import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-3 w-full">
        {/* LEFT */}
        <div className="flex items-center">
          <NavLink
            to="/home"
            className="text-lg md:text-xl font-bold uppercase"
          >
            OneApp
          </NavLink>
        </div>

        {/* CENTER - desktop only */}
        <div className="md:flex">
          <ul className="flex items-center gap-x-8 text-3xl">
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

        {/* RIGHT */}
        <div className="flex items-center gap-x-3">
          <NavLink
            to="/signup"
            className="bg-green-500 px-3 py-1.5 rounded text-2xl md:text-2xl hover:bg-green-600 transition"
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/signin"
            className="bg-green-500 px-3 py-1.5 rounded text-2xl md:text-2xl hover:bg-green-600 transition"
          >
            Sign In
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
