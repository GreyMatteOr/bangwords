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
      <div className="game-page">
        <div className="hints">Hints

        </div>
        <div className="board">
        <form>
          <label>
            Letter:
            <input type="text" name="letter" />
          </label>
          <label>
            Word:
            <input type="text" name="word" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
        <div className="attempts">Attempts

        </div>
      </div>
    )
  }
}