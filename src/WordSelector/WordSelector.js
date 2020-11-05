import React, {Component} from 'react';
import loading from '../assets/loading.png';
import PropTypes from 'prop-types';
import './WordSelector.scss';

export class WordSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      guessWord: ''
    }
  }

  updateChange = (e) => {
    e.preventDefault();
    this.setState({guessWord: e.target.value})
  }

  makeWordToGuess = (e) => {
    e.preventDefault();
    this.props.makeWordToGuess(this.state.guessWord)
  }

  render() {
    if (this.props.isGenerator && !this.props.hasWord) {
      return (
        <div className="selection-page" data-testid="word-generator">
          <h2><em>Type a word for your opponent to guess!</em></h2>
          <form>
            <label>
              <input
                type="text"
                className="set-word"
                onChange={this.updateChange}
                placeholder="Set Word or Phrase"
              />
            </label>
            <input
              id='wordSubmit'
              type="submit"
              value="Submit"
              placeholder="Submit"
              onClick={(e) => {
                this.makeWordToGuess(e)
              }}
            />
          </form>
        </div>
      )
    } else if (this.props.isGenerator || !this.props.hasGenerator) {
      return (
        <div className="selection-page" data-testid="word-guesser">
          <h2><em>Waiting for other players to join...</em></h2>
          <img src={loading} alt="Loading image" className='Loading'/>
        </div>
      );
    } else {
      return (
        <div className="selection-page" data-testid="word-guesser">
          <h2><em>Your opponent is thinking of a word...</em></h2>
          <img src={loading} alt="Loading image" className='Loading'/>
        </div>
      )
    }
  }
}


WordSelector.propType = {
  isGenerator: PropTypes.bool,
  hasGenerator: PropTypes.bool,
  hasWord: PropTypes.bool,
  makeWordToGuess: PropTypes.func,
}
