import React, {Component} from 'react';
import './Gamepage.css';

export class Gamepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hints: [],
      correctGuesses: [],
      attempts: []
    }
  }

  render() {
    return (
      <div className="game-page" data-testid="game-page">
        <div className="hints">Hints

        </div>
        <div className="board">
          <div className="draw-board">x</div>
        <form>
          <label>
            Letter:
            <input type="text" name="letter" />
          </label>
          <label>
            Word:
            <input type="text" name="word" />
          </label>
          <input type="submit" value="Submit" data-testid='word-submit-button'/>
        </form>
        </div>
        <div className="attempts">Attempts</div>
      </div>
    )
  }
}
