import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Chat.css';

export class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newMessage: ''
    }
    this.messagesEnd = React.createRef()
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage = (e) => {
    e.preventDefault();
    this.props.sendMessage(this.state.newMessage)
    document.querySelector('#chat-input').value = '';
  }

  updateNewMessage = (e) => {
    e.preventDefault();
    this.setState({newMessage: e.target.value})
  }

  mapChat = () => {
    console.log('Chat',this.props.chat)
    return this.props.chat.map((message, i) => <p key={i}>{message}</p>)
  }

  render = () => {
    return (
      <div className="chat">
        {this.mapChat()}
        <div
          style={{ float:"left", clear: "both" }}
          ref={ this.messagesEnd }>
        </div>
        <form>
          <input
            id="chat-input"
            type="text"
            onChange={this.updateNewMessage}
          />
          <input
            type='submit'
            value='Send'
            onClick={this.sendMessage}
          />
        </form>
        {console.log('reached the end')}

      </div>
    )
  }
}

Chat.propType = {
  sendMessage: PropTypes.func,
  chat: PropTypes.array
  // display: PropTypes.array,
  // isGenerator: PropTypes.bool,
}
