import React from 'react';
import PropTypes from 'prop-types';
import styles from './profile.module.css';

const Profile = ({ picture, username, displayName, email, location }) => (
  <div className={styles.root}>
    <img src={picture} className={styles.avatar} alt={`Avatar ${username}`} />
    <span className={styles.name}>{displayName}</span>
    <ul className={styles.data}>
      <li>
        <span className="fa fa-user"> {username}</span>
      </li>
      <li>
        <span className="fa fa-envelope"> {email}</span>
      </li>
      <li>
        <span className="fa fa-map-marker"> {location}</span>
      </li>
    </ul>
  </div>
);

Profile.propTypes = {
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired
};

export default Profile;
