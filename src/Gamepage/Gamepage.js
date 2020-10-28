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

  isGenDisplay = () => {
    if (!this.props.isGenerator) {
      return (
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
      )
    }
  }

  render = () => {
    return (
      <div className="game-page" data-testid="game-page">
        <div className="hints">
          <h2>Hints</h2>

        </div>
        <div className="board">
          <div className="draw-board">
            <h2>draw board</h2>
          <div className="display-word">{this.splitDisplay()}</div>
          </div>
          {this.isGenDisplay()}
        </div>
        <div className="attempts">
          <h2>Attempts</h2>
        <div>{this.mapAttempts()}</div>
        </div>
      </div>
    )
  }
}
