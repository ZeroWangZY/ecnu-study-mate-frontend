import React, {Component} from 'react';
import Conversation from './Conversation';

class Message extends Component {
  render () {
    return (
      <div className="message-container">
        <Conversation/>
      </div>
    );
  }
}

export default Message;
