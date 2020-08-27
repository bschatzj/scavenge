import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './Tasks.css'

export default function Tasks(props) {
    console.log(props)
    const location = useLocation()
    const [task, setTask] = useState({ title: "", description: "" })
    const [newTask, setNewTask] = useState(false)
    const [message, setMessage] = useState('')
    const [completed, setCompleted] = useState([])

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


        if (props.subs) {
            props.subs.map(thing => {
                if (thing.user == localStorage.getItem('id')) {
                    completed.push(thing.task)
                }
            })
        }
    }, [props])




console.log(completed)

    return (
        <div className="TasksDiv" >
            <div className="TaskList">
                <h1 className="ListTitle">Tasks</h1>
                {props.tasks.map(task => (
                    <Link to={`${location.pathname}/task/${task.task_id}`} className="Link">
                        <div className="TaskContainer">
                            <h1 className="TaskTitle">{task.title}</h1>
                            {completed.includes(task.task_id) ? <span className="CheckMark">&#10003;</span> :<h1 style={{width:"20%"}}>Incomplete</h1>}
                        </div>
                    </Link>
                ))}

                <div className="AddTask">
                    {newTask ? <button className="TaskButton" onClick={() => { addTask() }}>Add Task</button> :
                        <button className="TaskButton" onClick={() => { setNewTask(true) }}>Create New Task</button>
                    }
                </div>

                <h1 className="Error">{message}</h1>
                {newTask ? <div className="TaskForm">
                    <div className="FormDiv">
                        <label className="FormLabel">Task Title: </label>
                        <input name="title" value={task.title} onChange={handleChange} className="FormInput" />
                    </div>
                    
                    <div className="FormDiv">
                        <label className="FormLabel">Description: </label>
                        <textarea name="description" value={task.description} onChange={handleChange} className="TextArea" />
                    </div>
                    <h1 className="Cancel" onClick={() => { setNewTask(false) }} >Cancel</h1>
                
                </div>
                    : null}
            </div>
        </div>
    )
}