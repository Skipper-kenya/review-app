import React, { useState } from "react";
import axios from "axios";
import Auth from "./Auth";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = ({ loading, setLoading }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(process.env.REACT_APP_REGISTER, {
        username,
        password,
      });

      const { message, success } = response.data;
      setLoading(false);
      if (success) {
        navigate("/login");
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      setLoading(false);
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
    
      />
    </>
  );
};

export default Register;
