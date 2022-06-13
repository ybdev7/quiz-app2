import React, { useContext, useState } from "react";
function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-violet-200 p-6">
        <div className="flex items-center flex-shrink-0 text-violet-700 mr-6">
          <span className=" text-[36px] font-['Papyrus'] tracking-tight">
            <span className="italic font-bold">EZ</span>ie
            <span className="italic font-bold">Q</span>uizzies
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-violet-700 hover:text-violet-400 mr-4"
            >
              Quizzes
            </a>
            <a
              href="/about"
              className="block mt-4 lg:inline-block lg:mt-0 text-violet-700 hover:text-violet-400 mr-4"
            >
              About
            </a>
          </div>
          <div>
            <a
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-violet-700 border-violet-700 
              hover:border-transparent hover:text-violet-900 hover:bg-violet-100 mt-4 lg:mt-0"
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
