import React from 'react'
import classes from './Error.css'
const Error = (props) => {
    return (
        <div className={classes.errorCard}>
            <button className={`${classes.btn} ${classes.danger}`} onClick={props.playAgain()}> Play Again </button>
        </div>
    )
}
export default Error