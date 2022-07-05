import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addScore, addCounter } from '../redux/actions/action';
import './QuestionCard.css';

const questionDifficulty = {
  easy: 1,
  medium: 2,
  hard: 3,
};
class QuestionCard extends React.Component {
  state = {
    index: 0,
    answerStatus: {
      wrong: 'button',
      correct: 'button',
    },
  }

  handleClick = ({ target }) => {
    const { dispatch, cardsInfo, getClickEvent, userHasClicked, counter } = this.props;
    const { index } = this.state;
    const difficulty = questionDifficulty[cardsInfo[index]?.difficulty];
    getClickEvent();
    // console.log('counter', state.playerReducer.player.counter)    
    this.setState({
      answerStatus: {
        wrong: 'button-wrong',
        correct: 'button-correct',
      },
    });
    console.log('userHasClicked', userHasClicked);
    console.log('difficulty', difficulty);
    console.log('timer from questioncard', counter);
    if (target.id === 'correct-answer') {
      const rightAnswer = 10;
      const total = rightAnswer * difficulty * counter;
      dispatch(addScore(total));
    } else if (target.id.includes('wrong-answer')) {
      const wrongAnswer = 1;
      const totalWrong = wrongAnswer * difficulty * counter;
      dispatch(addScore(totalWrong));
    }
  };

    nextQuestion = () => {
      const { index } = this.state;
      this.setState((prevState) => ({
        ...prevState,
        index: prevState.index + 1,
        answerStatus: {
          ...prevState.answerStatus,
          wrong: 'button',
          correct: 'button',
        },
      }));
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
              <div data-testid="answer-options" className="options">
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

const mapStateToProps = (state) => ({
  counter: state.playerReducer.player.counter,
});

QuestionCard.propTypes = {
  cardsInfo: PropTypes.shape({
    map: PropTypes.func,
    length: PropTypes.number,
  }).isRequired,
  isTimeOut: PropTypes.bool.isRequired,

};

export default connect(mapStateToProps)(QuestionCard);
