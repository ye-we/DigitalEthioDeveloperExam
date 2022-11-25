import { React, useState } from "react";
import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../assets/constants";

const NavLinks = ({ mobileMenuOpen, handleClick }) => (
  <div className="mt-10">
    {sidebarLinks.map((item) => (
      <NavLink
        key={item.title}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium"
        // onClick={() => handleClick && handleClick()}
      >
        {/* <item.icon className="w-6 h-6 mr-2" /> */}
        {item.title}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] items-center justify-center py-10 px-4  h-[100vh] border-r-2 bg-neutral-100">
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
