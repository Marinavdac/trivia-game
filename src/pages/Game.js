import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';
import fetchApiGame from '../services/fetchGame';
import './styles/Game.css';
import QuestionCard from '../components/QuestionCard';

class Game extends Component {
  state = {
    cardsInfo: [],
    responseCode: 0,
  }

  async componentDidMount() {
    const tokenLocalStorage = localStorage.getItem('token');
    const resultApi = await fetchApiGame(tokenLocalStorage);
    this.setState({
      cardsInfo: resultApi.results,
      responseCode: resultApi.response_code,
    });
  }

  render() {
    const { email, name, score } = this.props;
    const gravatarPic = getAvatar(email);
    const { cardsInfo, responseCode } = this.state;
    console.log(cardsInfo);
    const { history } = this.props;
    const invalidToken = 3;
    return (
      <div className="trivia-game-screen">
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

          {cardsInfo && <QuestionCard
            cardsInfo={ cardsInfo }
          />}
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
