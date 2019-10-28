import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './profile-bar.module.css';

const ProfileBar = ({ picture, username, onOpenText, onLogout }) => (
  <div className={styles.root}>
    <Link to="/profile">
      <figure>
        <img className={styles.avatar} src={picture} alt={username} />
      </figure>
    </Link>
    <span className={styles.username}>Hola @{username}!</span>
    <button onClick={onOpenText} className={styles.button}>
      <span className="fa fa-lg fa-edit"></span> Tweet!
    </button>
    <button onClick={onLogout} className={styles.button}>
      <span className="fa fa-sign-out"></span> Salir
    </button>
  </div>
);

ProfileBar.propTypes = {
  picture: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onOpenText: PropTypes.func.isRequired
};

export default ProfileBar;
