import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'


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
        If you would like to join please make an account at https://scavenger.vercel.app/register Then this link is to the game https://scavenger.vercel.app${location.pathname}! ${"\n"}

        ${props.password ? `One last thing there will be a password to get into the game. The password is: ${props.password}` : ""}

        Hope to see you soon!
        `})
    }, [props])

    const [inviting, setInviting] = useState(false)

    const handleChange = e => {
        console.log(email)
        setEmail({ ...email, [e.target.name]: e.target.value })
    }

    const handleInvite = e => {
        if(email.email.includes('@' && ".")){
        axiosWithAuth().post('/email/send', email)
        .then(res => {setEmail({...email, email:""}) })
        .catch(err => {console.log(err)})
        }
        else{
            console.log('noooooo')
        }
    }
    return (
        <div style={{ width: "60vw", marginLeft: "7.5vw" }}>
            <h1 style={{ fontSize: "4rem", cursor: "pointer" }} onClick={() => { setInviting(true) }}>Invite some friends!</h1>
            {inviting ?
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{fontSize:"3rem"}}>Recipient Email:</label>
                    <input style={{ width: "30vw", fontSize:"2rem" }} value={email.email} onChange={handleChange} name="email"></input>
                    <label style={{ fontSize:'3rem' }}>Message:</label>
                    <textarea style={{ resize: 'none', width: "58vw", height: "50vh", fontSize:"2rem" }} value={email.message} onChange={handleChange} name="message"></textarea>
                    <button  style={{ marginTop: "2%", height: "3rem", width: "45%", border: "2px solid black", cursor: "pointer", fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center", marginLeft:"25%" }} onClick={() => {handleInvite()}}>Send Invitation</button>
                    <button  style={{ marginTop: "2%", marginBottom:"5%", height: "3rem", width: "45%", border: "2px solid black", cursor: "pointer", fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center", marginLeft:"25%" }} onClick={() => {setInviting(false)}}>Cancel</button>
                </div>
                : null
            }
        </div>
    )
}