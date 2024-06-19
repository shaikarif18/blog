import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { IoLogInOutline } from "react-icons/io5";
import { FaPenAlt } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userName = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Make a POST request to the backend to clear the session or token
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Handle successful logout (e.g., clear session storage, redirect)
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    })
    .catch(error => {
      console.error('Error logging out:', error);
      // Handle error
    });
  };

  return (
    <>
      <ul className="navbar">
        <li className="logo" style={{ display: "flex", alignItems: "center" }}>
          <FaPenAlt
            size={40}
            style={{ marginBottom: "5px", marginRight: "5px" }}
          />
          Blog
        </li>
        <li>
          <Link to="/home">
            <BiHomeAlt2 />
            Home
          </Link>
        </li>
        <li>
          <Link to="/login">
            <IoLogInOutline />
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li className="dropdown">
          <button
            className="dropbtn"
            style={{ display: "flex", alignItems: "center" }}
          >
            <VscAccount size={25} style={{ marginRight: "5px" }} />
            My Account
          </button>
          <div className="dropdown-content">
            <Link to="/myProfile">My Profile</Link>
            <Link to="/myarticles">My Articles</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </li>
        <li className="username">{userName}</li>
      </ul>
    </>
  );
};

export default Navbar;
