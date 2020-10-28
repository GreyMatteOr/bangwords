import React, {Component} from 'react';
import './WordSelector.css';

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

  verifyCredentials = (e) => {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    // return (
    //   <div className="selection-page">
    //     <h2>Type a word for your opponent to guess!</h2>
    //     <form>
    //       <label>
    //         <input type="text" name="name" onChange={this.updateChange} />
    //       </label>
    //       <input
    //         type="submit"
    //         value="Submit"
    //         onClick={(e) => {
    //           this.verifyCredentials(e)
    //           }}
    //       />
    //     </form>
    //   </div>
    // )
    return (
      <div className="selection-page" data-testid="word-selector">
        <h2>Your opponent is thinking of a word...</h2>
      </div>
    )
  }
}
