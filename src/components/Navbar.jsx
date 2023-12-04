import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/about"}>About</NavLink>
      <NavLink to={"/tesla-cars"}>Tesla Cars</NavLink>
      <NavLink to={"/tesla-cars/create-new"}>Create New</NavLink>
    </nav>
  );
};
