import React, {useState, useEffect} from 'react'
import './Countdown.css'

export default function Countdown(props){
    const calculateTimeLeft = () => {
        const difference = props.endTime - Date.now();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: (Math.floor(difference / (1000 * 60 * 60 * 24)) ? Math.floor(difference / (1000 * 60 * 60 * 24)) : '0'),
            hours: (Math.floor((difference / (1000 * 60 * 60)) % 24) ? Math.floor((difference / (1000 * 60 * 60)) % 24) : '0'),
            minutes: (Math.floor((difference / 1000 / 60) % 60) ? Math.floor((difference / 1000 / 60) % 60) : '0'),
            seconds: (Math.floor((difference / 1000) % 60) ? Math.floor((difference / 1000) % 60) : '0'),
          };
        }
    
        return timeLeft;
      };

    
      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });

      useEffect(() => {
        if(timeLeft <= 0){
            props.setVoting(true)
        }
      },[]);
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
    
        timerComponents.push(
          <div className="TimeDiv">
            <h1>{timeLeft[interval]} </h1>
            <h1>{interval}{" "} </h1>
          </div>
        );
      });
      return (
        <div>
          {timerComponents.length ? <div className="TimeContain"> <h1>Time Left:</h1> {timerComponents} </div> : <h1>TIME TO VOTE!!!</h1>}
        </div>
      );
}