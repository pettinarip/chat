import React, { Component } from 'react';
import Chat from './components/Chat';
import ChatMessages from './components/ChatMessages';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

import styles from './styles/App';

class App extends Component {
  state = {
    messages: [{ id: 1, text: 'Hello!' }, { id: 2, text: 'Welcome', isFromUser: true }]
  }

  constructor (props) {
    super(props);
    this.handleMachineInputSubmit = this.handleMachineInputSubmit.bind(this);
    this.handleUserInputSubmit = this.handleUserInputSubmit.bind(this);
  }

  handleMachineInputSubmit (value) {
    this.handleInputSubmit(value, false);
  }

  handleUserInputSubmit (value) {
    this.handleInputSubmit(value, true);
  }

  handleInputSubmit (value, isFromUser) {
    const { messages } = this.state;
    const newMessage = { id: messages.length + 1, text: value, isFromUser };
    this.setState({
      messages: [...messages, newMessage ]
    });
  }

  render () {
    const { messages } = this.state;

    return (
      <div style={styles}>
        <Chat messages={messages}>
          <ChatMessages renderMessage={
            message => (
              message.isFromUser
                ? <ChatMessage key={message.id} align='right' message={message} />
                : <ChatMessage key={message.id} align='left' message={message} />
            )
          } />
          <hr />
          <ChatInput onSubmit={this.handleMachineInputSubmit} />
          <ChatInput onSubmit={this.handleUserInputSubmit} />
        </Chat>
      </div>
    );
  }
};

export default App;
