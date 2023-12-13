import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/tesla-cars"}>Tesla Cars</NavLink>
        <NavLink to={"/tesla-cars/create-new"}>Create New</NavLink>
        <NavLink to={"/cityitems"}>City Codes</NavLink>
        <NavLink to={"/login"}>Log In</NavLink>
        <NavLink to={"/logout"}>Log Out</NavLink>
      </nav>
    </div>
  );
};
