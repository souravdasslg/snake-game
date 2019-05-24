import React,{Component} from 'react'
import classes from './GameArea.css'
import {randomBetweenRange} from '../../utilities/utilities'
class GameArea extends Component {
    snake = [{x:100,y:10},{x:90,y:10},{x:80,y:10}]
    canvas
    ctx
    currentMovingDirection = 'Right'
    food
    isFoodPresent = false
    drawSnake = () => {
        // console.log('Draw Snake',this.snake)
        this.ctx.clearRect(0,0,500,500)
        this.placeFood()
        for(let i = 0;i<this.snake.length;i++){
            this.ctx.fillStyle = (i===0) ?'white':'red'
            console.log(this.ctx.fillStyle)
            this.ctx.fillRect(this.snake[i].x,this.snake[i].y,10,10)
            this.ctx.strokeStyle = 'blue'
            this.ctx.strokeRect(this.snake[i].x,this.snake[i].y,10,10)
        }
    }
    advanceSnake = () => {
        this.snake.unshift(this.getNewHead())
        if(this.snake[0].x===this.food.x && this.snake[0].y ===this.food.y) {
            this.isFoodPresent = false
            this.placeFood()
        } else {
            this.snake.pop()
        }
        console.log('Food Position',this.food.x,this.food.y)
        console.log('Snake Head',this.snake[0].x,this.snake[0].y)
        this.drawSnake()
    }
    getNewHead = () => {
        console.log(this.currentMovingDirection)
        let x = this.snake[0].x
        let y = this.snake[0].y
        if(this.currentMovingDirection === 'Up') y -= 10
        if(this.currentMovingDirection === 'Down')  y += 10
        if(this.currentMovingDirection === 'Left') x -=10
        if(this.currentMovingDirection === 'Right') x +=10
        return {x,y}
    }
    placeFood = () => {
        if(!this.isFoodPresent) {
        let randomX = randomBetweenRange(0,400)
        let randomY = randomBetweenRange(0,400)
        this.ctx.fillStyle = 'orange'
        //console.log(this.ctx.fillStyle)
        this.ctx.fillRect(randomX,randomY,10,10)
        this.ctx.strokeStyle = 'blue'
        this.ctx.strokeRect(randomX,randomY,10,10)
        this.food = {x:randomX,y:randomY}
       // console.log('Food',this.food)
        this.isFoodPresent = true
        } else {
        this.ctx.fillStyle = 'orange'
        this.ctx.fillRect(this.food.x,this.food.x,10,10)
        this.ctx.strokeStyle = 'blue'
        this.ctx.strokeRect(this.food.x,this.food.x,10,10)
        }
    }
    handleKeyPress = (event) => {
        
        if(event.key==='ArrowUp' && this.currentMovingDirection !== 'Down') {
            this.currentMovingDirection = 'Up'
            // console.log(event)
            this.advanceSnake()
        } else if (event.key==='ArrowDown' && this.currentMovingDirection !== 'Up') {
            this.currentMovingDirection = 'Down'
            // console.log(event)
            this.advanceSnake()
        } else if (event.key ==='ArrowRight' && this.currentMovingDirection !=='Left') {
            this.currentMovingDirection = 'Right'
            // console.log(event)
            this.advanceSnake()
        } else if (event.key === 'ArrowLeft' && this.currentMovingDirection !== 'Right') {
            this.currentMovingDirection = 'Left'
            console.log(event)
            this.advanceSnake()
        } else {

        }
    }
    componentDidMount() {
        document.addEventListener('keydown',this.handleKeyPress)
        this.canvas = this.refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.drawSnake()
    }
    render() {
        return (
            <div>
               <canvas height='400' width='400' className={classes.Canvas} ref='canvas'/> 
            </div>
        )
    }
}
export default GameArea