import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import PrivateGame from './PrivateGame'
import Tasks from './Tasks'
import Email from './Invite'
import Countdown from './Countdown'

export default function Game(props) {
    const game = (props.match.params.id)
    const [gameInfo, setGameInfo] = useState({ Players: [], gameInfo: { private: true } })
    const [players, setPlayers] = useState([])
    const [playerIDs, setPlayerIDs] = useState([])
    const [tasks, setTasks] = useState([])
    const [voting, setVoting] = useState(false)
    const [inGame, setInGame] = useState(false)
    const [profile, setProfile] = useState('')
    
    useEffect(() => {
        axiosWithAuth().get(`/game/game/${game}`)
            .then(res => { setGameInfo(res.data) })
            .catch(err => { console.log(err) })



            axiosWithAuth().get(`/profile/profile/${localStorage.getItem('id')}`)
            .then(res => {
                console.log(res)
                setProfile(res.data.profile)
            })
            .catch(err => { console.log(err) })
    }, [])

    useEffect(() => {
        gameInfo.Players.forEach(user => {
            axiosWithAuth().get(`/profile/profile/${user.user}`)
                .then(res => { setPlayers(players => [...players, res.data.profile]) })
                .catch(err => { console.log(err) })
        })

        gameInfo.Players.map(user => {
            setPlayerIDs(playerIDs => [...playerIDs, user.user])
        })


        if (gameInfo.gameInfo.game_id) {
            axiosWithAuth().get(`/game/alltasks/${gameInfo.gameInfo.game_id}`)
                .then(res => { setTasks(res.data.tasks) })
                .catch(err => { console.log(err) })
        }



    }, [gameInfo])

    useEffect(() => {
        if (playerIDs.includes(parseInt(localStorage.getItem('id')))) {
            setInGame(true)
        }
    }, [playerIDs])  

    const JoinGame = (game) => {
        axiosWithAuth().post(`https://salty-peak-24943.herokuapp.com/api/game/joingame`, { 'name': profile.display_name, 'user': parseInt(localStorage.getItem('id')), 'game': game })
            .then(res => { window.location.reload()})
            .catch(err => { console.log(err) })
    }

    console.log(gameInfo)
    return (
        <div style={{ width: "75vw" }}>
            {inGame ? null : <button style={{width:"100%", fontSize:"3rem"}}onClick={() => {JoinGame(gameInfo.gameInfo.game_title)}}>JOIN THIS GAME</button>}
            {playerIDs.includes(parseInt(localStorage.getItem('id'))) || gameInfo.gameInfo.private === false ? <h1 style={{ fontSize: "4rem", textAlign: "center" }}>{gameInfo.gameInfo.game_title}</h1> : <div style={{ position: "fixed", height: "100vh", width: "100vw", backgroundColor: "black", top: "0", zIndex: "10000000" }}><PrivateGame password={gameInfo.gameInfo} setPlayers={setPlayerIDs} players={playerIDs} /></div>}
            <Countdown endTime={gameInfo.gameInfo.end_date} setVoting={setVoting} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "fixed", left: "75vw", width: "25vw", height: "100vh", top: "0", overflow: "auto", borderLeft: "5px solid black" }}>
                <h1 style={{ position: "absolute", fontSize: "3rem", margin: "0", backgroundColor: "black", width: "25vw", height: "12vh", color: "white", textAlign: "center" }}>Players</h1>
                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", width: "25vw", flexDirection: "column", top: "12vh", position: "fixed", overflow: "auto" }}>
                    {players.map(players => (
                        <>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column", borderTop: "5px solid black", width: "100%", paddingTop: "10px" }}>
                                <img style={{ borderRadius: "50%", height: "25vh", width: "20vw" }} src={players.icon} />
                                <h1> {players.display_name}</h1>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            { inGame ?
            <>
            <Tasks tasks={tasks} voting={voting} id={gameInfo.gameInfo.game_id} subs={gameInfo.Subs} setTasks={setTasks} />
            <Email password={gameInfo.gameInfo.password} /> </> : null}
        </div>
    )
}