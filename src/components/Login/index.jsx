import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.module.css';

const Login = props => (
  <div className={styles.root}>
    <p className={styles.text}>
      Necesitamos que inicies seción con cuenta de Github para que puedas leer y
      escribir mensajes
    </p>
    <button className={styles.button} onClick={props.onAuth}>
      <span className="fa fa-github"></span> Login con Github
    </button>
  </div>
);

Login.propTypes = {
  onAuth: PropTypes.func.isRequired
};

export default Login;
