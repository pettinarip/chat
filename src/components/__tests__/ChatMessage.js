import React from 'react';
import { shallow } from 'enzyme';
import ChatMessage from '../ChatMessage';

describe('ChatMessage', () => {
  it('shows text message', () => {
    const message = { text: 'message' };
    const wrapper = shallow(<ChatMessage message={message} />);
    expect(wrapper).toHaveText(message.text);
  });

  it('has to align text', () => {
    const message = { text: 'message' };
    let wrapper = shallow(<ChatMessage message={message} />);
    expect(wrapper).toHaveStyle('textAlign', 'left');

    wrapper = shallow(<ChatMessage message={message} align='right' />);
    expect(wrapper).toHaveStyle('textAlign', 'right');
  });
});
