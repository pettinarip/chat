import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import styles from '../styles/ChatMessages';

class ChatMessages extends Component {
  render () {
    return (
      <div style={styles}>
        { this.context.messages.map(message => {
          return this.props.renderMessage
            ? this.props.renderMessage(message)
            : <ChatMessage align='left' message={message} key={message.id} />
        }) }
      </div>
    );
  }
};

ChatMessages.contextTypes = {
  messages: PropTypes.array
};

ChatMessages.propTypes = {
  renderMessage: PropTypes.func
};

export default ChatMessages;
