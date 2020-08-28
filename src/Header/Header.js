import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export default function Header() {
    let location = useLocation().pathname
    let history = useHistory();
    const [width, setWidth] = useState('75vw')
    const LogOut = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    useEffect(() => {
        console.log('hi')
        if (location == '/profile') {
            setWidth('65vw')
        }
        if (location.includes('/game')){
            setWidth('75vw')
        }
        if (location.substr(6).includes('/task')){
            setWidth('99vw')
        }
    }, [location])


    console.log(location.substr(6))
    return (
        <div style={{ width: width, height: "10vh", margin: "0", padding: "0", display: "flex", justifyContent: "space-evenly" }}>
            {location.substr(6).includes('/task/') ? <h1  style={{ cursor: "pointer" }} onClick={() => {history.goBack()}}> &larr; Back</h1> : null}
            <h1 style={{ cursor: "pointer" }} onClick={() => { history.push('/profile') }}>Profile</h1>
            <h1 onClick={() => { history.push('/profile') }} style={{ cursor: "pointer" }}>How To Play</h1>
            <h1 style={{ cursor: "pointer" }} onClick={() => { LogOut() }}>Log Out</h1>
        </div>
    )
}