import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function CreateAccount() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });


    const handleSubmit = e => {
        e.preventDefault();

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
