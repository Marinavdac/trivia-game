import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';
import './styles/Game.css';

class Feedback extends Component {
handleClickPlayAgain = () => {
  const { history } = this.props;
  history.push('/');
}

handleClickRanking = () => {
  const { history } = this.props;
  history.push('/ranking');
}

render() {
  const { email, name, score, assertions } = this.props;
  const gravatarPic = getAvatar(email);
  const three = 3;
  return (
    <div className="trivia-game-screen">
      <div
        className="game-questions feedback"
        data-testid="feedback-text"
      >
        <section className="player-header-info">
          <img
            src={ gravatarPic }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">{ name }</h1>
          <h2 data-testid="header-score">{ score }</h2>
        </section>
        {assertions >= three
          ? (
            <div>
              <iframe
                title="happy-results"
                src="https://giphy.com/embed/DffShiJ47fPqM"
                width="240"
                height="168"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
              <h1>Well done!</h1>
              <a href="https://giphy.com/gifs/DffShiJ47fPqM"> </a>
              <p data-testid="feedback-total-score">
                {
                  `Final score: ${score} points`
                }

              </p>
              <p data-testid="feedback-total-question">
                {`You got ${assertions} right `}

              </p>
            </div>
          )
          : (
            <div>
              <iframe
                title="sad-results"
                src="https://giphy.com/embed/9Y5BbDSkSTiY8"
                width="240"
                height="186"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
              <h1>Could be better...</h1>
              <a href="https://giphy.com/gifs/sad-baby-upset-9Y5BbDSkSTiY8"> </a>
              <p data-testid="feedback-total-score">{ `Final score:  ${score} points` }</p>
              <p data-testid="feedback-total-question">{`Can you get more than ${assertions} next time? ` }</p>
            </div>
          )}
      </div>
      <div className="feedback">
        {/* <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p> */}
        <button
          className="button"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClickPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          className="button"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </div>
    </div>
  );
}
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
