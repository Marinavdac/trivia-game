import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';
import fetchApiGame from '../services/fetchGame';
import logo from '../images/TRV_Logo.png';
import './styles/Game.css';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    cardsInfo: [],
    responseCode: 0,
    counter: 0,
    isTimeOut: false,
  }

  async componentDidMount() {
    const tokenLocalStorage = localStorage.getItem('token');
    const resultApi = await fetchApiGame(tokenLocalStorage);
    this.setState({
      cardsInfo: resultApi.results,
      responseCode: resultApi.response_code,
    });
  }

  getTimer = (timerState, timeOut) => {
    this.setState({
      counter: timerState,
      isTimeOut: timeOut,
    });
  }

  render() {
    const { email, name, score, history } = this.props;
    const gravatarPic = getAvatar(email);
    const { cardsInfo, responseCode, isTimeOut } = this.state;
    const invalidToken = 3;
    return (
      <div className="trivia-game-screen">
        <img
          className="game-image"
          src={ logo }
          alt="trivia-logo"
        />
        {responseCode === invalidToken && history.push('/')}
        <header>
          <section className="player-header-info">
            <img
              src={ gravatarPic }
              alt="profile"
              data-testid="header-profile-picture"
            />
            <h1 data-testid="header-player-name">{ name }</h1>
            <h2 data-testid="header-score">{`Placar: ${score}`}</h2>
          </section>
          <Timer
            parentCallBack={ this.getTimer }
            isTimeOut={ isTimeOut }
          />
          {cardsInfo && <QuestionCard
            cardsInfo={ cardsInfo }
            isTimeOut={ isTimeOut }
          />}
          <div className="game-questions">
            <section className="player-header-info">
              <img
                src={ gravatarPic }
                alt="profile"
                data-testid="header-profile-picture"
              />
              <h1 data-testid="header-player-name">{ name }</h1>
              <h2 data-testid="header-score">{`Placar: ${score}`}</h2>
            </section>
            {cardsInfo && <QuestionCard
              cardsInfo={ cardsInfo }
            />}
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.playerReducer.player.gravatarEmail,
  name: state.playerReducer.player.name,
  score: state.playerReducer.player.score,

});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
