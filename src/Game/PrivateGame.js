import React, {useState, useEffect} from 'react'

export default function PrivateGame(props) {
    console.log(props)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const handleChange = e => {
        setPassword(e.target.value)
    }

    const submit = e => {
        if(password === props.password.password){
            setError(false)
            console.log('welcome')
        }
    }

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}> 
            <h1 style={{color:"white", fontSize:"8rem"}}>PASSWORD REQUIRED</h1>  
            <form>
                <input style={{fontSize:"5rem"}} type="password"  value={password} onChange={handleChange}/>
            </form>
            <button onClick={() => {submit()}} style={{margin:"4rem", fontSize:"5rem", border:"none", height:"15vh", width:"40vw"}}>ENTER</button>
        </div>
    )
}