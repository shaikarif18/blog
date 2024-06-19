// import React, { useState } from "react";
// import "./Login.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     if (e.target.name === "email") {
//       setEmail(e.target.value);
//     } else {
//       setPassword(e.target.value);
//     }
//   };

//   const getData = () => {
//     const data = { email, password };
//     axios
//       .post("http://localhost:3000/login", data)
//       .then((response) => {
//         if (response.data.status === false) {
//           alert(response.data.message);
//         } else {
//           sessionStorage.setItem("username", response.data.user);
//           sessionStorage.setItem("email", response.data.email);
//           sessionStorage.setItem("phone", response.data.phone);
//           // localStorage.setItem("token", response.data.token);
//           navigate("/home");
//           alert(response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <>
//       <div className="login">
//         <h1>Login</h1>
//         <input
//           type="text"
//           placeholder="Email"
//           name="email"
//           onChange={handleInput}
//           autoComplete="off"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           onChange={handleInput}
//           autoComplete="off"
//         />
//         <button onClick={getData}>Log in</button>
//       </div>
//     </>
//   );
// };

// export default Login;



import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const getData = () => {
    const data = { email, password };
    axios
      .post("http://localhost:3000/login", data)
      .then((response) => {
        if (response.data.status === false) {
          alert(response.data.message);
        } else {
          sessionStorage.setItem("username", response.data.user);
          sessionStorage.setItem("email", response.data.email);
          sessionStorage.setItem("phone", response.data.phone);
          navigate("/home");
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        name="email"
        onChange={handleInput}
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleInput}
        autoComplete="off"
      />
      <button onClick={getData}>Log in</button>
      <Link to="/forgotpassword">Forgot Password?</Link>
    </div>
  );
};

export default Login;
