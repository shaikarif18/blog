import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyProfile.css"; // Import the CSS file

const MyProfile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userEmail = sessionStorage.getItem('email');
    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/profile', { userEmail });
        setUserData(response.data.data);
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <table className="profile-table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{userData.userDetails && userData.userDetails.Name}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{userData.userDetails && userData.userDetails.email}</td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td>{userData.userDetails && userData.userDetails.phone}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default MyProfile;
