import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, reset},ref){
    const dialog = useRef()
    const userLost = remainingTime <= 0
    const formattedTimeReaming = (remainingTime/1000).toFixed(2)
    const score = Math.round((1- remainingTime / (targetTime * 1000)) * 100)

    useImperativeHandle(ref,() => {
        return{
            open() {
                dialog.current.showModal()
            }
        }
    })
    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={reset}>
           {userLost && <h2>You lost</h2>}
           {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stoped the timer with <strong>{formattedTimeReaming} seconds left.</strong></p>
            <form mathod="dialog" onSubmit={reset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal