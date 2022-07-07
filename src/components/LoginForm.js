import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlayer } from '../redux/actions/action';
import './Login.css';
import logo from '../images/TRV_Logo.png';
import fetchApiFuntion from '../services/fetchApi';

class LoginForm extends Component {
handleClick = async () => {
  const { history, addPlayerDispatch, nome, email } = this.props;
  const obj = {
    name: nome,
    assertions: 0,
    score: 0,
    gravatarEmail: email,
  };

  const api = await fetchApiFuntion();
  localStorage.setItem('token', (api.token));
  history.push('/game');
  addPlayerDispatch(obj);
}

render() {
  const { isDisabled,
    handleChange, handleConfig } = this.props;
  return (
    <section className="login-section">
      <div>
        <img
          className="login-image"
          src={ logo }
          alt="trivia-logo"
        />
        <div className="login-form">
          <label htmlFor="player-name">
            Name:
            <input
              data-testid="input-player-name"
              type="text"
              id="player-name"
              name="name"
              placeholder="Ex.: João da Silva"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              id="email"
              placeholder="Ex.: joao@dasilva.com"
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={
              this.handleClick
            }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => handleConfig() }
          >
            Settings
          </button>
        </div>
      </div>
    </section>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (playerInfo) => dispatch(addPlayer(playerInfo)),
});

LoginForm.propTypes = {
  nome: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  addPlayerDispatch: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
  handleConfig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

LoginForm.defaultProps = {
  handleChange: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(LoginForm);
