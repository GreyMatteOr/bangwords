import React, {Component} from 'react';
import PropTypes from 'prop-types';
import crown from '../assets/crown.png';
import loading from '../assets/loading.png';
import lose from '../assets/lose.png';
import win from '../assets/win.png';
import { Chat } from '../Chat/Chat.js';
import './Gamepage.scss';

export class Gamepage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hints: [],
      correctGuesses: [],
      currentGuess: ''
    }
  }

  createPlayerCard = ( name, { score, attempts, didWin, key } ) => {
    let image = {true: win, false: lose, null: loading, gen: crown}[didWin]
    let isSpinning = didWin === null ? 'spin' : '' ;
    let attemptsText = didWin === 'gen' ? '' : `${attempts} left`
    return (
      <div
        className='player-card'
        key={key}
      >
        <p>{name}:</p>
        <p>{score} pts</p>
        <p>{attemptsText}</p>
        <img
          className={isSpinning}
          src={image}
        />
      </div>
    )
  }

  createWinnerMessage = () => {
    if (this.props.isOver) {
      let messages = this.props.winners.concat();
      let wordWas = messages.pop();
      let innerHTML = messages.map((msg, i) => <p key={i}>{msg}</p>);
      return(
        <div className='endgame-overlay'>
        <h2>GAME!</h2>
        <h3>The word was: {wordWas}</h3>
          {innerHTML}
        </div>
      )
    } else {
      return <div className='hidden'></div>
    }
  }

  isGenDisplay = () => {
    if (!this.props.isGenerator) {
      return (
        <div className='guessForm'>
          <form className="guess-input">
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
        </div>
      )
    }
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

  updateChange = (e) => {
    e.preventDefault();
    this.setState({currentGuess: e.target.value})
  }

  render = () => {
    let playerDisplay = this.props.playerNames.map( (name, i) => {
      let playerInfo = { ...this.props.scores[name], key: i}
      return this.createPlayerCard(name, playerInfo)
    })
    let endGameOverlay = this.createWinnerMessage();
    return (
      <div className="game-page" data-testid="game-page">
        {endGameOverlay}
        <div className="draw-board">
          <h2><em>Game Board</em></h2>
          <h3><em>Remaining Guesses: {this.props.attemptsLeft}</em></h3>
          <div className="display-word">{this.splitDisplay()}</div>
        </div>
          <Chat
            className="chat"
            chat={this.props.chat}
            sendMessage={this.props.sendMessage}
          />
          <section className='bottom-mid'>
              <div className="players">
                <h2>
                  <em>Current Players</em>
                </h2>
                {playerDisplay}
              </div>
              {this.isGenDisplay()}
          </section>
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

Gamepage.propTypes = {
  attempts: PropTypes.array,
  attemptsLeft: PropTypes.number, 
  chat: PropTypes.array,
  display: PropTypes.array,
  isGenerator: PropTypes.bool,
  isOver: PropTypes.bool,
  makeGuess: PropTypes.func,
  playerName: PropTypes.array,
  scores: PropTypes.object,
  sendMessage: PropTypes.func,
  winners: PropTypes.array
}
