import React, {Component} from 'react';
import ConversationItem from './ConversationItem';

class Conversation extends Component {
  render () {
    return (
      <div className="conversation-container" style={{textAlign: 'center'}}>
        <ConversationItem/>
        <ConversationItem/>

      </div>
    );
  }
}

export default Conversation;
