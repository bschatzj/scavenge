import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Register.css'
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
        <div className="RegisterDiv">
            <h2 className="RegisterTitle">
                Join the fun!
          </h2>
            <form className="RegisterForm" onSubmit={handleSubmit}>
                <input
                    className="RegisterInput"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChanges}
                />
                <input  className="RegisterInput"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChanges}
                />
                <button className="RegisterButton" type="submit">Sign Up</button>

                <Link
                    className="RegisterLink"
                    to="/login"
                >
                    Already have an Account?
            </Link>
            </form>
        </div>

    );
};
