import PropTypes from 'prop-types';
import React from 'react';
import AnswerButtons from './AnswerButtons';

class QuestionCard extends React.Component {
  state = {
    index: 0,
  }

  render() {
    const { cardsInfo } = this.props;
    const { index } = this.state;
    const answers = cardsInfo
      .map((info) => [info.correct_answer, ...info.incorrect_answers]);

    return (
      <div className="questionCard">
        <p data-testid="question-category">{`Category: ${cardsInfo[index]?.category}`}</p>
        <div>
          <p data-testid="question-text">{cardsInfo[index]?.question}</p>
          <div
            className="answer-list"
          >
            <AnswerButtons
              answers={ answers }
            />
          </div>
        </div>

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
