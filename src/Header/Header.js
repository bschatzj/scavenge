import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import './Header.css'
import MobileHeader from './MobileHeader'
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


    return (
        <>
        <MobileHeader id="MobileOnly"/>
        <div className="Header" style={{"width": width}}>
            {location.substr(6).includes('/task/') ? <h1  className="HeaderButton" onClick={() => {history.goBack()}}> &larr; Back</h1> : null}
            <h1 className="HeaderButton" onClick={() => { history.push('/profile') }}>Profile</h1>
            <h1 onClick={() => { history.push('/profile') }} className="HeaderButton">How To Play</h1>
            <h1 className="HeaderButton" onClick={() => { LogOut() }}>Log Out</h1>
        </div>
        </>
    )
}