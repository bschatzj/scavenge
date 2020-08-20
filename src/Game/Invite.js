import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


export default function Emailer(props) {
    const location = useLocation()
    const [email, setEmail] = useState({
        email: "",
        message: ""
    })

    useEffect(() => {
        setEmail({
            email: "",
            message: `You have been invited to a scavenger hunt! ${"\n"}
        If you would like to join please make an account at ... Then this link is to the game ...${location.pathname}! ${"\n"}

        ${props.password ? `One last thing there will be a password to get into the game. It is ${props.password}` : ""}

        Hope to see you soon!
        `})
    }, [props])

    const [inviting, setInviting] = useState(false)

    const handleChange = e => {
        console.log(email)
        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ width: "75vw", marginLeft: "7.5vw" }}>
            <h1 style={{ fontSize: "4rem", cursor: "pointer" }} onClick={() => { setInviting(true) }}>Invite some friends!</h1>
            {inviting ?
                <div style={{ display: "flex", flexDirection: "column", padding: "2%" }}>
                    <label>Recipient Email:</label>
                    <input style={{ width: "30vw" }} value={email.email} onChange={handleChange} name="email"></input>
                    <label style={{ verticalAlign: 'top' }}>Message:</label>
                    <textarea style={{ resize: 'none', width: "50vw", height: "10vh" }} value={email.message} onChange={handleChange} name="message"></textarea>
                </div>
                : null
            }
        </div>
    )
}