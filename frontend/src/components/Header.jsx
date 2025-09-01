import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  // console.log("location:", location)
  // console.log("ismobile:", isMobile)

  const isSearchPage = location.pathname === "/search";
  // console.log(isSearchPage);
  return (
    <header className="lg:h-23 sticky top-0 600 z-50 lg:shadow-md mb-2">
      {/* Top Section */}
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-2 h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              width={120}
              height={60}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={110}
              height={60}
              alt="logo"
              className="lg:hidden"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/* User/Login Section */}
          <div className="flex items-center space-x-4 text-neutral-700">
            {/* Mobile user icon */}
            <button className="lg:hidden">
              <FaRegUser size={26} />
            </button>

            {/* Desktop login/cart */}
            <div className="hidden lg:flex space-x-4">
              <span className="cursor-pointer">Login</span>
              <span className="cursor-pointer">My Cart</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="block lg:hidden container mx-auto px-2 mt-2 pb-2">
        <Search />
      </div>
    </header>
  );
};

export default Header;


