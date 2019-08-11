import React, { Component } from "react"
import classes from "./GameArea.css"
import {
  randomBetweenRange,
  findIndexOfObject
} from "../../utilities/utilities"
//import findIndex from 'lodash.findindex'
import ScoreCard from "./ScoreCard/ScoreCard"
import DashBoard from "./DashBoard/DashBoard"
import Error from "./Error/Error"
class GameArea extends Component {
  initialSnakeArray = [{ x: 100, y: 10 }, { x: 90, y: 10 }, { x: 80, y: 10 }]
  snake = [{ x: 100, y: 10 }, { x: 90, y: 10 }, { x: 80, y: 10 }]
  canvas
  ctx
  currentMovingDirection = "Right"
  food
  isFoodPresent = false
  gameSpeed = 100
  state = {
    score: 0,
    gameStatus: "notReady"
  }
  intervalReference
  drawSnake = () => {
    // console.log('Draw Snake',this.snake)
    this.ctx.clearRect(0, 0, 500, 500)
    this.placeFood()
    for (let i = 0; i < this.snake.length; i++) {
      this.ctx.fillStyle = i === 0 ? "white" : "red"
      this.ctx.fillRect(this.snake[i].x, this.snake[i].y, 10, 10)
      this.ctx.strokeStyle = "blue"
      this.ctx.strokeRect(this.snake[i].x, this.snake[i].y, 10, 10)
    }
  }
  advanceSnake = () => {
    this.snake.unshift(this.getNewHead())
    if (this.snake[0].x === this.food.x && this.snake[0].y === this.food.y) {
      this.increaseScore()
      this.isFoodPresent = false
      this.placeFood()
    } else {
      this.snake.pop()
    }
    if (this.crossedEdges() || this.snakeCollidedWithItself()) {
      console.log("Error Occurred")
      clearInterval(this.intervalReference)
      this.setState({ gameStatus: "error" })
    }
    this.drawSnake()
  }
  crossedEdges = () => {
    if (
      this.snake[0].x >= 400 ||
      this.snake[0].x <= 0 ||
      this.snake[0].y >= 400 ||
      this.snake[0].y <= 0
    ) {
      return true
    } else {
      return false
    }
  }
  snakeCollidedWithItself = () => {
    let snakeBodyWithOutHead = [...this.snake].slice(1)
    if (findIndexOfObject(snakeBodyWithOutHead, this.snake[0]) === -1) {
      return false
    } else {
      return true
    }
  }
  getNewHead = () => {
    let x = this.snake[0].x
    let y = this.snake[0].y
    if (this.currentMovingDirection === "Up") y -= 10
    if (this.currentMovingDirection === "Down") y += 10
    if (this.currentMovingDirection === "Left") x -= 10
    if (this.currentMovingDirection === "Right") x += 10
    return { x, y }
  }
  increaseScore = () => {
    this.setState(prevState => {
      return { score: prevState.score + 10 }
    })
  }
  placeFood = () => {
    if (!this.isFoodPresent) {
      let randomX = randomBetweenRange(0, 400)
      let randomY = randomBetweenRange(0, 400)
      this.ctx.fillStyle = "orange"
      this.ctx.fillRect(randomX, randomY, 10, 10)
      this.ctx.strokeStyle = "blue"
      this.ctx.strokeRect(randomX, randomY, 10, 10)
      this.food = { x: randomX, y: randomY }
      this.isFoodPresent = true
    } else {
      this.ctx.fillStyle = "orange"
      this.ctx.fillRect(this.food.x, this.food.y, 10, 10)
      this.ctx.strokeStyle = "blue"
      this.ctx.strokeRect(this.food.x, this.food.y, 10, 10)
    }
  }
  handleKeyPress = event => {
    if (event.key === "ArrowUp" && this.currentMovingDirection !== "Down") {
      this.currentMovingDirection = "Up"
    } else if (
      event.key === "ArrowDown" &&
      this.currentMovingDirection !== "Up"
    ) {
      this.currentMovingDirection = "Down"
    } else if (
      event.key === "ArrowRight" &&
      this.currentMovingDirection !== "Left"
    ) {
      this.currentMovingDirection = "Right"
    } else if (
      event.key === "ArrowLeft" &&
      this.currentMovingDirection !== "Right"
    ) {
      this.currentMovingDirection = "Left"
    } else {
    }
  }
  startGameHandler = () => {
    this.setState({ gameStatus: "started" }, () => {
      this.canvas = this.refs.canvas
      this.ctx = this.canvas.getContext("2d")
      this.drawSnake()
      this.intervalReference = setInterval(this.advanceSnake, this.gameSpeed)
    })
  }
  playAgainHandler = () => {
    this.setState({ gameStatus: "started", score: 0 }, () => {
      this.canvas = this.refs.canvas
      this.ctx = this.canvas.getContext("2d")
      this.snake = [...this.initialSnakeArray]
      this.drawSnake()
      this.currentMovingDirection = "Right"
      this.isFoodPresent = false
      this.intervalReference = setInterval(this.advanceSnake, this.gameSpeed)
    })
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }
  componentWillUpdate() {}
  render() {
    return (
      <div className={classes.GameArea}>
        {this.state.gameStatus === "notReady" ? (
          <DashBoard startGameAction={() => this.startGameHandler} />
        ) : null}
        {this.state.gameStatus === "started" ? (
          <canvas
            height="400"
            width="400"
            className={classes.Canvas}
            ref="canvas"
          />
        ) : null}
        {this.state.gameStatus === "error" ? (
          <Error playAgain={() => this.playAgainHandler} />
        ) : null}
        <ScoreCard score={this.state.score} />
      </div>
    )
  }
}
export default GameArea
