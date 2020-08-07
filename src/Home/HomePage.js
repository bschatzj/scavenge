import React from 'react'
import {useScroll} from '../utils/UseScroll'
import Child from './HomeImages/child';
import Window from '../utils/Window';
import Exclamation from './HomeImages/exclamation'
import Mail from './HomeImages/mail'
import Couple from './HomeImages/love'
import Man from './HomeImages/man'
import Woman from './HomeImages/woman'

export default function HomePage(){
    const scroll = useScroll()
    const window = Window()

    const top = (scroll.y/window.height)

    console.log(window)
    return(
        <div style={{height: window.height * 5.2, display: "flex", justifyContent: "center"}}>
            <Exclamation top ={scroll.y/window.height} />
            <Child  top ={scroll.y/window.height} />
            <Mail  top ={scroll.y/window.height} />
            <Couple  top ={scroll.y/window.height} />
            <Mail  top ={scroll.y/window.height - 1.3} left={scroll.y/window.height}/>
            <Mail  top ={scroll.y/window.height - 1.3} right={scroll.y/window.height}/>
            <Man top ={scroll.y/window.height - 1.3} right={scroll.y/window.height}/>
            <Woman top ={scroll.y/window.height - 1.3} right={scroll.y/window.height}/>
            <img src={require('./HomeImages/polaroid.png')} style={{height: "40vh", position: 'fixed', left: "10%", top:`${top * 100 - 370}vh` }} />
            <img src={require('./HomeImages/polaroid.png')} style={{height: "40vh", position: 'fixed',top:`${top * 100 - 370}vh` }} />
            <img src={require('./HomeImages/polaroid.png')} style={{height: "40vh", position: 'fixed', right: "10%", top:`${top * 100 - 370}vh`}} />
            <img src={require('./HomeImages/polaroid.png')} style={{height: "40vh", position: 'fixed', top:`${top * 100 - 410}vh`}} />
        </div>
    )
}