import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from "react-type-animation";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[430px] h-11 lg:h-12 rounded-md border border-neutral-200 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-amber-500">
      {/* Search Icon */}
      <button className="flex justify-center items-center h-full p-3 group-focus-within:text-amber-400">
        <IoSearch size={23} />
      </button>

      <div className="w-full h-full">
        {/* not in search page */}
        {!isSearchPage ? (
          <button
            onClick={redirectToSearchPage}
            className="w-full h-full text-left px-2 truncate bg-transparent outline-none cursor-text"
          >
            <TypeAnimation
              sequence={[
                "Search 'Milk Plushies'",
                1000,
                "Search 'Food Items'",
                1000,
                "Search 'Cute Chocolate Boxes'",
                1000,
                "Search 'Strawberry Bags'",
                1000,
                "Search 'Kawaii Toys'",
                1000,
                "Search 'Miniature Milk Bottles'",
                1000,
                "Search 'Bunny Keychains'",
                1000,
                "Search 'Candy Pouches'",
                1000,
              ]}
              wrapper="span"
              speed={60}
              repeat={Infinity}
              className="inline-block text-sm text-neutral-500"
            />
          </button>
        ) : (
          // Real input field on search page
          <input
            type="text"
            autoFocus
            placeholder="Search for products, brands & more"
            className="bg-transparent w-full h-full px-2 outline-none text-sm text-neutral-700"
          />
        )}
      </div>
    </div>
  );
};

export default Search;
