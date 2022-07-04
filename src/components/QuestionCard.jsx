import PropTypes from 'prop-types';
import React from 'react';

class QuestionCard extends React.Component {
  state = {
    index: 0,
    hasClicked: false,
    answerStatus: {
      wrong: '',
      correct: '',
    },
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
