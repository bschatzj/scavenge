import React, { useState } from 'react';
import styled from 'styled-components';
import './Header.css'
import { useHistory } from "react-router-dom";
import { useLocation } from 'react-router-dom'


const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 120;
  display: flex;
  justify-content: space-around;
  flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? 'black' : 'black'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    align-items:center;
    font-size:1.5rem;
    flex-flow: column nowrap;
    background-color: silver;
    border-left: 2px solid black;
    position: fixed;
    margin-top: 0;
    transform: ${({ open }) => open ? 'translateX(0) translateY(0)': 'translateX(100%) translateY(-100%)'};
    border-radius: ${({open}) => open ? '0%' : '100%'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    padding-top: 3.5rem;
    transition: all .8s ease-in-out;
    z-index: 2;
    li {
      color: #fff;
    }
}
`

const Burger = () => {
    const [open, setOpen] = useState(false)

    let location = useLocation().pathname
    let history = useHistory();

    const LogOut = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }

    return (
        <>
            <StyledBurger id="MobileOnly" open={open} onClick={() => setOpen(!open)}>
                <div />
                <div />
                <div />
            </StyledBurger>

            <Ul open={open}>
            {location.substr(6).includes('/task/') ? <h1  className="HeaderButton" onClick={() => {history.goBack()}}> &larr; Back</h1> : null}
            <h1 className="HeaderButton" onClick={() => { history.push('/profile') }}>Profile</h1>
            <h1 onClick={() => { history.push('/profile') }} className="HeaderButton">How To Play</h1>
            <h1 className="HeaderButton" onClick={() => { LogOut() }}>Log Out</h1>
            </Ul>
        </>
    )
}
export default Burger