import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";
import './Login.css'
const Login = props => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    let name = e.target.name;
    setCredentials({ ...credentials, [name]: e.target.value });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('id', res.data.user.user_id)
        props.history.push("/profile");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="LoginDiv">
    <h2 className="LoginTitle">
        Welcome back!
  </h2>
    <form className="LoginForm" onSubmit={login}>
        <input
            className="LoginInput"
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
        />
        <input 
            className="LoginInput"
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
        />
        <button className="LoginButton" type="submit">Login</button>

        <Link
            className="LoginLink"
            to="/register"
        >
            No account yet?
    </Link>
    </form>
</div>
  );
};

export default Login;