import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

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
        console.log(res)
        localStorage.setItem("token", res.data.token);
        localStorage.setItem('id', res.data.user.user_id)
        props.history.push("/profile");
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", flexDirection: "column" }}>
    <h2 style={{ fontSize: "3rem" }}>
        Welcome back!
  </h2>
    <form style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", width: "40%", height: '30%', backgroundColor: "", padding: "2%" }} onSubmit={login}>
        <input
        style={{fontSize:"2.5rem"}}
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
        />
        <input style={{fontSize:"2.5rem"}}
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
        />
        <button style={{fontSize:"2.5rem", width:'60%', marginLeft: "20%"}} type="submit">Login</button>

        <Link
            style={{
                textDecoration: "none",
                color: "#FE0707",
                fontSize: "2rem",
                fontWeight: "bold"
            }}
            to="/register"
        >
            No account yet?
    </Link>
    </form>
</div>
  );
};

export default Login;