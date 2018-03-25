import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Chat extends Component {
  getChildContext () {
    return {
      messages: this.props.messages
    }
  }

  render () {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
};

Chat.propTypes = {
  messages: PropTypes.array,
  children: PropTypes.node
};

Chat.childContextTypes = {
  messages: PropTypes.array
};

export default Chat;
