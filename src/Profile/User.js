import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import './User.css'
export default function User(props) {
    const [user, setUser] = useState({})
    const [editing, setEditing] = useState(false)
    const IconOptions = ['http://www.clipartbest.com/cliparts/dir/eqz/direqzE9T.png', 'http://www.clipartbest.com/cliparts/ncX/LRj/ncXLRjBcB.png', 'http://www.clipartbest.com/cliparts/nTB/Eaa/nTBEaaGTA.svg', 'http://www.clipartbest.com/cliparts/7Ta/ba5/7Taba5XTA.jpeg', 'http://www.clipartbest.com/cliparts/Kcj/eL6/KcjeL6ABi.jpeg', 'http://www.clipartbest.com/cliparts/acq/o47/acqo47goi.jpg', 'http://www.clipartbest.com/cliparts/aiq/ogz/aiqogzE5T.png', 'http://www.clipartbest.com/cliparts/9iR/La8/9iRLa89nT.jpg', 'http://www.clipartbest.com/cliparts/9iR/Lr7/9iRLr7aXT.png', 'http://www.clipartbest.com/cliparts/9i4/6AB/9i46ABgkT.png', 'http://www.clipartbest.com/cliparts/9cz/ojp/9czojpLki.jpeg', 'http://www.clipartbest.com/cliparts/KTn/o9M/KTno9MEEc.jpg', 'http://www.clipartbest.com/cliparts/Kcn/ojM/KcnojMzai.jpeg', 'http://www.clipartbest.com/cliparts/di8/XX7/di8XX75LT.png', 'http://www.clipartbest.com/cliparts/7ca/6rA/7ca6rA4Mi.jpg', 'http://www.clipartbest.com/cliparts/ncX/66x/ncX66xnpi.png', 'http://www.clipartbest.com/cliparts/eiM/k9b/eiMk9bx9T.jpg', 'http://www.clipartbest.com/cliparts/Rid/6RE/Rid6REnpT.jpg', 'http://www.clipartbest.com/cliparts/RTG/BxX/RTGBxXdrc.jpg', 'http://www.clipartbest.com/cliparts/4i9/66x/4i966xaAT.jpg', 'http://www.clipartbest.com/cliparts/aTq/6Aj/aTq6Aj4Ec.png', 'http://www.clipartbest.com/cliparts/9c4/6oG/9c46oGjpi.png', 'http://www.clipartbest.com/cliparts/7ca/odz/7caodzboi.gif']
    const [message, setMessage] = useState('')

    useEffect(() => {
        axiosWithAuth().get(`/profile/profile/${localStorage.getItem('id')}`)
            .then(res => {
                console.log(res)
                setUser(res.data.profile)
            })
            .catch(err => { console.log(err) })
    }, [])


    useEffect(() => {
        if(user.display_name == null){
            setMessage("Welcome! To set your display name and change your icon click on the picture of the cow!")
        }
        else{
            setMessage(`Welcome back, ${user.display_name}`)
        }

    }, [user])


    const handlePicture = picture => {
        setUser({ ...user, icon: picture })
    }

    const handleName = e => {
        props.setUser(e.target.value)
        setUser({ ...user, 'display_name': e.target.value })
    }

    function update() {
        setEditing(false)
        props.setVisible(editing)
        axiosWithAuth().put(`/profile/update/${localStorage.getItem('id')}`, user)
            .then(res => {
                console.log(res)
            })
            .catch(err => { console.log(err) })
    }

    function setDisplayed() {
        setEditing(!editing)
        props.setVisible(editing)
    }

    return (
        <div className='userPage'>
            <h1 style={{ textAlign:"center"}}>{message}</h1>
            <img onClick={() => { setDisplayed() }} src={user.icon} className="ProfilePic" alt="your icon" />
            <h1>{user.display_name}</h1>

            {editing ?
                <div className="IconSelect">
                    <h1 onClick={() => { update() }} style={{ cursor: "pointer" }}>Save Changes</h1>
                    <div className="Input">
                        <label>Display Name:</label>
                        <input className="Input" onChange={handleName} value={user.display_name} />
                    </div>
                    <div className="IconDisplay">
                        {IconOptions.map(icon => (
                            <img onClick={() => { handlePicture(icon) }} className="Icon" src={icon} alt="option for icon" />
                        ))}
                    </div>
                </div>
                : null
            }
        </div >
    )
}