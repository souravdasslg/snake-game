import React,{Component} from 'react'
import classes from './ScoreCard.css'
class ScoreCard extends Component {
    render() {
        return(
            <div className={classes.scoreCard}>
                Score : {this.props.score}
            </div>
        )
    }
}
export default ScoreCard