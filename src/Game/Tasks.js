import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'


export default function Tasks(props) {
    console.log(props)
    const [task, setTask] = useState({})

    const handleChange = e => {
        console.log(task)
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const addTask = e => {
        axiosWithAuth().post(`/game/newtask/${parseInt(props.id)}`, task)
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
        
    }
    return (
        <>
            {props.tasks.map(task => (
                <div>
                    <h1>{task.title}</h1>
                    <h1>{task.description}</h1>
                </div>
            ))}

            <button onClick={() => {addTask()}}>Add new task</button>
            <div style={{ display: "flex", flexDirection: "column", width: "50%", }}>
                <div style={{ display: "flex", justifyContent:"space-evenly"}}>
                    <label>Title: </label>
                    <input name="title" value={task.title} onChange={handleChange} />
                </div>
                <div style={{ display: "flex", justifyContent:"space-evenly"}}>
                    <label>Description: </label>
                    <input name="description" value={task.description} onChange={handleChange} />
                </div>
            </div>
        </>
    )
}