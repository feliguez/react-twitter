import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import MessageList from '../MessageList';
import InputText from '../InputText';
import ProfileBar from '../ProfileBar';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: Object.assign(
        {},
        this.props.user,
        { retweets: [] },
        { favorites: [] }
      ),
      openText: false,
      usernameToReply: '',
      messages: []
    };

    this.handleOpenText = this.handleOpenText.bind(this);
    this.handleSendText = this.handleSendText.bind(this);
    this.handleCloseText = this.handleCloseText.bind(this);
    this.handleRetweet = this.handleRetweet.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleReplyTweet = this.handleReplyTweet.bind(this);
  }

  componentWillMount() {
    const messagesRef = firebase
      .database()
      .ref()
      .child('messages');
    messagesRef.on('child_added', snapshop => {
      this.setState({
        messages: this.state.messages.concat(snapshop.val()),
        openText: false
      });
    });
  }

  handleOpenText(event) {
    event.preventDefault();
    this.setState({ openText: true });
  }

  handleRetweet(msgId) {
    let alreadyRetwweted = this.state.user.retweets.filter(rt => rt === msgId);

    if (alreadyRetwweted.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.retweets++;
        }
        return msg;
      });

      let user = Object.assign({}, this.state.user);
      user.retweets.push(msgId);

      this.setState({ messages, user });
    }
  }

  handleFavorite(msgId) {
    let alreadyFavorited = this.state.user.favorites.filter(
      fav => fav === msgId
    );
    if (alreadyFavorited.length === 0) {
      let messages = this.state.messages.map(msg => {
        if (msg.id === msgId) {
          msg.favorites++;
        }
        return msg;
      });

      let user = Object.assign({}, this.state.user);
      user.favorites.push(msgId);

      this.setState({ messages: messages, user: user });
    }
  }

  handleReplyTweet(msgId, usernameToReply) {
    this.setState({ openText: true, usernameToReply: usernameToReply });
  }

  handleSendText(event) {
    event.preventDefault();

    let newMessage = {
      username: this.props.user.email.split('@')[0],
      displayName: this.props.user.displayName,
      picture: this.props.user.photoURL,
      date: Date.now(),
      text: event.target.text.value,
      favorites: 0,
      retweets: 0
    };

    const messagesRef = firebase
      .database()
      .ref()
      .child('messages');
    const messageID = messagesRef.push();
    messageID.set(newMessage);
  }

  handleCloseText(event) {
    event.preventDefault();

    this.setState({ openText: false });
  }

  renderOpenText() {
    if (this.state.openText) {
      return (
        <InputText
          onSendText={this.handleSendText}
          onCloseText={this.handleCloseText}
          usernameToReply={this.state.usernameToReply}
        />
      );
    }
  }

  render() {
    return (
      <>
        <ProfileBar
          picture={this.props.user.photoURL}
          username={this.props.user.email.split('@')[0]}
          onOpenText={this.handleOpenText}
          onLogout={this.props.onLogout}
        />
        {this.renderOpenText()}
        <MessageList
          messages={this.state.messages}
          onRetweet={this.handleRetweet}
          onFavorite={this.handleFavorite}
          onReplyTweet={this.handleReplyTweet}
        ></MessageList>
      </>
    );
  }
}

Main.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string
  }).isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Main;
