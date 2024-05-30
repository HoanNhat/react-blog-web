import React, { useState, useContext, useEffect } from "react";
import { FiAlignJustify, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../Context";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "", title: "Home" },
    { path: "/my-blog", title: "My blog" },
    { path: "/about", title: "About" },
  ];

  return (
    <header className=" max-w-screen-2xl container mx-auto xl:px-24 px-4 pt-8">
      <nav className="flex justify-between items-center py-2">
        <span className="w-36"></span>
        <ul className="hidden md:flex gap-20 font-semibold text-xl">
          {navItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`space-x-5 hidden ${user ? "lg:hidden" : "lg:block"}`}>
          <Link className="py-2 px-5 border text-xl rounded" to="/login">
            Log in
          </Link>
          <Link
            className="py-2 px-5 border rounded text-xl bg-blue-600 text-white"
            to="/sign-up"
          >
            Sign up
          </Link>
        </div>

        <div
          className={`py-2 px-5 rounded text-xl font-medium ${
            user ? "lg:block" : "lg:hidden"
          }`}
        >
          Welcome, {user ? user.fullName : ""}
        </div>

        <div className="md:hidden block ml-40">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiAlignJustify className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="md:hidden block"></div>
      </nav>

      <div
        className={`bg-gray-400 px-4 py-5 grid place-items-center ${
          isMenuOpen ? "" : "hidden"
        } `}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="pb-2 font-semibold text-xl text-center">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className=" text-center font-semibold text-xl">
            <Link
              className="text-white text-center font-semibold text-xl"
              to="/login"
            >
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
