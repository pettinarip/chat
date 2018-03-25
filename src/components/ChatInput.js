import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatInput extends Component {
  state = {
    value: '',
    historyIndex: -1
  }

  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange (event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown (event) {
    const { historyIndex, value } = this.state;
    const { messages } = this.context;
    const { onSubmit } = this.props;

    if (event.key === 'Enter' && value !== '') {
      if(onSubmit) {
        onSubmit(value, event);
      }

      this.setState({
        value: '',
        historyIndex: -1
      });
    }

    if (event.key === 'ArrowUp' && messages.length) {
      event.preventDefault();
      const index = historyIndex === -1
        ? messages.length - 1
        : historyIndex > 0
          ? historyIndex - 1
          : historyIndex;

      this.setState({
        value: messages[index].text,
        historyIndex: index
      });
    }

    if (event.key === 'ArrowDown' && messages.length) {
      event.preventDefault();
      const index = historyIndex === -1
        ? historyIndex
        : historyIndex < messages.length - 1
          ? historyIndex + 1
          : -1;

      this.setState({
        value: index > -1 ? messages[index].text : '',
        historyIndex: index
      });
    }
  }

  render () {
    return (
      <div>
        <input
          type='text'
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      </div>
    );
  }
}

ChatInput.propTypes = {
  onSubmit: PropTypes.func
};

ChatInput.contextTypes = {
  messages: PropTypes.array
};

export default ChatInput;
