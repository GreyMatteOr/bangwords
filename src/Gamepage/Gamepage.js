import React, {Component} from 'react';
import './Gamepage.css';

export class Gamepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hints: [],
      correctGuesses: [],
      attempts: [],
      currentGuess: ''
    }
  }

  updateChange = (e) => {
    e.preventDefault();
    this.setState({currentGuess: e.target.value})
  }


  makeGuess = (e) => {
    e.preventDefault();
    // console.log("WordSelector -> makeWordToGuess -> this.state.guessWord", this.state.guessWord)
    this.props.makeGuess(this.state.currentGuess)
  }

  mapAttempts = () => {
    return this.props.attempts.map(attempt => {
      return <p>{attempt}</p>
    })
  }

  splitDisplay = () => {
    return this.props.display.map(tile => {
      return <p>{tile}</p>
    })
  }

  render = () => {
    return (
      <div className="game-page" data-testid="game-page">
        <div className="hints">Hints

        </div>
        <div className="board">
          <div className="draw-board">
            <h1>draw board</h1>
          <div className="display-word">{this.splitDisplay()}</div>
          </div>
        <form>
          <label> 
            <input type="text" name="word" className="word-input" placeholder="letter/word" onChange={this.updateChange} />
          </label>
          <input 
          type="submit" 
          value="Guess" 
          data-testid='word-submit-button' 
          onClick={(e) => {
              this.makeGuess(e)
              }}
          />
        </form>
        </div>
        <div className="attempts">Attempts
        <div>{this.mapAttempts()}</div>
        </div>
      </div>
    )
  }
}
