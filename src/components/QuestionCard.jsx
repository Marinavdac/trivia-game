import PropTypes from 'prop-types';
import React from 'react';
import fetchApiGame from '../services/fetchGame';
import Timer from './Timer';
import './QuestionCard.css';

class QuestionCard extends React.Component {
  state = {
    index: 0,
    hasClicked: false,
    answerStatus: {
      wrong: '',
      correct: '',
    },
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
    this.setState({
      answerStatus: {
        wrong: 'wrong',
        correct: 'correct',
      },
      hasClicked: true,
    });
  };

    nextQuestion = () => {
      const { index } = this.state;
      this.setState((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
        answerStatus: {
          ...prevState.answerStatus,
          wrong: '',
          correct: '',
        },
        hasClicked: false,
      }));

      console.log('index', index);
    };

    render() {
      const { cardsInfo, isTimeOut } = this.props;
      const { index, hasClicked, answerStatus: { correct, wrong } } = this.state;
      const limit = 0.5;
      const answersIds = ['correct-answer',
        'wrong-answer-1', 'wrong-answer-2', 'wrong-answer-3'];
      const answers = cardsInfo.map((cardInfo) => [cardInfo
        .correct_answer, ...cardInfo.incorrect_answers]);
      return (
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
            <div
              className="answer-list"
            >
              <div data-testid="answer-options">
                {answers[index]?.map((answer, i) => (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ answersIds[i] }
                    className={ i === 0 ? correct : wrong }
                    onClick={ this.handleClick }
                    disabled={ isTimeOut }
                    id={ answersIds[i] }
                  >
                    {answer}
                  </button>
                )).sort(() => Math.random() - limit)}
              </div>
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

      );
    }
}

QuestionCard.propTypes = {
  cardsInfo: PropTypes.shape({
    map: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
  isTimeOut: PropTypes.bool.isRequired,

};

export default QuestionCard;
