import React, {useState, useEffect} from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'


export default function Game(props){
    const game = (props.match.params.id)
    

    useEffect(() => {
        axiosWithAuth().get(`/game/game/${game}`)
        .then(res => {console.log(res)})
        .catch(err => {console.log(err)})
    })
    return(
        null
    )
}