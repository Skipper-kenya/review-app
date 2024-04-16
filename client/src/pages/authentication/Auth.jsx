import { UserCircle } from "phosphor-react";
import React, { useContext } from "react";
import "./auth.css";

import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../context/generalContext";

import cancel from "../../assets/cancel.png";

const Auth = ({ name, btnName, u, p, su, sp, handleSubmit, loading }) => {
  const { cookie } = useContext(globalContext);
  const navigate = useNavigate();

  return (
    <>
      {cookie.access_token && cookie.access_token !== "undefined" ? (
        <div className="illust-wrapper">
          <h3>bad request:Already signed in, logout first.</h3>
          <button onClick={() => navigate("/")}>dashboard</button>
          <img src={cancel} alt="Bad request illust" />
        </div>
      ) : (
        <div className="auth-wrapper">
          <h3>{name} page</h3>
          <form>
            <div className="top-wel" style={{ fontFamily: "arial" }}>
              <h4>{name}</h4>
              <UserCircle size={30} color="coral" />
            </div>
            <div className="auth">
              <div className="mini-auth">
                <label htmlFor="username">Username</label>
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="your username"
                  value={u}
                  onChange={(e) => su(e.target.value)}
                />
              </div>
              <div className="mini-auth">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="your password"
                  value={p}
                  onChange={(e) => sp(e.target.value)}
                />
              </div>

              <button onClick={handleSubmit}>{btnName}</button>
              <p>
                {name === "signin" ? (
                  <>
                    Don't have an account?{" "}
                    <Link to={"/register"}>Register</Link>
                  </>
                ) : (
                  <>
                    Already have an account? <Link to={"/login"}>Login</Link>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Auth;
9;
