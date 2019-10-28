import React from 'react';
import PropTypes from 'prop-types';
import Message from '../Message';
import styles from './message.module.css';

const MessageList = props => (
  <div className={styles.root}>
    {props.messages
      .map((msg, i) => {
        return (
          <Message
            msg={msg}
            key={msg.id}
            onRetweet={() => props.onRetweet(msg.id)}
            onFavorite={() => props.onFavorite(msg.id)}
            onReplyTweet={() => props.onReplyTweet(msg.id, msg.username)}
          ></Message>
        );
      })
      .reverse()}
  </div>
);

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired,
  onReplyTweet: PropTypes.func.isRequired
};

export default MessageList;
