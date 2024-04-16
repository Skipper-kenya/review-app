import React, { useState } from "react";
import axios from "axios";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = ({ loading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(process.env.REACT_APP_REGISTER, {
        username,
        password,
      });

      const { message, success } = response.data;

      if (success) {
        navigate("/login");
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(`error:register-client:${error.message}`);
    }
  };

  return (
    <>
      <Auth
        handleSubmit={handleSubmit}
        name="signup"
        btnName="Create Account"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
        loading={loading}
      />
    </>
  );
};

export default Register;
