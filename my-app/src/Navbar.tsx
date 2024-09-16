import { NavLink } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink className="navbar-item" to="/">
        Home
      </NavLink>

      <NavLink className="navbar-item" to="/session1">
        Session1
      </NavLink>

      <NavLink className="navbar-item" to="/session2">
        Session2
      </NavLink>

      <NavLink className="navbar-item" to="/session3">
        Session3
      </NavLink>
    </div>
  );
};

export default NavBar;
