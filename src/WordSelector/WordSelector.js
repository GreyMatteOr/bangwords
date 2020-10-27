import React, {Component} from 'react';

export class WordSelector extends Component {
  constructor(props) {
    super(props) 
    
    this.state = {}
  }
  render() {
    return (
      <div className="selection-page">
        <h2>Type a word for your opponent to guess!</h2>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
