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
    let theKey = 0;
    return this.props.attempts.map(attempt => {
      theKey += 1;
      return <p key={theKey}>{attempt}</p>
    })
  }

  splitDisplay = () => {
    let theKey = 0;
    let theTestId = 0;
    return this.props.display.map(tile => {
      theKey += 1;
      theTestId += 1;
      return <p data-testid={`${theTestId}`} key={theKey}>{tile}</p>
    })
  }

  isGenDisplay = () => {
    if (!this.props.isGenerator) {
      return (
        <form>
        <label> 
          <input type="text" name="word" className="word-input" placeholder="Letter or Word" onChange={this.updateChange} />
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
            <h2>Draw Board</h2>
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
