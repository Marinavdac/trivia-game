import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getAvatar from '../services/fetchGravatar';
import fetchApiGame from '../services/fetchGame';
import './styles/Game.css';
import logo from '../images/TRV_Logo.png';
import { addScore, addQuestion } from '../redux/actions/action';

const correctAnswer = 'correct-answer';
const questionDifficulty = {
  easy: 1,
  medium: 2,
  hard: 3,
};

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      cardsInfo: [],
      timer: 30,
      isTimeOut: false,
      userHasClicked: false,
      difficulty: '',
      answerButns: [],
      answerStatus: {
        wrong: 'button',
        correct: 'button',
      },
    };
  }

  async componentDidMount() {
    const { index } = this.state;
    const { history } = this.props;
    const tokenLocalStorage = localStorage.getItem('token');
    const resultApi = await fetchApiGame(tokenLocalStorage);
    const invalidToken = 3;
    const responseCode = resultApi.response_code;
    const wrongAnswer = ['wrong-answer-1', 'wrong-answer-2', 'wrong-answer-3'];

    if (responseCode === invalidToken) {
      history.push('/');
    }
    const limit = 0.5;
    const ans = resultApi.results
      .map((cardInfo) => [[correctAnswer, cardInfo
        ?.correct_answer], ...cardInfo?.incorrect_answers
          .map((incorrect, i) => [wrongAnswer[i], incorrect])])
      .map((answersArray) => answersArray.sort(() => Math.random() - limit));
    this.setState({
      cardsInfo: resultApi.results,
      answerButns: ans,
      difficulty: resultApi.results[index]?.difficulty,
    });
    this.setTimer();
  }

setTimer = () => {
  const sec = 1000;
  setInterval(this.timeCounter, sec);
}

timeCounter = () => {
  const { isTimeOut, timer } = this.state;
  if (isTimeOut === false) {
    this.setState((prevState) => ({
      timer: prevState.timer - 1,
    }));
  }
  if (timer === 1) {
    this.setState({
      isTimeOut: true,
    });
  }
  if (isTimeOut) {
    this.setState((prevState) => ({
      timer: prevState.timer,
    }));
  }
}

getTimer = (timerState, timeOut) => {
  this.setState({
    counter: timerState,
    isTimeOut: timeOut,
  });
}

handleClick = ({ target }) => {
  const { difficulty, timer } = this.state;
  const { addScoreDispatch, addAssertionDispatch } = this.props;
  const difficultyQ = questionDifficulty[difficulty];
  this.setState({
    answerStatus: {
      wrong: 'button-wrong',
      correct: 'button-correct',
    },
    isTimeOut: true,
  });
  if (target.id === 'correct-answer') {
    const totalAssertions = +1;
    const rightAnswer = 10;
    const total = rightAnswer + (difficultyQ * timer);
    addScoreDispatch(total);
    addAssertionDispatch(totalAssertions);
  }
};

nextQuestion = () => {
  const { index } = this.state;
  const { history } = this.props;
  const maxQuestions = 4;
  this.setState({
    timer: 30,
    isTimeOut: false,
  });
  this.setState((prevState) => ({
    ...prevState,
    index: prevState.index + 1,
    answerStatus: {
      ...prevState.answerStatus,
      wrong: 'button',
      correct: 'button',
    },
  }));

  if (index === maxQuestions) {
    history.push('/feedback');
  }
};

render() {
  const { email, name, score } = this.props;
  const gravatarPic = getAvatar(email);
  const { timer, index,
    cardsInfo, isTimeOut,
    hasClicked, answerStatus: { correct, wrong }, answerButns } = this.state;
  return (
    <div className="trivia-game-screen">
      <Link to="/">
        <img
          className="game-image"
          src={ logo }
          alt="trivia-logo"
        />

      </Link>

      <div className="game-questions">
        <section className="player-header-info">
          <img
            src={ gravatarPic }
            alt="profile"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">{name}</h1>
          <h2 data-testid="header-score">{`Placar: ${score}`}</h2>
        </section>
        <h1>{timer}</h1>
        <div className="questionCard">
          <p data-testid="question-category">
            {`Category: ${cardsInfo[index]?.category}`}
          </p>
          <div>
            <p data-testid="question-text">
              {(cardsInfo[index]?.question)
                ?.replaceAll(/&quot;/g, '"')
                ?.replaceAll(/&quot39;/g, '"')
                ?.replaceAll(/&#39;/g, '"')}
            </p>

            <div data-testid="answer-options" className="answer-list options">
              {answerButns[index]?.map((answer, i) => (
                <button
                  key={ i }
                  type="button"
                  data-testid={ answer[0] }
                  className={ answer[0] === correctAnswer ? correct : wrong }
                  onClick={ this.handleClick }
                  disabled={ isTimeOut }
                  id={ answer[0] }
                >
                  {answer[1]}
                </button>
              ))}
            </div>
          </div>

          {(isTimeOut || hasClicked)
&& (
  <button
    type="button"
    data-testid="btn-next"
    onClick={ this.nextQuestion }
  >
    Next
  </button>)}
        </div>

      </div>

    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => ({
  addScoreDispatch: (payload) => dispatch(addScore(payload)),
  addAssertionDispatch: (question) => dispatch(addQuestion(question)),
});

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addScoreDispatch: PropTypes.func.isRequired,
  addAssertionDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
