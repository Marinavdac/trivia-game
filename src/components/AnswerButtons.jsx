import React from 'react';
import PropTypes from 'prop-types';

class AnswerButtons extends React.Component {
  renderButtons = () => {
    const { answers } = this.props;
    const array = ['wrong-answer-1', 'wrong-answer-2', 'wrong-answer-3',
      'wrong-answer-4', 'wrong-answer-5'];
    console.log('answer inside buttons', answers);
    const btns = answers[0]?.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ index === 0 ? 'correct-answer' : array[index] }
      >
        {answer}
      </button>
    ));
    return btns;
  }

  render() {
    const limit = 0.5;
    return (
      <div data-testid="answer-options">
        {this.renderButtons()?.sort(() => Math.random() - limit)}
      </div>

    );
  }
}

AnswerButtons.propTypes = {
  answers: PropTypes.arrayOf.isRequired,
};

export default AnswerButtons;
