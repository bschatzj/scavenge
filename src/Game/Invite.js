import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import './Invite.css'

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
        If you would like to join please make an account at http://scavengewithfriends.com/register Then this link is to the game http://scavengewithfriends.com/${location.pathname}! ${"\n"}

        ${props.password ? `One last thing there will be a password to get into the game. The password is: ${props.password}` : ""}

        Hope to see you soon!
        `})
    }, [props])

    const [inviting, setInviting] = useState(false)

    const handleChange = e => {
        
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
        <div className="InviteDiv">
            <h1 className="Invite" onClick={() => { setInviting(true) }}>Invite some friends!</h1>
            {inviting ?
                <div className="InviteForm">
                    <label className="InviteLabel">Recipient Email:</label>
                    <input className="InviteInput" value={email.email} onChange={handleChange} name="email"></input>
                    <label className="InviteLabel" >Message:</label>
                    <textarea className="InviteTextArea" value={email.message} onChange={handleChange} name="message"></textarea>
                    <button  className="SendInvite" onClick={() => {handleInvite()}}>Send Invitation</button>
                    <button  className="Cancel" onClick={() => {setInviting(false)}}>Cancel</button>
                </div>
                : null
            }
        </div>
    )
}