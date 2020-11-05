import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Chat.scss';

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

  componentDidUpdate = () => {
    console.log('trigger')
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
    return this.props.chat.map((message, i) => <p key={i}>{message}</p>)
  }

  render = () => {
    return (
      <div className="chat chat-box">
        <div className='chat-messages'>
          {this.mapChat()}
          <div
            className="chat-text"
            style={{ float:"bottom", clear: "both" }}
            ref={ this.messagesEnd }>
          </div>
        </div>
        <form className="chat-form">
          <input
            id="chat-input"
            type="text"
            placeholder='Chat'
            onChange={this.updateNewMessage}
          />
          <input
            type='submit'
            value='Send'
            data-testid='Send'
            className='Send'
            onClick={this.sendMessage}
          />
        </form>
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
