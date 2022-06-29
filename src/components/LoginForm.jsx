import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPlayer } from '../redux/actions/action';
import './style.css';
import logo from '../trivia.png';
import fetchApiFuntion from '../services/fetchApi';

class LoginForm extends Component {
  handleClick = async () => {
    const { history } = this.props;
    const api = await fetchApiFuntion();
    localStorage.setItem('token', (api.token));
    history.push('/trivia');
    console.log(this.props);
  }

  render() {
    const { isDisabled,
      handleChange } = this.props;
    return (
      <section className="login-section">
        <div className="login-form">
          <img
            className="login-image"
            src={ logo }
            alt="trivia-logo"
          />
          <label htmlFor="player-name">
            Nome:
            <input
              data-testid="input-player-name"
              type="text"
              id="player-name"
              name="name"
              placeholder="Ex.: João da Silva"
              onChange={ handleChange }
              // value={ name }
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
              // value={ email }
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
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addPlayerDispatch: (playerInfo) => dispatch(addPlayer(playerInfo)),
});

LoginForm.propTypes = {
  // name: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
  // addPlayerDispatch: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

LoginForm.defaultProps = {
  handleChange: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(LoginForm);
