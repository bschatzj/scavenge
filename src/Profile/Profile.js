import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'


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

    useEffect(() => {
        axiosWithAuth().get('https://salty-peak-24943.herokuapp.com/api/profile/games/1')
            .then(res => {
                console.log(res)
                setGames(res.data.gameList)
            })
            .catch(err => {
                console.log(err)
            })

            axiosWithAuth().get('https://salty-peak-24943.herokuapp.com/api/games/games/all')
            .then(res => {
                console.log(res)
                setPublicGames(res.data.games)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const CreateGame = () => {
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

    return (
        <div>
            <div style={{ position: "absolute", left: "64%", height: "50%", display: "flex", flexDirection: "column", alignItems: "center", width: "35%", borderLeft: "5px solid black" }}>
                <h1>My Current Games</h1>
                {games.length > 0 ?
                    <div>{games.map(game => (
                        <Link style={{ fontSize: "3rem", color: "black", textDecoration: 'None', }} to={game.game}>
                            <div >
                                {game.game}
                            </div>
                        </Link>
                    ))}
                    </div>
                    : <h1>Not a part of any games yet....</h1>}
            </div>
            <div style={{ position: "absolute", left: "64%", top: "50%", height: "50%", display: "flex", flexDirection: "column", alignItems: "center", width: "35%", borderLeft: "5px solid black" }}>
                    

            </div>
            {starting ? null : <button onClick={() => { setStarting(true) }}>Create Game</button>}
            {starting ?
                <>
                    <form >
                        <label>Game Title</label>
                        <input
                            onChange={handleChange}
                            name="title"
                            value={gameInfo.title} />
                        <label>Private?</label>
                        <input
                            onChange={handleChecked}
                            type='checkbox'
                            name="private"
                            value={gameInfo.private} />
                        {gameInfo.private ?
                            <>
                                <label>password</label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    value={gameInfo.password} />
                            </>
                            : null}

                    </form>
                    <button onClick={() => { CreateGame() }}>Start Game!</button>
                </>
                : null}

        </div>
    )
}