import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./auth.css";
import Auth from "./Auth";

import { globalContext } from "../../context/generalContext";

const Login = () => {
  const { setCookie, id } = useContext(globalContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return toast.info("Ensure all fields are filled");
    }
    try {
      const response = await axios.post(process.env.REACT_APP_SIGNIN, {
        username,
        password,
      });
      const { message, token, success, userId } = response.data;

      if (success) {
        setCookie("access_token", token, { maxAge: 10800 });
        localStorage.setItem("userId", userId);
        navigate("/");
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Auth
        handleSubmit={handleSubmit}
        name="signin"
        btnName="Login"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
        loading={loading}
      />
    </>
  );
};

export default Login;
