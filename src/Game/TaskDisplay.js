import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


export default function TaskDisplay() {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation().pathname
    const lastslashindex = location.lastIndexOf('/');
    const id = location.substring(lastslashindex + 1)
    const game = location.substring(6, lastslashindex)
    const [subs, setSubs] = useState([])
    const [adding, setAdding] = useState(false)
    const [submit, setSubmit] = useState({
        title: "",
        description: "",
        photo: "",
        user: parseInt(localStorage.getItem('id')),
        game: game
    })
    const [submitted, setSubmitted] = useState(false)
    const [taskInfo, setTaskInfo] = useState('')

    useEffect(() => {
        axiosWithAuth().post(`/game/task/${id}`, { 'game': game })
            .then(res => { setTaskInfo(res.data.task) })
            .catch(err => { console.log(err) })


        axiosWithAuth().get(`/game/subs/${id}`)
            .then(res => { console.log(res) 
                setSubs(res.data.posts) })
            .catch(err => { console.log(err) })

    }, [])

    useEffect(() => {
        subs.map(subs => {
            if (subs.user == localStorage.getItem('id')) {
                setSubmitted(true)
            }
        })
    }, [subs])

    console.log(subs)

    const handleChange = e => {
        setSubmit({ ...submit, [e.target.name]: e.target.value })
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'scavenge')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dn6h8fc8f/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        setImage(file.secure_url)
        setSubmit({ ...submit, photo: file.secure_url })
        setLoading(false)
    }

    const handleSubmit = () => {
        axiosWithAuth().post(`/game/submit/${id}`, submit)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }

    return (
        <div>
            <h1 style={{fontSize:'4.5rem', textAlign:"center", textDecoration:"underline"}}>{taskInfo.title}</h1>
            <h1 style={{fontSize:"2.5rem", textAlign:"center"}}>Description: {taskInfo.description}</h1>
            {submitted ? null : <>{adding ? <button style={{ fontSize: "3rem", width: "40%", marginLeft: "30%" }} onClick={() => { handleSubmit() }}>Submit</button> :
                <button style={{ fontSize: "3rem", width: "40%", marginLeft: "30%" }} onClick={() => { setAdding(true) }}>New Submission</button>} </>}
            {adding ? <div style={{ display: "flex", flexDirection: 'column', marginLeft: "20%", width: "60%" }}>
                <label style={{ fontSize: "3rem" }}>Photo: </label>
                <input
                    style={{ fontSize: "2rem" }}
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                />
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                        <div>
                            {image ?
                                <>
                                    <h2>Preview:</h2>
                                    <img src={image} style={{ width: '200px' }} alt="your upload" />
                                </>
                                : null
                            }
                        </div>
                    )}
                <label style={{ fontSize: "3rem" }}>Title: </label>
                <input style={{ fontSize: "3rem" }} value={submit.title} name="title" onChange={handleChange} />
                <label style={{ fontSize: "3rem" }}>Description:</label>
                <textarea style={{ fontSize: "3rem", height: "10rem", resize: "none" }} value={submit.description} name="description" onChange={handleChange} />
            </div> : null}



            {subs.length > 0 ?
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding:" 5%  0%" }}> {
                    subs.map(sub => (
                        <div style={{ width: "45%" }}>
                            <h1>Title: {sub.title}</h1>
                            <img style={{ width: "99%", border: "3px solid black" }} src={sub.photo} alt={sub.description} />
                            <h3>Description: {sub.description}</h3>
                            <button style={{width:"60%", marginLeft:"25%", fontSize:"3rem"}}>^ Vote ^</button>
                        </div>
                    ))
                }
                </div>
                :
                <h1 style={{marginLeft:"10%", marginTop:"10%"}}>No submissions for this task yet! Be the first</h1>
            }
        </div>
    )


}
