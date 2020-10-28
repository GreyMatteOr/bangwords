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


  makeWordToGuess = (e) => {
    e.preventDefault();
    // console.log("WordSelector -> makeWordToGuess -> this.state.guessWord", this.state.guessWord)
    this.props.makeGuess(this.state.currentGuess)
  }

  render() {
    return (
      <div className="game-page" data-testid="game-page">
        <div className="hints">Hints

        </div>
        <div className="board">
          <div className="draw-board">draw board</div>
        <form>
          <label> 
            <input type="text" name="word" className="word-input" placeholder="letter/word" onChange={this.updateChange} />
          </label>
          <input 
          type="submit" 
          value="Guess" 
          data-testid='word-submit-button' 
          onClick={(e) => {
              this.makeWordToGuess(e)
              }}
          />
        </form>
        </div>
        <div className="attempts">Attempts</div>
      </div>
    )
  }
}
