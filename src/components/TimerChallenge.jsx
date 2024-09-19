import { useState, useRef } from "react"
import ResultModal from "./ResultModal"

export default function TimerChallange ({title,targetTime}){
    const timmer = useRef()
    const dialog = useRef()
    
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    if(timeRemaining <= 0){
        clearInterval(timmer.current)
        dialog.current.open()
    }

    function reset(){
        setTimeRemaining(targetTime * 1000)
    }

    function startTimer(){
        timmer.current = setInterval(()=>{
            setTimeRemaining(preTimmer => preTimmer - 10)
        }, 10)
    }

    function stopTimer(){
        dialog.current.open()
        clearInterval(timmer.current)
    }
    return (
        <>
           <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} reset={reset}/>
            <section className='challenge'>
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second {targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? stopTimer : startTimer}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
                </p>
                <p className={timerIsActive? 'active':'undefine'}>
                    {timerIsActive ? 'Time is running...' :' Timer inactive'}
                </p>
            </section>
        </>
       
    )
}