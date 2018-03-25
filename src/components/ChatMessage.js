import React from 'react';
import PropTypes from 'prop-types';

const ChatMessage = (props) => {
  return (
    <div style={{ textAlign: props.align || 'left' }}>
      {props.message.text}
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired,
  align: PropTypes.oneOf(['left', 'right'])
};

export default ChatMessage;
