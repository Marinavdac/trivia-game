import React from 'react';
import PropTypes from 'prop-types';

class AnswerButtons extends React.Component {
renderButtons = () => {
  const correctAnswer = 'correct-answer';
  const { answers } = this.props;
  const array = ['wrong-answer-1', 'wrong-answer-2', 'wrong-answer-3',
    'wrong-answer-4', 'wrong-answer-5'];
  const btns = answers[0]?.map((answer, index) => (
    <button
      key={ index }
      type="button"
      data-testid={ index === 0 ? correctAnswer : array[index] }
      name={ index === 0 ? correctAnswer : 'wrong-answer' }
      className={ index === 0 ? 'correct-invisible' : 'wrong-invisible' }
      onClick={ this.handleClick }
    >
      {answer}
    </button>
  ));
  return btns;
}

handleClick = () => {
  const correctAnswer = 'correct-answer';
  const btn = document.querySelectorAll('button');
  btn.forEach((element) => {
    if (element.name === correctAnswer) {
      element.classList.toggle('right-answer');
    } else {
      element.classList.toggle('wrong-answer');
    }
  });
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
