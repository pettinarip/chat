import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import Chat from '../Chat';

describe('Chat', () => {
  it('has to render without crashing', () => {
    shallow(<Chat />);
  });

  it('has to render children node', () => {
    const children = <h2>children</h2>;
    const wrapper = mount(
      <Chat>
        { children }
      </Chat>
    );
    expect(wrapper).toContainReact(children);
  })

  describe('context', () => {
    let rootContext;
    const ContextChecker = (props, context) => {
      rootContext = context;
      return null;
    };

    ContextChecker.contextTypes = {
      messages: PropTypes.array
    };

    afterEach(() => {
      rootContext = undefined;
    });

    it('has to set messages prop on context.messages', () => {
      const messages = [];
      mount(
        <Chat messages={messages}>
          <ContextChecker />
        </Chat>
      );
      expect(rootContext.messages).toEqual(messages);
    })
  })
});
