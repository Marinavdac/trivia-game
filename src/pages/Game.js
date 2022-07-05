import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';
import fetchApiGame from '../services/fetchGame';
import './styles/Game.css';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import logo from '../images/TRV_Logo.png';

class Game extends Component {
  state = {
    cardsInfo: [],
    responseCode: 0,
    counter: 0,
    isTimeOut: false,
    userHasClicked: false,
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
    // const { dispatch } = this.props;
    this.setState({
      counter: timerState,
      isTimeOut: timeOut,
    });
    // dispatch(addCounter(counter));
    // console.log("counter no game", this.state.counter)
  }

  getClickEvent = () => {
    this.setState({
      userHasClicked: true,
    });
  }

  render() {
    const { email, name, score, history } = this.props;
    const gravatarPic = getAvatar(email);
    const { cardsInfo, responseCode, isTimeOut, userHasClicked, counter } = this.state;
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
            <Timer
              getTimer={ this.getTimer }
              isTimeOut={ isTimeOut }
              userHasClicked={ userHasClicked }
            />
            {cardsInfo && <QuestionCard
              cardsInfo={ cardsInfo }
              isTimeOut={ isTimeOut }
              getClickEvent={ this.getClickEvent }
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
