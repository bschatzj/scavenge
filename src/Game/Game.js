import React, { useState, useEffect } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import PrivateGame from './PrivateGame'
import Tasks from './Tasks'
import Email from './Invite'
import Countdown from './Countdown'
import './Game.css'
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
        <div className="Game">
            {inGame ? null : <button className="JoinGame" onClick={() => {JoinGame(gameInfo.gameInfo.game_title)}}>JOIN THIS GAME</button>}
            {playerIDs.includes(parseInt(localStorage.getItem('id'))) || gameInfo.gameInfo.private === false ? <h1 className="Title">{gameInfo.gameInfo.game_title}</h1> : <div className="Private"><PrivateGame password={gameInfo.gameInfo} setPlayers={setPlayerIDs} players={playerIDs} /></div>}
            <Countdown endTime={gameInfo.gameInfo.end_date} setVoting={setVoting} />
            { inGame ?
            <>
            <Tasks tasks={tasks} voting={voting} id={gameInfo.gameInfo.game_id} subs={gameInfo.Subs} setTasks={setTasks} />
            
            <div className="PlayerDiv">
                <h1 className="Players">Players</h1>
                <div className="PlayerDisplay">
                    {players.map(players => (
                        <>
                            <div className="Individual">
                                <img className="PlayerPic" src={players.icon} />
                                <h1> {players.display_name}</h1>
                            </div>
                        </>
                    ))}
                </div>
            </div>
            
            <Email password={gameInfo.gameInfo.password} /> </> : null}
            
        </div>
    )
}