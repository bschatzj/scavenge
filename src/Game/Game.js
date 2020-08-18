import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { createPortal } from 'react-dom'
import PrivateGame from './PrivateGame'

export default function Game(props) {
    const game = (props.match.params.id)
    const [gameInfo, setGameInfo] = useState({ Players: [], gameInfo: { private: true } })
    const [players, setPlayers] = useState([])
    const [playerIDs, setPlayerIDs] = useState([])

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
    }, [gameInfo])


    console.log(gameInfo)
    console.log(playerIDs)
    return (
        <div>
            {playerIDs.includes(parseInt(localStorage.getItem('id'))) || gameInfo.gameInfo.private === false ? <div>Welcome Back!</div> : <div style={{position:"fixed", height:"100vh", width:"100vw", backgroundColor:"black", top:"0"}}><PrivateGame password={gameInfo.gameInfo} /></div>}

            {players.map(players => (
                <>
                    <h1>HI!!!!!</h1>
                    <h1> {players.display_name}</h1>
                </>
            ))}


        </div>
    )
}