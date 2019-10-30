import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styles from './message.module.css';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pressFavorite: false,
      pressRetweet: false
    };
  }

  onPressFavorite = () => {
    this.props.onFavorite();
    this.setState({ pressFavorite: true });
  };

  onPressRetweet = () => {
    this.props.onRetweet();
    this.setState({ pressRetweet: true });
  };

  render() {
    const { msg } = this.props;

    let dateFormat = moment(msg.date).fromNow();
    let userLink = `/user/${msg.username}`;
    return (
      <div className={styles.root}>
        <div className={styles.user}>
          <Link to={userLink}>
            <figure>
              <img
                className={styles.avatar}
                src={msg.picture}
                alt={`Avatar ${msg.username}`}
              />
            </figure>
          </Link>
          <span className={styles.displayName}>{msg.displayName}</span>
          <span className={styles.username}>{msg.username}</span>
          <span className={styles.date}>{dateFormat}</span>
        </div>
        <h3>{msg.text}</h3>
        <div className={styles.buttons}>
          <div className={styles.icon} onClick={this.props.onReplyTweet}>
            <span className="fa fa-reply"></span>
          </div>
          <div
            className={this.state.pressRetweet ? styles.rtGreen : ''}
            onClick={this.onPressRetweet}
          >
            <span className="fa fa-retweet"></span>
            <span className={styles.num}>{msg.retweets}</span>
          </div>
          <div
            className={this.state.pressFavorite ? styles.favYellow : ''}
            onClick={this.onPressFavorite}
          >
            <span className="fa fa-star"></span>
            <span className={styles.num}>{msg.favorites}</span>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  msg: PropTypes.shape({
    date: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    retweets: PropTypes.number.isRequired,
    favorites: PropTypes.number.isRequired
  }),
  onReplyTweet: PropTypes.func.isRequired,
  onRetweet: PropTypes.func.isRequired,
  onFavorite: PropTypes.func.isRequired
};

export default Message;
