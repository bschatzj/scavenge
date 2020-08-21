import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export default function Tasks(props) {
    console.log(props)
    const location = useLocation()
    const [task, setTask] = useState({ title: "", description: "" })
    const [newTask, setNewTask] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = e => {
        console.log(task)
        setTask({ ...task, [e.target.name]: e.target.value })
    }

    const addTask = e => {
        if (task.title == "" || task.description == "") {
            setMessage('Must have a task title and description')
        }
        else {
            axiosWithAuth().post(`/game/newtask/${parseInt(props.id)}`, task)
                .then(res => { setMessage("Task added succesfully (may need to refresh)") })
                .catch(err => { console.log(err) })
        }

    }

    const ids = []
    useEffect(() => {
        if (props.subs) {
            props.subs.map(id => {
                ids.push(id)
            })
        }
    }, [props])

    console.log(ids)
    console.log(message)
    return (
        <div style={{ width: "60vw", display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "7.5vw" }}>
            <div style={{ backgroundColor: "rgb(295, 255, 217)", borderRadius: "5%", width: "100%" }}>
                <h1 style={{ textAlign: "center", fontSize: "3rem", textDecoration: "underline" }}>Tasks</h1>
                {props.tasks.map(task => (
                    <Link to={`${location.pathname}/${task.task_id}`} style={{ width: "100%", textDecoration: "none", color:"black"}}>
                        <div style={{display: "flex", width: "100%", justifyContent: "space-evenly", borderBottom:"3px solid black"}}>
                            <h1 style={{ paddingBottom: "0", width:"60%" }}>{task.title}</h1>
                            {props.subs.map(thing => { if (thing.task == task.task_id && thing.user == localStorage.getItem('id')) { return (<span style={{ fontSize: "3rem" , width:"20%", textAlign:"center"}}>&#10003;</span>) } else{ return(<h1 style={{width:"20%"}}>Incomplete</h1>)} })}
                        </div>
                    </Link>
                ))}




                <div style={{ display: "flex", justifyContent: "center" }}>
                    {newTask ? <button style={{ margin: "2%", height: "3rem", width: "45%", cursor: "pointer", border: "2px solid black", fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { addTask() }}>Add Task</button> :
                        <button style={{ margin: "2%", height: "3rem", width: "45%", border: "2px solid black", cursor: "pointer", fontSize: "3rem", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => { setNewTask(true) }}>Create New Task</button>
                    }
                </div>
                <h1 style={{ color: "red" }}>{message}</h1>
                {newTask ? <div style={{ display: "flex", flexDirection: "column", width: "100%", }}>
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                        <label style={{ width: "30%", fontSize: "3rem", padding: "1rem" }}>Task Title: </label>
                        <input name="title" value={task.title} onChange={handleChange} style={{ width: "70%", fontSize: "2rem", margin: "3rem" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                        <label style={{ width: "30%", fontSize: "3rem", padding: "1rem" }}>Description: </label>
                        <textarea name="description" value={task.description} onChange={handleChange} style={{ width: "70%", fontSize: '2rem', height: '8rem', resize: "none", margin: "3rem" }} />
                    </div>
                    <h1 style={{ fontSize: "3rem", textAlign: "center", cursor: "pointer" }} onClick={() => { setNewTask(false) }} >Cancel</h1>
                </div>
                    : null}
            </div>
        </div>
    )
}