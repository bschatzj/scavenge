import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useLocation } from 'react-router-dom'
import './TaskDisplay.css'

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
    const [message, setMessage] = useState('')
    useEffect(() => {
        axiosWithAuth().post(`/game/task/${id}`, { 'game': game })
            .then(res => {
                setTaskInfo(res.data.task)
                setVotes(res.data.votes)
            })
            .catch(err => { console.log(err) })


        axiosWithAuth().get(`/game/subs/${id}`)
            .then(res => {
                setSubs(res.data.posts)
            })
            .catch(err => { console.log(err) })


        axiosWithAuth().get(`/game/game/${game}`)
            .then(res => { setGameInfo(res.data) })
            .catch(err => { console.log(err) })

    }, [])

    useEffect(() => {
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
        setAdding(false)
        axiosWithAuth().post(`/game/submit/${id}`, submit)
            .then(res => { setMessage("Upload Success!") })
            .catch(err => { setMessage('Error uploading your post try again in 10 minutes') })
    }

    const Vote = (id) => {
        axiosWithAuth().post(`/game/vote/${id}`, { id: `${localStorage.getItem('id')}` })
            .then(res => { setVoted(true) })
            .catch(err => { console.log(err) })
    }



    return (
        <div className="TaskDisplay">
            <h1 className="SubmitTitle">{taskInfo.title}</h1>
            <h1 className="TaskDescription">Description: {taskInfo.description}</h1>
            <h1> {message}</h1>
            {submitted ? null :
                <>{adding ? <button className="SubmitButton" onClick={() => { handleSubmit() }}>Submit</button> :
                    <button className="SubmitButton" onClick={() => { setAdding(true) }}>New Submission</button>}
                </>}

            {
                adding ? <div className="Form" >
                    <label className="Label" >Photo: </label>
                    <input
                        className="Input"
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
                                        <img src={image} className="Image" alt="your upload" />
                                    </>
                                    : null
                                }
                            </div>
                        )}
                    <label className="Label">Title: </label>
                    <input className="Label" value={submit.title} name="title" onChange={handleChange} />
                    <label className="Label">Description:</label>
                    <textarea className="TextArea" value={submit.description} name="description" onChange={handleChange} />
                    <h1 className="Cancel" onClick={() => { setAdding(false) }}>Cancel</h1>
                </div> : null
            }



            {
                subs.length > 0 ?
                    <div className="SubDiv"> {
                        subs.map(sub => (

                            <div className="Sub">

                                <h1 className="SubTitle">Title: {sub.title}</h1>
                                <img className="SubImg" src={sub.photo} alt={sub.description} />
                                <h1 className="SubDescription">Description: {sub.description}</h1>
                                {voting ? <>{voted ? null : <button className="Vote" onClick={() => { Vote(sub.task) }}>^ Vote ^</button>}</> : null}
                                {votes.map(vote => {
                                    console.log(vote)
                                    console.log(sub)
                                    if (vote.task == sub.task) {

                                        return <div style={{ width: "60vw" }}> <div style={{ width: `${1 / votes.length * 100}%`, backgroundColor: "red", height: "50px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem" }}>{1 / votes.length * 100}% of vote </div> <div style={{ width: `${(1 - 1 / votes.length) * 100}%`, backgroundColor: "white" }}></div> </div>
                                    }
                                })}

                            </div>
                        ))
                    }
                    </div>
                    :
                    <h1 className="NoSubmit">No submissions for this task yet! Be the first</h1>
            }
        </div >
    )


}
