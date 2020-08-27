import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function CreateAccount(props) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleSubmit = e => {
        e.preventDefault();
        axios.post('https://salty-peak-24943.herokuapp.com/api/register', form)
        .then(res => {
            console.log(res)
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('token', res.data.token)
            props.history.push("/profile");
        })
        .catch(err => {
            console.log(err)
        })
    };
    const handleChanges = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", flexDirection: "column" }}>
            <h2 style={{ fontSize: "3rem" }}>
                Join the fun!
          </h2>
            <form style={{ display: 'flex', flexDirection: "column", justifyContent: "space-between", width: "40%", height: '30%', backgroundColor: "", padding: "2%" }} onSubmit={handleSubmit}>
                <input
                style={{fontSize:"2.5rem"}}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChanges}
                />
                <input style={{fontSize:"2.5rem"}}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChanges}
                />
                <button style={{fontSize:"2.5rem", width:'60%', marginLeft: "20%"}} type="submit">Sign Up</button>

                <Link
                    style={{
                        textDecoration: "none",
                        color: "#FE0707",
                        fontSize: "2rem",
                        fontWeight: "bold"
                    }}
                    to="/login"
                >
                    Already have an Account?
            </Link>
            </form>
        </div>

    );
};
