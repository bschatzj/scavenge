import React, { useEffect, useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { Link } from 'react-router-dom'
import User from './User'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Date.css'
import { useHistory } from "react-router-dom";
import './Profile.css'

export default function Profile() {
    const [user, setUser] = useState('')
    const [games, setGames] = useState([])
    const [publicGames, setPublicGames] = useState([])
    const [gameInfo, setGameInfo] = useState({
        title: "",
        password: "",
        private: false,
        end_date: "",
        id: localStorage.getItem('id')
    })
    const [starting, setStarting] = useState(false)
    const [visible, setVisible] = useState(true)
    const [displayDate, setDisplayDate] = useState('')
    console.log(user)
    const History = useHistory()

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
        axiosWithAuth().post(`https://salty-peak-24943.herokuapp.com/api/game/joingame`, { 'name': user, 'user': parseInt(gameInfo.id), 'game': game })
            .then(res => { History.push(`/game/${game}`) })
            .catch(err => { console.log(err) })
    }

    const handleChange = e => {
        let name = e.target.name;
        setGameInfo({ ...gameInfo, [name]: e.target.value });
        console.log(gameInfo)
    };

    const handleDate = date => {
        const newDate = Date.parse(date)
        console.log(newDate)
        setDisplayDate(date)
        setGameInfo({ ...gameInfo, end_date: newDate })
    }

    const handleChecked = e => {
        setGameInfo({ ...gameInfo, private: e.target.checked });
        console.log(gameInfo)
    };

    return (
        <div className="ProfilePage">
            <User setVisible={setVisible} user={user} setUser={setUser} />
            <div className="MyGames">
                <h1>My Current Games</h1>
                {games.length > 0 ?
                    <div>{games.map(game => (
                        <Link className="Link" to={`/game/${game.game}`}>
                            <div >
                                {game.game}
                            </div>
                        </Link>
                    ))}
                    </div>
                    : <h1>Not a part of any games yet....</h1>}
            </div>
            <div className="OtherGames">

                <h1>Current Open Games</h1>
                {publicGames.length > 0 ?
                    <div>{publicGames.map(game => (
                        <Link className="Link" to={`/game/${game.game_title}`}>
                            <div >
                                {game.game_title}
                            </div>
                        </Link>
                    ))}
                    </div>
                    : <h1>No public games currently available....</h1>}
            </div>


            {visible ? <div className="Profile">
                {starting ? null : <button className="ProfileButton" onClick={() => { setStarting(true) }}>Create Game</button>}
                {starting ?
                    <>
                        <form className="ProfileForm" >
                            <div className="ProfileFormInputArea">
                                <label className="ProfileFormLabel">Game Title</label>
                                <input
                                    className="ProfileFormInput"
                                    onChange={handleChange}
                                    name="title"
                                    value={gameInfo.title} />
                            </div>
                            <div className="ProfileFormInputArea">
                                <label className="ProfileFormLabel">End Date</label>
                                <DatePicker id="date" name="end_date" selected={displayDate} onChange={handleDate} style={{ fontSize: "2.5rem" }} />
                            </div>
                            <div className="ProfileFormInputArea">
                                <label className="ProfileFormLabel">Private?</label>
                                <input
                                    style={{ transform: "scale(3)" }}
                                    onChange={handleChecked}
                                    type='checkbox'
                                    name="private"
                                    value={gameInfo.private} />
                            </div>
                            {gameInfo.private ?
                                <div className="ProfileFormInputArea" >
                                    <label className="ProfileFormLabel" >Password</label>
                                    <input
                                        className="ProfileFormInput"
                                        onChange={handleChange}
                                        name="password"
                                        value={gameInfo.password} />
                                </div>
                                : null}
                            <h1 className="FormButtons" onClick={() => { CreateGame() }}>Start Game!</h1>
                            <h1 className="FormButtons" onClick={() => { setStarting(false) }}>Cancel</h1>
                        </form>

                    </>
                    : null}
            </div>
                : null}


            <div className="MobileGames">
                <div className="MyMobileGames">
                    <h1 className="MobileTitle">My Current Games</h1>
                    {games.length > 0 ?
                        <div>{games.map(game => (
                            <Link className="Link" to={`/game/${game.game}`}>
                                <div >
                                    {game.game}
                                </div>
                            </Link>
                        ))}
                        </div>
                        : <h1>Not a part of any games yet....</h1>}
                </div>
                <div className="OtherMobileGames">

                    <h1 className="MobileTitle">Current Open Games</h1>
                    {publicGames.length > 0 ?
                        <div>{publicGames.map(game => (
                            <Link className="Link" to={`/game/${game.game_title}`}>
                                <div>
                                    {game.game_title}
                                </div>
                            </Link>
                        ))}
                        </div>
                        : <h1 className="MobileTitle">No public games currently available....</h1>}
                </div>
            </div>
        </div>
    )
}