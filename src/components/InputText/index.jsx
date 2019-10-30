import React from 'react';
import PropTypes from 'prop-types';
import styles from './input-text.module.css';

const InputText = props => {
  const username = props.usernameToReply ? `@${props.usernameToReply} ` : '';
  return (
    <form className={styles.form} onSubmit={props.onSendText}>
      <textarea className={styles.text} name="text" defaultValue={username} />
      <div className={styles.buttons}>
        <button className={styles.close} onClick={props.onCloseText}>
          Cerrar
        </button>
        <button className={styles.send} type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
};

InputText.propTypes = {
  usernameToReply: PropTypes.string,
  onSendText: PropTypes.func.isRequired,
  onCloseText: PropTypes.func.isRequired
};

export default InputText;
