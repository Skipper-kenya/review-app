import React, { useContext } from "react";
import { globalContext } from "../context/generalContext";
import "./navbar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { SignOut, UserCircle } from "phosphor-react";
import { toast } from "sonner";

const Navbar = () => {
  const { setCookie, isUserLoggedIn, cookie } = useContext(globalContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    setCookie("access_token", "");
    toast.info("successful signout");
  };

  return (
    <nav>
      <div className="label">
        <h3 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          rastaTech
        </h3>
      </div>
      <div className="link">
        {/* isUserLoggedIn()  */}
        {cookie.access_token && cookie.access_token !== "undefined" ? (
          <>
            <h4 onClick={logoutHandler}>
              <SignOut size={15} /> Logout
            </h4>
          </>
        ) : (
          <>
            <NavLink to={"/login"} className="li">
              {" "}
              <UserCircle size={20} />
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
