import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import User from './User'

export default function Profile() {
    const [games, setGames] = useState([])
    const [publicGames, setPublicGames] = useState([])
    const [gameInfo, setGameInfo] = useState({
        title: "",
        password: "",
        private: false,
        name: "brendan",
        id: localStorage.getItem('id')
    })
    const [starting, setStarting] = useState(false)
    const [visible, setVisible] = useState(true)


    useEffect(() => {
        axiosWithAuth().get(`https://salty-peak-24943.herokuapp.com/api/profile/games/${localStorage.getItem('id')}`)
            .then(res => {
                console.log(res)
                setGames(res.data.gameList)
            })
            .catch(err => {
                console.log(err)
            })

        axiosWithAuth().get('https://salty-peak-24943.herokuapp.com/api/game/games/all')
            .then(res => {
                console.log(res)
                setPublicGames(res.data.games)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const CreateGame = e => {
        console.log('hi')
        axiosWithAuth().post('https://salty-peak-24943.herokuapp.com/api/game/newgame', gameInfo)
            .then(res => { JoinGame(res.data.title) })
            .catch(err => { console.log(err) })
    }

    const JoinGame = (game) => {
        axiosWithAuth().post(`https://salty-peak-24943.herokuapp.com/api/game/joingame`, { 'name': gameInfo.name, 'user': parseInt(gameInfo.id), 'game': game })
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
    }

    const handleChange = e => {
        let name = e.target.name;
        setGameInfo({ ...gameInfo, [name]: e.target.value });
        console.log(gameInfo)
    };

    const handleChecked = e => {
        setGameInfo({ ...gameInfo, private: e.target.checked });
        console.log(gameInfo)
    };


    console.log(publicGames)
    return (
        <div>
            <User setVisible={setVisible} />
            <div style={{ position: "fixed", left: "64%", height: "40%", display: "flex", flexDirection: "column", alignItems: "center", width: "35%", borderLeft: "5px solid black", overflow: "auto" }}>
                <h1>My Current Games</h1>
                {games.length > 0 ?
                    <div>{games.map(game => (
                        <Link style={{ fontSize: "3rem", color: "black", textDecoration: 'None', }} to={`/game/${game.game}`}>
                            <div >
                                {game.game}
                            </div>
                        </Link>
                    ))}
                    </div>
                    : <h1>Not a part of any games yet....</h1>}
            </div>
            <div style={{ position: "fixed", left: "64%", top: "40%", height: "59%", display: "flex", flexDirection: "column", alignItems: "center", width: "35%", borderLeft: "5px solid black", borderTop: "5px solid black", overflow: "auto" }}>

                <h1>Current Open Games</h1>
                {publicGames.length > 0 ?
                    <div>{publicGames.map(game => (
                        <Link style={{ fontSize: "3rem", color: "black", textDecoration: 'None', }} to={`/game/${game.game_title}`}>
                            <div >
                                {game.game_title}
                            </div>
                        </Link>
                    ))}
                    </div>
                    : <h1>No public games currently available....</h1>}
            </div>
            {visible ? <div style={{ position: "absolute", display: "flex", justifyContent: "center", width: "64%", top: "80%", height: "30%" }}>
                {starting ? null : <button style={{ width: "70%", height: "20%", fontSize: "2rem", backgroundColor: "black", color: "white", border: "none" }} onClick={() => { setStarting(true) }}>Create Game</button>}
                {starting ?
                    <>
                        <form style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "100%", alignItems: "center" }} >
                            <div style={{ width: "70%" }}>
                                <label style={{ fontSize: "2.5rem", padding: "1%", fontWeight: "bold" }}>Game Title</label>
                                <input
                                    style={{ fontSize: "2rem", padding: "1%" }}
                                    onChange={handleChange}
                                    name="title"
                                    value={gameInfo.title} />
                            </div>
                            <div style={{ width: "70%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                <label style={{ fontSize: "2.5rem", padding: "1%", fontWeight: "bold" }}>Private?</label>
                                <input
                                    style={{ transform: "scale(3)", marginLeft: "4rem" }}
                                    onChange={handleChecked}
                                    type='checkbox'
                                    name="private"
                                    value={gameInfo.private} />
                            </div>
                            {gameInfo.private ?
                                <div style={{ width: "70%" }}>
                                    <label style={{ fontSize: "2.5rem", padding: "1%", fontWeight: "bold" }} >Password</label>
                                    <input
                                        style={{ fontSize: "2rem", padding: "1%" }}
                                        onChange={handleChange}
                                        name="password"
                                        value={gameInfo.password} />
                                </div>
                                : null}
                            <h1 style={{ display:"flex", justifyContent:"center", alignItems:"center", width: "70%", height: "20%", fontSize: "2rem", backgroundColor: "black", color: "white", border: "none" }} onClick={() => { CreateGame() }}>Start Game!</h1>
                            <h1 style={{ display:"flex", justifyContent:"center", alignItems:"center", width: "70%", height: "20%", fontSize: "2rem", backgroundColor: "black", color: "white", border: "none" }} onClick={() => { setStarting(false)}}>Cancel</h1>
                        </form>

                    </>
                    : null}
            </div>
                : null}

        </div>
    )
}