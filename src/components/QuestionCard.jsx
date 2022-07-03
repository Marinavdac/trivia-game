import PropTypes from 'prop-types';
import React from 'react';
import fetchApiGame from '../services/fetchGame';
import Timer from './Timer';
import './QuestionCard.css';

class QuestionCard extends React.Component {
  state = {
    index: 0,
    arrayAnswers: [],
    counter: 0,
    isTimeOut: false,
  }

  getTimer = (timerState, timeOut) => {
    const { counter } = this.state;
    this.setState({
      counter: timerState,
      isTimeOut: timeOut,
    });
    console.log('counter do getTimer', counter);
    console.log('timerState do getTimer', timerState);
    console.log('timeout do getTimer', timeOut);
  }

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   const { counter } = this.state;
  //   if (nextState.counter === counter) {
  //     return true;
  //   }
  // }

  renderButtons = () => {
    const correctAnswer = 'correct-answer';
    const { arrayAnswers } = this.state;
    const array = ['wrong-answer-1', 'wrong-answer-2', 'wrong-answer-3',
      'wrong-answer-4', 'wrong-answer-5'];
    const btns = arrayAnswers[0]?.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ index === 0 ? correctAnswer : array[index] }
        name={ index === 0 ? correctAnswer : 'wrong-answer' }
        className="btn"
        onClick={ this.handleClick }
      >
        {answer}
      </button>
    ));
    return btns;
  }

  handleClick = () => {
    const btn = document.querySelectorAll('.btn');
    btn.forEach((element) => {
      if (element.name === 'correct-answer') {
        element.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        element.style = 'border: 3px solid red;';
      }
    });
  }

  componentDidMount = async () => {
    const tokenLocalStorage = localStorage.getItem('token');
    const resultApi = await fetchApiGame(tokenLocalStorage);
    const cardsInfo = resultApi.results;
    const answers = cardsInfo
      .map((info) => [info.correct_answer, ...info.incorrect_answers]);
    this.setState({
      arrayAnswers: answers,
    });
  }

  render() {
    const { cardsInfo } = this.props;
    const { index, isTimeOut } = this.state;
    const limit = 0.5;
    return (
      <div className="questionCard">
        <Timer
          parentCallBack={ this.getTimer }
          isTimeOut={ isTimeOut }
        />
        <p data-testid="question-category">{`Category: ${cardsInfo[index]?.category}`}</p>
        <div>
          <p data-testid="question-text">{cardsInfo[index]?.question}</p>
          <div
            className="answer-list"
          >
            <div data-testid="answer-options" className="options">
              {this.renderButtons()?.sort(() => Math.random() - limit)}
            </div>
          </div>
        </div>
        { isTimeOut && <button type="button" data-testid="btn-next">Next</button>}
      </div>

    );
  }
}

QuestionCard.propTypes = {
  cardsInfo: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default QuestionCard;
