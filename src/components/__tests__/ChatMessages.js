import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import ChatMessages from '../ChatMessages';
import ChatMessage from '../ChatMessage';
import Chat from '../Chat';

describe('ChatMessages', () => {
  it('has to render one ChatMessage for each message in messages context', () => {
    const messages = [{ id: 1, text: 'm1' }, { id: 2, text: 'm2' }];
    const wrapper = mount(
      <Chat messages={messages}>
        <ChatMessages />
      </Chat>
    );
    expect(wrapper.find(ChatMessage).length).toEqual(messages.length);
  });

  it('uses renderMessage to render each message', () => {
    const messages = [{ id: 1, text: 'm1' }, { id: 2, text: 'm2' }];
    const wrapper = mount(
      <Chat messages={messages}>
        <ChatMessages renderMessage={(message) => {
          return (
            <h2 key={message.id}>{message.text}</h2>
          );
        }} />
      </Chat>
    );
    expect(wrapper.find('h2').length).toEqual(messages.length);
  });
});
