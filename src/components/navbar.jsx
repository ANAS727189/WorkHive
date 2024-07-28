import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-950 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="text-amber-500 font-bold text-xl">
          <span>{"{"}</span>%<span className="text-white">Work</span>Hive%
          <span>{"}"}</span>
        </div>
        <button className="text-white bg-yellow-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1">
         <img src="/icons/github.png" alt = "Github logo" width = {25} height={25}/>
          <span className="font-bold px-3">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
