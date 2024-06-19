import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === "verificationCode") {
      setVerificationCode(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };

  const resetPassword = () => {
    const data = { verificationCode, newPassword };
    axios
      .post("http://localhost:3000/resetpassword", data)
      .then((response) => {
        alert(response.data.message);
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <input
        type="text"
        placeholder="Verification Code"
        name="verificationCode"
        onChange={handleInput}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="New Password"
        name="newPassword"
        onChange={handleInput}
        autoComplete="off"
      />
      <button onClick={resetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
