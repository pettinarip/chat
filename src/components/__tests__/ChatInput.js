import React from 'react';
import { shallow, mount } from 'enzyme';
import Chat from '../Chat';
import ChatInput from '../ChatInput';

describe('ChatInput', () => {
  it('has to render a text input', () => {
    const wrapper = shallow(<ChatInput />);
    expect(wrapper.find('input')).toMatchElement(<input />);
    expect(wrapper.find('input')).toHaveProp('type', 'text');
  });

  describe('message history', () => {
    let messages;
    let wrapper;

    beforeEach(() => {
      messages = [{ id: 1, text: 'm1' }, { id: 2, text: 'm2' }];
      wrapper = mount(
        <Chat messages={messages}>
          <ChatInput />
        </Chat>
      );
    });

    it('autocomplete input with the prev message in history, on ArrowUp key press', () => {
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.find('input')).toHaveValue(messages[1].text);
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.find('input')).toHaveValue(messages[0].text);
    });

    it('autocomplete input with the next message in history, on ArrowDown key press', () => {
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.find('input')).toHaveValue(messages[1].text);
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.find('input')).toHaveValue('');
    });

    it('do nothing when history is empty', () => {
      const value = 'Hi there!';
      const wrapper = mount(
        <Chat messages={[]}>
          <ChatInput />
        </Chat>
      );

      wrapper.find('input').simulate('change', {target: {value}});
      wrapper.find('input').simulate('keyDown', { key: 'ArrowUp' });
      expect(wrapper.find('input')).toHaveValue(value);
      wrapper.find('input').simulate('keyDown', { key: 'ArrowDown' });
      expect(wrapper.find('input')).toHaveValue(value);
    });
  });

  describe('onSubmit', () => {
    let onSubmit;
    let wrapper;

    beforeEach(() => {
      onSubmit = jest.fn();
      wrapper = mount(<ChatInput onSubmit={onSubmit} />);
    });

    it('has to be called when user enter a text and press the Enter key', () => {
      wrapper.find('input').simulate('change', {target: {value: 'Hi there!'}});
      wrapper.find('input').simulate('keyDown', {key: 'Enter'});
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('doesn\'t have to be called onSubmit when there is no text', () => {
      wrapper.find('input').simulate('keyDown', {key: 'Enter'});
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it('has to be called with the input value', () => {
      const value = 'Hi there!';
      wrapper.find('input').simulate('change', {target: {value}});
      wrapper.find('input').simulate('keyDown', {key: 'Enter'});
      expect(onSubmit).toBeCalledWith(value, expect.anything());
    });

    it('needs to clear input value after onSubmit is called', () => {
      const value = 'Hi there!';
      wrapper.find('input').simulate('change', {target: {value}});
      expect(wrapper.find('input')).toHaveValue(value);
      wrapper.find('input').simulate('keyDown', {key: 'Enter'});
      expect(wrapper.find('input')).toHaveValue('');
    });
  });
});
