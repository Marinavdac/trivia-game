import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';

class Feedback extends Component {
handleClick = () => {
  const { history } = this.props;
  history.push('/');
}

render() {
  const { email, name, score, assertions } = this.props;
  const gravatarPic = getAvatar(email);
  const three = 3;
  return (
    <>
      <header>
        <img
          src={ gravatarPic }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ name }</h1>
        <h2 data-testid="header-score">{ `Placar: ${score}` }</h2>
      </header>
      <div data-testid="feedback-text">
        {assertions >= three
          ? <h1>Well Done!</h1>
          : <h1>Could be better...</h1>}
      </div>
      <div>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
      </div>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ this.handleClick }
      >
        Play Again
      </button>
    </>
  );
}
}

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.playerReducer.player.gravatarEmail,
  name: state.playerReducer.player.name,
  score: state.playerReducer.player.score,
  assertions: state.playerReducer.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
