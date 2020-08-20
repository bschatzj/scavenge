import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { createPortal } from 'react-dom'
import PrivateGame from './PrivateGame'
import Tasks from './Tasks'
export default function Game(props) {
    const game = (props.match.params.id)
    const [gameInfo, setGameInfo] = useState({ Players: [], gameInfo: { private: true } })
    const [players, setPlayers] = useState([])
    const [playerIDs, setPlayerIDs] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axiosWithAuth().get(`/game/game/${game}`)
            .then(res => { setGameInfo(res.data) })
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
        
        
        if (gameInfo.gameInfo.game_id){
        axiosWithAuth().get(`/game/alltasks/${gameInfo.gameInfo.game_id}`)
        .then(res => {setTasks(res.data.tasks)})
        .catch(err => {console.log(err)})}

    }, [gameInfo])


    return (
        <div>
            {playerIDs.includes(parseInt(localStorage.getItem('id'))) || gameInfo.gameInfo.private === false ? <div>Welcome Back!</div> : <div style={{ position: "fixed", height: "100vh", width: "100vw", backgroundColor: "black", top: "0" }}><PrivateGame password={gameInfo.gameInfo} setPlayers={setPlayerIDs} players={playerIDs} /></div>}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1>Players</h1>
                <div style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap", width: "100%", }}>
                    {players.map(players => (
                        <>
                            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                <img style={{ borderRadius: "50%", height: "20vh", width: "15vw" }} src={players.icon} />
                                <h1> {players.display_name}</h1>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            <Tasks tasks={tasks} id={gameInfo.gameInfo.game_id} />
        </div>
    )
}