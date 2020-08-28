import React, {useState, useEffect} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import { useLocation } from 'react-router-dom'



export default function PrivateGame(props) {
    console.log(props)
    const game = (useLocation().pathname.slice(6))
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [user, setUser] = useState({})
    

    useEffect(() => {
        axiosWithAuth().get(`/profile/profile/${localStorage.getItem('id')}`)
            .then(res => {
                console.log(res)
                setUser(res.data.profile)
            })
            .catch(err => { console.log(err) })
    }, [])
   
    const handleChange = e => {
        setPassword(e.target.value)
        console.log(password)
    }


    const JoinGame = () => {
        axiosWithAuth().post(`https://salty-peak-24943.herokuapp.com/api/game/joingame`, { 'name': user.display_name, 'user': parseInt(localStorage.getItem('id')), 'game': game })
            .then(res => { window.location.reload() })
            .catch(err => { console.log(err) })
    }

    const submit = e => {
        console.log('submit')
        if(password === props.password.password){
            setError(false)
            JoinGame()
            console.log('welcome')
        }
        else{
            setError(true)
        }
    }

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}> 
            <h1 style={{color:"white", fontSize:"8rem"}}>PASSWORD REQUIRED</h1>  
            {error ? null : <h1>WRONG PASSWORD</h1> }
            <form>
                <input style={{fontSize:"5rem"}} type="password"  value={password} onChange={handleChange}/>
            </form>
            <button onClick={() => {submit()}} style={{margin:"4rem", fontSize:"5rem", border:"none", height:"15vh", width:"40vw"}}>ENTER</button>
        </div>
    )
}