import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const sendVerificationCode = () => {
    axios
      .post("http://localhost:3000/forgotpassword", { email })
      .then((response) => {
        alert(response.data.message);
        if (response.data.status) {
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={handleInput}
        autoComplete="off"
      />
      <button onClick={sendVerificationCode}>Send Verification Code</button>
    </div>
  );
};

export default ForgotPassword;
