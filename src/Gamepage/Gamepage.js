import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Chat } from '../Chat/Chat.js'
import './Gamepage.css';

export class Gamepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hints: [],
      correctGuesses: [],
      currentGuess: ''
    }
  }

  updateChange = (e) => {
    e.preventDefault();
    this.setState({currentGuess: e.target.value})
  }

  makeGuess = (e) => {
    e.preventDefault();
    this.props.makeGuess(this.state.currentGuess)
    document.querySelector('.word-input').value = '';
  }

  mapAttempts = () => {
    return this.props.attempts.map((attempt, i) => {
      return <p key={i}>{attempt}</p>
    })
  }

  splitDisplay = () => {
    return this.props.display.map((tile, i) => {
      return <p data-testid={i} key={i}>{tile}</p>
    })
  }

  isGenDisplay = () => {
    if (!this.props.isGenerator) {
      return (
        <form>
        <label>
          <input
            type="text"
            name="word"
            className="word-input"
            placeholder="Letter or Word"
            onChange={this.updateChange}
          />
        </label>
        <input
          id='guess-button'
          type="submit"
          value="Guess"
          data-testid='word-submit-button'
          onClick={(e) => this.makeGuess(e)}
        />
      </form>
      )
    }
  }

  render = () => {
    return (
      <div className="game-page" data-testid="game-page">
          <div className="draw-board">
            <h2><em>Draw Board</em></h2>
            <h3><em>Remaining Guesses: {this.props.remainingGuesses}</em></h3>
          <div className="display-word">{this.splitDisplay()}</div>
          </div>
          {this.isGenDisplay()}
        <div className="chat">
          <Chat
            chat={this.props.chat}
            sendMessage={this.props.sendMessage}
          />
        </div>
        <div className="players">
          <h2>
            <em>Current Players</em>
          </h2>
          {this.props.playerNames.map(name => <h3>{name}</h3>)}
        </div>
        <div className="attempts">
          <h2>
            <em>Attempts</em>
          </h2>
          <div>
            {this.mapAttempts()}
          </div>
        </div>
      </div>
    )
  }
}

Gamepage.propType = {
  makeGuess: PropTypes.func,
  attempts: PropTypes.array,
  display: PropTypes.array,
  isGenerator: PropTypes.bool,
}
