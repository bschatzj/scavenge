import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useLocation } from 'react-router-dom'
import axios from 'axios'


export default function TaskDisplay() {
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const location = useLocation().pathname
    const lastIndex = location.lastIndexOf('/task');
    const lastslashindex = location.lastIndexOf('/');
    const id = location.substring(lastslashindex + 1)
    const game = location.substring(6, lastIndex)
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
    const [gameInfo, setGameInfo] = useState({ gameInfo: { end_date: 100000000000000000000000000000 } })
    const [voting, setVoting] = useState(false)
    const [votes, setVotes] = useState([])
    const [voted, setVoted] = useState(false)
    useEffect(() => {
        axiosWithAuth().post(`/game/task/${id}`, { 'game': game })
            .then(res => {
                setTaskInfo(res.data.task)
                setVotes(res.data.votes)
            })
            .catch(err => { console.log(err) })


        axiosWithAuth().get(`/game/subs/${id}`)
            .then(res => {
                console.log(res)
                setSubs(res.data.posts)
            })
            .catch(err => { console.log(err) })


        axiosWithAuth().get(`/game/game/${game}`)
            .then(res => { setGameInfo(res.data) })
            .catch(err => { console.log(err) })

    }, [])

    useEffect(() => {
        console.log(parseInt(gameInfo.gameInfo.end_date))
        console.log(Date.now())
        if (parseInt(gameInfo.gameInfo.end_date) < Date.now()) {
            setVoting(true)
        }
        else {
            setVoting(false)
        }
    }, [gameInfo])

    useEffect(() => {
        subs.map(subs => {
            if (subs.user == localStorage.getItem('id')) {
                setSubmitted(true)
            }
        })
    }, [subs])

    useEffect(() => {
        votes.map(vote => {
            if (vote.user == localStorage.getItem('id')) {
                setVoted(true)
            }
        })

    }, [votes])

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

    const Vote = (id) => {
        axiosWithAuth().post(`/game/vote/${id}`, { id: `${localStorage.getItem('id')}` })
            .then(res => { setVoted(true) })
            .catch(err => { console.log(err) })
    }



    console.log(votes)
    return (
        <div style={{width:"99vw"}}>
            <h1 style={{ fontSize: '4.5rem', textAlign: "center", textDecoration: "underline" }}>{taskInfo.title}</h1>
            <h1 style={{ fontSize: "2.5rem", textAlign: "center" }}>Description: {taskInfo.description}</h1>
            {submitted ? null :
                <>{adding ? <button style={{ fontSize: "3rem", width: "40%", marginLeft: "30%" }} onClick={() => { handleSubmit() }}>Submit</button> :
                    <button style={{ fontSize: "3rem", width: "40%", marginLeft: "30%" }} onClick={() => { setAdding(true) }}>New Submission</button>}
                </>}

            {
                adding ? <div style={{ display: "flex", flexDirection: 'column', marginLeft: "20%", width: "60%" }}>
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
                </div> : null
            }



            {
                subs.length > 0 ?
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", padding: " 5%  0%", width:"99vw"}}> {
                        subs.map(sub => (

                            <div style={{ width: "60%" }}>
                                {console.log(sub)}
                                <h1 style={{fontSize:"4rem"}}>Title: {sub.title}</h1>
                                <img style={{ width: "99%", border: "3px solid black" }} src={sub.photo} alt={sub.description} />
                                <h1>Description: {sub.description}</h1>
                                {voting ? <>{voted ? null : <button style={{ width: "60%", marginLeft: "25%", fontSize: "3rem" }} onClick={() => { Vote(sub.task) }}>^ Vote ^</button>}</> : null}
                                {votes.map(vote => {
                                    if(vote.task == sub.task){
                                        
                                        return <div style={{width:"60vw"}}> <div style ={{width:`${1/votes.length * 100}%`, backgroundColor:"red", height:"50px", display:"flex", justifyContent:"center", alignItems:"center", fontSize:"3rem"}}>{1/votes.length * 100}% of vote </div> <div style={{width:`${(1 - 1/votes.length) * 100}%`, backgroundColor:"white"}}></div> </div>
                                    }
                                })}
                                {voting ? <div style={{width:"60vw", backgroundColor:"red"}}> {votes.where} </div> : null}
                            </div>
                        ))
                    }
                    </div>
                    :
                    <h1 style={{ marginLeft: "10%", marginTop: "10%" }}>No submissions for this task yet! Be the first</h1>
            }
        </div >
    )


}
