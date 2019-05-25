import React from 'react'
import classes from './DashBoard.css'
const DashBoard = (props) => {
   return (
       <div className={classes.dashboardCard}>
       <button className={`${classes.btn} ${classes.success}`} onClick={props.startGameAction()}>Start</button>
       </div>
   )
}
export default DashBoard