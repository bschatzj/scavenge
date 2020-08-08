import React from 'react'
import { useScroll } from '../utils/UseScroll'
import Child from './HomeImages/child';
import Window from '../utils/Window';
import Exclamation from './HomeImages/exclamation'
import Mail from './HomeImages/mail'
import Couple from './HomeImages/love'
import Man from './HomeImages/man'
import Woman from './HomeImages/woman'

export default function HomePage() {
    const scroll = useScroll()
    const window = Window()

    const top = (scroll.y / window.height)
    console.log(top)
    console.log(window)
    return (
        <div style={{ height: window.height * 6.5, display: "flex", justifyContent: "center" }}>
            {top < .2 ? <h1 style={{ fontSize: '4rem', top: "80%", position: "absolute", }}>Welcome to Scavenge With Friends!</h1> : null}
            <Exclamation top={scroll.y / window.height} />
            <Child top={scroll.y / window.height} size="50vh" />
            {top > .6 && top < 1.4 ? <h1 style={{ fontSize: '4rem', top: "140%", position: "absolute", width: "35%", left: "65%", textAlign: "center" }}>This is how it works...</h1> : null}
            {top > .9 && top < 1.7 ? <h1 style={{ fontSize: '4rem', top: "170%", position: "absolute", width: "35%", left: "0%", textAlign: "center" }}>You invite a friend or two...</h1> : null}
            {top > 1.2 && top < 2 ? <h1 style={{ fontSize: '4rem', top: "200%", position: "absolute", width: "35%", left: "65%", textAlign: "center" }}>Everyone adds a few tasks to a list...</h1> : null}
            {top > 2.6 && top < 3.2 ? <h1 style={{ fontSize: '4rem', top: "300%", position: "absolute", width: "30%", left: "35%", textAlign: "center" }}>Then the list gets sent to everyone...</h1> : null}
            {top > 3 && top < 3.45 ? <h1 style={{ fontSize: '4rem', top: "350%", position: "absolute", width: "30%", left: "35%", textAlign: "center" }}>"Find the cutest animal in nature..."</h1> : null}
            {top > 4.2 && top < 4.68 ? <h1 style={{ fontSize: '4rem', top: "440%", position: "absolute", width: "60%", left: "20%", textAlign: "center" }}>Everyone votes for their favorite...</h1> : null}
            {top > 4.4 && top < 4.68 ? <h1 style={{ fontSize: '4rem', top: "470%", position: "absolute", width: "60%", left: "20%", textAlign: "center" }}>And the winner is...</h1> : null}
            {top < 1.5 ? <Mail top={scroll.y / window.height} /> : null}
            <Couple top={scroll.y / window.height} size="50vh" />
            {top < 3.38 && top > 1.7 ? <Mail top={scroll.y / window.height - 1.3} left={scroll.y / window.height} /> : null}
            {top < 3.38 && top > 1.7 ? <Mail top={scroll.y / window.height - 1.3} right={scroll.y / window.height} /> : null}
            <Man top={scroll.y / window.height - 1.3} left={"5%"} right={scroll.y / window.height} size="50vh" />
            <Woman top={scroll.y / window.height - 1.3} left={"75%"} right={scroll.y / window.height} size="50vh" />
            <img src={require('./HomeImages/polaroid.png')} style={{ height: "40vh", position: 'fixed', left: "5%", top: `${top * 100 - 370}vh` }} alt='' />
            <img src={require('./HomeImages/polaroid.png')} style={{ height: "40vh", position: 'fixed', left: "28%", top: `${top * 100 - 370}vh` }} alt='' />
            <img src={require('./HomeImages/polaroid.png')} style={{ height: "40vh", position: 'fixed', right: "5%", top: `${top * 100 - 370}vh` }} alt='' />
            <img src={require('./HomeImages/polaroid.png')} style={{ height: "40vh", position: 'fixed', top: `${top * 100 - 370}vh`, right: "28%" }} alt='' />
            <Child top={scroll.y / window.height - 3.4} left="60%" size="10vh" />
            <Man top={scroll.y / window.height - 1.6} left={"8%"} right={scroll.y / window.height} size="10vh" />
            <Woman top={scroll.y / window.height - 1.6} left={"30%"} right={scroll.y / window.height} size="10vh" />
            <Couple top={scroll.y / window.height - 1.9} left={"80%"} size="10vh" />
            <img src={require('./HomeImages/animal1.png')} style={{ height: "20vh", position: 'fixed', left: "8%", top: `${top * 100 - 362}vh` }} alt='' />
            <img src={require('./HomeImages/animal2.png')} style={{ height: "20vh", position: 'fixed', left: "30%", top: `${top * 100 - 362}vh` }} alt='' />
            <img src={require('./HomeImages/animal4.png')} style={{ height: "20vh", position: 'fixed', right: "10%", top: `${top * 100 - 362}vh` }} alt='' />
            <img src={require('./HomeImages/animal3.png')} style={{ height: "20vh", position: 'fixed', right: "30%", top: `${top * 100 - 362}vh` }} alt='' />

            <img src={require('./HomeImages/animal3.png')} style={{ height: "50vh", position: 'fixed', top: `${top * 100 - 530}vh` }} alt='' />
            <img src={require('./HomeImages/polaroid.png')} style={{ height: "90vh", position: 'fixed', top: `${top * 100 - 540}vh`}} alt='' />
            <img src={require('./HomeImages/crown.png')} style={{ height: "20vh", position: 'fixed', top: `${top * 100 - 550}vh` }} alt='crown' />
            <Child top={scroll.y / window.height - 4.8} left="30%" size="20vh" />
        </div>
    )
}