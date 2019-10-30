import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'normalize.css';
import Header from './components/Header';
import Main from './components/Main';
import Profile from './components/Profile';
import Login from './components/Login';
import firebase from 'firebase';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleOnAuth = () => {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`));
  };

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('Te has desconectado correctamente'))
      .catch(() => console.log('Un error ocurrió'));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
            exact
            path="/"
            render={() => {
              if (this.state.user) {
                return (
                  <Main user={this.state.user} onLogout={this.handleLogout} />
                );
              } else {
                return <Login onAuth={this.handleOnAuth} />;
              }
            }}
          />
          <Route path="/profile">
            {this.state.user && (
              <Profile
                picture={this.state.user.photoURL}
                username={this.state.user.email.split('@')[0]}
                displayName={this.state.user.displayName}
                location={this.state.user.location}
                email={this.state.user.email}
              />
            )}
          </Route>
          <Route
            path="/user/:username"
            render={({ match }) => (
              <Profile
                displayName={match.params.username}
                username={match.params.username}
              />
            )}
          ></Route>
        </div>
      </Router>
    );
  }
}

export default App;
